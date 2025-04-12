"use client"

import { Suspense, useRef, useState, startTransition } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls, PerspectiveCamera, useGLTF, Html, Text, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type * as THREE from "three"

function Duck(props: any) {
  const { scene } = useGLTF("/assets/3d/duck.glb")
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
    }
  })

  return <primitive ref={meshRef} object={scene} {...props} />
}

function TutorContent() {
  const [activeLesson, setActiveLesson] = useState("intro")

  const handleTabChange = (value: string) => {
    startTransition(() => {
      setActiveLesson(value)
    })
  }

  return (
    <group position={[0, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Duck position={[0, -1, 0]} scale={2} />

        <Html transform position={[0, 1.5, 0]} className="pointer-events-auto" distanceFactor={10}>
          <Card className="w-[300px] shadow-lg">
            <CardContent className="p-4">
              <Tabs value={activeLesson} onValueChange={handleTabChange}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="intro">Intro</TabsTrigger>
                  <TabsTrigger value="lesson">Lesson</TabsTrigger>
                  <TabsTrigger value="quiz">Quiz</TabsTrigger>
                </TabsList>
                <TabsContent value="intro" className="mt-4 space-y-4">
                  <h3 className="font-bold">Welcome to 3D Learning!</h3>
                  <p className="text-sm">I'm your 3D tutor. I'll guide you through interactive lessons.</p>
                  <Button size="sm" className="w-full" onClick={() => handleTabChange("lesson")}>
                    Start Learning
                  </Button>
                </TabsContent>
                <TabsContent value="lesson" className="mt-4 space-y-4">
                  <h3 className="font-bold">Today's Topic: Neural Networks</h3>
                  <p className="text-sm">Let's explore how neural networks process information.</p>
                  <Button size="sm" className="w-full" onClick={() => handleTabChange("quiz")}>
                    Continue
                  </Button>
                </TabsContent>
                <TabsContent value="quiz" className="mt-4 space-y-4">
                  <h3 className="font-bold">Quick Quiz</h3>
                  <p className="text-sm">What's the main component of a neural network?</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline">
                      Neurons
                    </Button>
                    <Button size="sm" variant="outline">
                      Synapses
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </Html>
      </Float>

      <Text
        position={[0, 3, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter_Regular.json"
      >
        3D Interactive Tutor
      </Text>
    </group>
  )
}

export function TutorCanvas() {
  return (
    <div className="w-full h-full">
      <Canvas>
        <color attach="background" args={["#1a1a2e"]} />
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

        <Suspense fallback={null}>
          <TutorContent />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          minDistance={6}
          maxDistance={12}
        />
      </Canvas>
    </div>
  )
}

