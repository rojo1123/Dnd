import { useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export const Scene = () => {
    return<Canvas style={{width: '100%', height:"100%"}}>
        <ambientLight />
        <OrbitControls />
        <pointLight position={[10, 10, 10]} />
        <MeshComponent />
  </Canvas>
}

function MeshComponent() {
    const fileUrl = "/pc/scene.gltf";
    const mesh = useRef<Mesh>(null!);
    const gltf = useLoader(GLTFLoader, fileUrl);
  
    return (
      <mesh ref={mesh}>
        <primitive object={gltf.scene} />
      </mesh>
    );
  }