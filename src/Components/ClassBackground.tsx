import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { useAppSelector } from "../Redux/store";
import { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {  Mesh } from "three";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

interface MeshProps {
    position: [number, number, number]
    rotation: [number, number, number]
    scale: [number, number, number]
  }

const Entries: Record<string, MeshProps> = {
    ['Warrior']: {
      rotation: [0, 90, 0],
      position: [12.5, -2.2, -10.75],
      scale:[10,10, 10],
    },
    ['bard']: {
      rotation: [0, 0, 0],
      position: [0, -2, 0],
      scale:[.5, .5, .5],
    },
    ['Warlock']: {
      rotation: [0, 0, 0],
      position: [0, -.75, .2],
      scale:[11,11,11],
    },
}

export function ClassBackground(){
    const {name, color} = useAppSelector(state => state.class.selectedClass);

    return (<div style={{position: 'absolute', background: color, top: 0, left: 0, height: '100vh', width: '100vw', zIndex: -1}}>
        <Canvas>
            <ambientLight intensity={4}/>
            <group position={[0,0,0]}>
                <Background/>
                <Character name={name}/>
            </group>
            <PerspectiveCamera makeDefault position={[0,-1, 1]}></PerspectiveCamera>
      </Canvas>
    </div>);
}

function Character({name}: {name: string}) {
    const fileUrl = `/${name}/scene.gltf`;
    const mesh = useRef<Mesh>(null!);
    const gltf = useLoader(GLTFLoader, fileUrl);

    if(!Entries[name]) return <></>

    console.log(Entries[name])
  
    return (
      <mesh ref={mesh} {...Entries[name]}>
        <primitive object={gltf.scene} />
      </mesh>
    );
  }

function Background() {
    const fileUrl = "/tavern2/scene.gltf";
    const mesh = useRef<Mesh>(null!);
    const gltf = useLoader(GLTFLoader, fileUrl);
  
    return (
      <mesh ref={mesh} position={[-2, -2, 0]}>
        <primitive object={gltf.scene} />
      </mesh>
    );
  }
  