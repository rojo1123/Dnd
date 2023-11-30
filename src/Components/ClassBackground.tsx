import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { useAppSelector } from "../Redux/store";
import { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {  Mesh } from "three";
import { OrbitControls, PerspectiveCamera, SpotLight } from "@react-three/drei";

interface MeshProps {
    position: [number, number, number]
    rotation: [number, number, number]
    scale: [number, number, number]
  }

const Entries: Record<string, MeshProps> = {
    'Warrior': {
      rotation: [0, 90, 0],
      position: [12.5, -2.2, -10.75],
      scale:[10,10, 10],
    },
    'bard': {
      rotation: [0, 0, 0],
      position: [0, -2, 0],
      scale:[.5, .5, .5],
    },
    'Warlock': {
      rotation: [0, -2.2, 0],
      position: [0, -1.5, -0.7],
      scale:[.11,.11,.11],
    },
    'Rogue': {
      rotation: [0, 2.5, 0],
      position: [0, -2, -.5],
      scale:[.33,.33,.33],
    },
    'Paladin': {
      rotation: [0, -.5, 0],
      position: [0, -1.55, .2],
      scale:[1,1,1],
    },
    'Monk': {
      rotation: [0, 3, 0],
      position: [0, -2.3, -.7],
      scale:[.003,.003,.003],
    },
}

export function ClassBackground(){
    const {name, color} = useAppSelector(state => state.class.selectedClass);
  
    return (<div style={{position: 'absolute', background: color, top: 0, left: 0, height: '100vh', width: '100vw', zIndex: -1}}>
        <Canvas shadows>
            <ambientLight intensity={2} color={color}/>
            <pointLight position={[ 1,1,-1]} castShadow color='orange' intensity={75} shadow-mapSize={2048} shadow-bias={-0.001}/>
            <pointLight position={[-1,-1, 1]} color='white' intensity={7} shadow-mapSize={2048} shadow-bias={-0.001}/>
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

    return (
      <mesh ref={mesh} {...Entries[name]} receiveShadow>
        <primitive object={gltf.scene} />
      </mesh>
    );
  }

function Background() {
    const fileUrl = "/tavern2/scene.gltf";
    const mesh = useRef<Mesh>(null!);
    const gltf = useLoader(GLTFLoader, fileUrl);
  
    return (
      <mesh ref={mesh} position={[-2, -2, 0]} castShadow receiveShadow>
        <primitive object={gltf.scene} />
      </mesh>
    );
  }
  