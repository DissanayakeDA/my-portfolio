"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, Environment, Sparkles, Icosahedron, Box } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Smoothly interpolate rotation based on mouse position
      const x = state.mouse.x * 0.2;
      const y = state.mouse.y * 0.2;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#FF6B00" />
      
      {/* Central Tech Core */}
      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        <group scale={1.8}>
          {/* Wireframe Network */}
          <Icosahedron args={[1, 1]} position={[0, 0, 0]}>
             <meshStandardMaterial 
               color="#FF6B00"
               emissive="#FF6B00"
               emissiveIntensity={0.5}
               wireframe
               wireframeLinewidth={2}
             />
          </Icosahedron>
          
          {/* Inner Solid Core */}
          <Icosahedron args={[0.9, 1]} position={[0, 0, 0]}>
             <meshStandardMaterial 
               color="#000000"
               roughness={0.1}
               metalness={1}
             />
          </Icosahedron>
        </group>
      </Float>

      {/* Floating Data Blocks */}
      <group>
        {[...Array(6)].map((_, i) => (
          <Float key={i} speed={2} rotationIntensity={2} floatIntensity={2} position={[
             // Deterministic positions based on index instead of random
            (i % 3 - 1) * 3,
            ((i % 2) * 2 - 1) * 2,
            (Math.sin(i) * 2)
          ]}>
            <Box args={[0.2, 0.2, 0.2]}>
               <meshStandardMaterial 
                 color="#FF6B00" 
                 emissive="#FF6B00"
                 emissiveIntensity={2}
               />
            </Box>
          </Float>
        ))}
      </group>
      <Environment preset="city" />
      <ContactShadows position={[0, -3.5, 0]} opacity={0.5} scale={20} blur={3} far={4.5} color="#FF6B00" />
      
      {/* Floating Particles */}
      <Sparkles 
        count={200} 
        scale={12} 
        size={4} 
        speed={0.4} 
        opacity={0.5} 
        color="#FF6B00"
        position={[0, 0, -5]}
      />
    </group>
  );
}

export default function ThreeCanvas() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
