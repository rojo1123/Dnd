import { Box, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Canvas, useLoader } from "@react-three/fiber"
import { Physics, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const D20Scene = () => {
    return <div style={{height: '400px', background: 'white'}}>
        <Canvas>
            <ambientLight intensity={4}/>
            <group position={[0,0,-5]}>
                <Physics>
                    <RigidBody>
                        <DiceModel/>
                    </RigidBody>
                    <RigidBody type="fixed" >
                        <Box position={[0, -2, -5]} scale={[20, 1, 20]}>
                            <meshStandardMaterial color="green"/>
                        </Box>
                    </RigidBody>
                </Physics>
            </group>
            <PerspectiveCamera makeDefault position={[0,0,0]}></PerspectiveCamera>
      </Canvas>
    </div>
}


function DiceModel() {
    const fileUrl = "/d20/scene.gltf";
    const mesh = useRef<Mesh>(null!);
    const gltf = useLoader(GLTFLoader, fileUrl);
  
    return ( <mesh ref={mesh} position={[0, 2, 0]} scale={[.01, .01, .01]}>
            <primitive object={gltf.scene} />
        </mesh>
    );
  }
  