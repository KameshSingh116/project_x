import streamlit as st
import pandas as pd
import numpy as np
import requests
import time
import plotly.graph_objects as go

# Set page config
st.set_page_config(page_title="Real-time ECG Graph", page_icon="❤️", layout="wide")

# Function to fetch ECG data
def fetch_ecg_data():
    try:
        response = requests.get('http://127.0.0.1:10000/ecg')
        response.raise_for_status()
        data = response.json()
        return data['data']
    except requests.RequestException as e:
        st.error(f"Error fetching ECG data: {e}")
        return None

# Function to create the ECG plot
def create_ecg_plot(data):
    df = pd.DataFrame({
        'Time': np.linspace(0, 1, len(data)),
        'Amplitude': data
    })
    
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=df['Time'], y=df['Amplitude'], mode='lines', name='ECG'))
    
    fig.update_layout(
        title='Real-time ECG Graph',
        xaxis_title='Time (seconds)',
        yaxis_title='Amplitude',
        xaxis=dict(range=[0, 1]),
        yaxis=dict(range=[min(data)-0.5, max(data)+0.5]),
        height=600
    )
    
    return fig

# Main app
def main():
    st.title("Real-time ECG Monitor")
    st.write("This app displays ECG data in real-time, updating every 4 seconds.")

    # Initialize session state for ECG data if it doesn't exist
    if 'ecg_data' not in st.session_state:
        st.session_state.ecg_data = []

    # Create a placeholder for the ECG plot
    plot_placeholder = st.empty()

    # Main loop
    while True:
        # Fetch new ECG data
        new_data = fetch_ecg_data()
        
        if new_data:
            # Update session state with new data
            st.session_state.ecg_data = new_data
            
            # Create and display the updated plot
            fig = create_ecg_plot(st.session_state.ecg_data)
            plot_placeholder.plotly_chart(fig, use_container_width=True)
        
        # Wait for 4 seconds before the next update
        time.sleep(4)

if __name__ == "__main__":
    main()