'use client';

import {
  CameraControls,
  Environment,
  Fisheye,
  PerspectiveCamera,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { Box, Cactus, Camera, Level, Sudo } from '@/app/ui/Scene/Components';

export default function Scene() {
  return (
    <Canvas flat>
      <Fisheye zoom={0}>
        <CameraControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.6} />
        <ambientLight intensity={Math.PI / 2} />
        <group scale={20} position={[5, -11, -5]}>
          <Level />
          <Sudo />
          <Camera />
          <Cactus />
          <Box position={[-0.8, 1.4, 0.4]} scale={0.15} />
        </group>
        <Environment preset="city" background blur={1} />
        <PerspectiveCamera makeDefault position={[0, 0, 18.5]} />
      </Fisheye>
    </Canvas>
  );
}
