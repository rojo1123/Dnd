import { Box, PerspectiveCamera } from "@react-three/drei"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { Physics, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import THREE, { Mesh, Quaternion } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useAppSelector } from "../Redux/store";
import { quaternionToDiceNumber } from "../utils/diceRotation";

export const D20Scene = () => {
    const {color} = useAppSelector(state => state.class.selectedClass);

    return <div style={{height: '400px', background: 'white'}}>
        <Canvas>
            <ambientLight intensity={4}/>
            <group position={[0,0,-5]}>
                <Physics gravity={[0, -10, 0]} interpolate={false}>
                    <DiceModel/>
                    <RigidBody type="fixed">
                        <Box position={[0, -3, -5]} scale={[10, 1, 10]}>
                            <meshStandardMaterial color={color}/>
                        </Box>
                        <Box position={[0, -3, -10]} scale={[20, 100, 1]}>
                        </Box>
                        <Box position={[-5, -3, -5]} scale={[1, 100, 20]}>
                        </Box>
                        <Box position={[5, -3, -5]} scale={[1, 100, 20]}>
                        </Box>
                        <Box position={[0, -3, 1]} scale={[20, 100, 1]}>
                        </Box>
                    </RigidBody>
                </Physics>
            </group>
            <PerspectiveCamera makeDefault position={[-4, 20, -5]} rotation={[-1.3, 0, 0]}></PerspectiveCamera>
      </Canvas>
    </div>
}

function DiceModel() {
    const fileUrl = "/d20/scene.gltf";
    const mesh = useRef<Mesh>(null!);
    const gltf = useLoader(GLTFLoader, fileUrl);
    const rigidBody = useRef<RapierRigidBody>(null);

    const getRandomNumber = () => {
        return (Math.random() * 2 - 1) * 80 + 20
    }
    
    const Roll = () => {
        const impulse = {x: getRandomNumber(), y: 100, z: getRandomNumber()};
        rigidBody.current?.applyImpulse({...impulse}, true);
        rigidBody.current?.applyTorqueImpulse({...impulse}, true);
    }

    return ( 
        <RigidBody ref={rigidBody} onCollisionEnter={({ manifold, target, other }) => {
            if (other.rigidBodyObject) {
                rigidBody.current?.resetTorques(true);
            }
        }}>
            <mesh onClick={() => Roll()} ref={mesh} position={[0, 4, -2]} scale={[.01, .01, .01]}>
                <primitive object={gltf.scene} />
            </mesh>
        </RigidBody>
    );
  }
  