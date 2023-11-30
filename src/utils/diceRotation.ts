import * as THREE from "three";

export function quaternionToDiceNumber(rotationQuaternion: THREE.Quaternion) {
    // Reference quaternion for up number 20
    const referenceQuaternion: THREE.Quaternion = new THREE.Quaternion(0, 0, 0, 1);
  
    // Convert quaternions to euler angles
    const eulerRotation = new THREE.Euler().setFromQuaternion(rotationQuaternion);
    const eulerReference = new THREE.Euler().setFromQuaternion(referenceQuaternion);

    // Calculate angle differences
    //@ts-ignore
    const angleDiff = eulerRotation.toArray().map((angle, i) => angle - eulerReference.toArray()[i]);
    // Ensure angles are in the range [-180, 180]
    const normalizedAngles = angleDiff.map(angle => (angle + 180) % 360 - 180);
  
    // Convert euler angles to dice numbers (assuming 20-sided die)
    const numSides = 20;
    const anglePerSide = 360 / numSides;
    let diceNumber = Math.round(normalizedAngles[1] / anglePerSide);
    console.log(diceNumber)

  
    // Adjust for zero-based index and wrap around
    diceNumber = (diceNumber + numSides) % numSides;
  
    // Account for the orientation of the die
    diceNumber = (diceNumber + 5) % numSides + 1;
  
    return diceNumber;
  }