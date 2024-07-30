// World.tsx
// @ts-nocheck
// import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Globe, WebGLRendererConfig } from './Globe';
import { WorldProps } from './types';

export function World({ globeConfig, data }: WorldProps) {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <WebGLRendererConfig />
      <Globe globeConfig={globeConfig} data={data} />
      {/* <OrbitControls /> */}
    </Canvas>
  );
}
