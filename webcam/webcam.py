from flask import Flask, Response
import cv2
from flask_cors import CORS
import threading
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Global variables for webcam handling
camera = None
output_frame = None
lock = threading.Lock()

def init_camera():
    """Initialize the webcam"""
    global camera
    camera = cv2.VideoCapture(0)  # Use default webcam (modify index if needed)
    if not camera.isOpened():
        raise RuntimeError("Could not initialize webcam. Please check connections.")

def generate_frames():
    """Generate frames from webcam"""
    global output_frame, lock
    
    while True:
        if camera is None or not camera.isOpened():
            break
            
        success, frame = camera.read()
        if not success:
            break
            
        # Convert frame to JPEG format
        ret, buffer = cv2.imencode('.jpg', frame)
        if not ret:
            continue
            
        # Ensure thread-safe frame handling
        with lock:
            output_frame = buffer.tobytes()
            
        # Add small delay to control frame rate
        time.sleep(0.03)  # Approximately 30 FPS

def get_frame():
    """Get the current frame"""
    global output_frame, lock
    with lock:
        if output_frame is None:
            return None
        return output_frame

@app.route('/video_feed')
def video_feed():
    """Video streaming route"""
    def generate():
        while True:
            frame = get_frame()
            if frame is not None:
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            time.sleep(0.03)
    
    return Response(generate(),
                   mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/')
def index():
    """Serve a simple HTML page with the video feed"""
    return """
    <html>
        <head>
            <title>Webcam Stream</title>
            <style>
                body { 
                    margin: 0; 
                    padding: 20px; 
                    display: flex; 
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background: #f0f0f0;
                }
                img { 
                    max-width: 100%;
                    border: 2px solid #333;
                    border-radius: 8px;
                }
            </style>
        </head>
        <body>
            <img src="/video_feed">
        </body>
    </html>
    """

if __name__ == '__main__':
    # Initialize camera in a separate thread
    init_camera()
    
    # Start frame generation thread
    frame_thread = threading.Thread(target=generate_frames)
    frame_thread.daemon = True
    frame_thread.start()
    
    # Run the Flask app
    app.run(host='0.0.0.0', port=5000, threaded=True)