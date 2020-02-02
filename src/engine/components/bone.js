import Matter from "matter-js";

import { getLengthBetweenDots, getProjectedLengthBetweenDots, getAngleBetweenDots, getLineCenter } from "../math/planimetry.ts"

import { BONE, JOINT, CONSTRAINT } from "../../constants/physicalConstants.js"

export default class Bone {
  constructor(joint1, joint2, engine) {
    
    this.bodyLenght = getLengthBetweenDots(joint1.initialPosition, joint2.initialPosition) - JOINT.bodyRadius*2;
    this.initialAngle = getAngleBetweenDots(joint1.initialPosition, joint2.initialPosition);
    this.initialPosition = getLineCenter(joint1.initialPosition, joint2.initialPosition);

    const shiftList = getProjectedLengthBetweenDots(joint1.initialPosition, this.initialPosition).concat(getProjectedLengthBetweenDots(joint2.initialPosition, this.initialPosition));

    shiftList.forEach(shift => {
      shift = shift - Math.sign(shift)*JOINT.bodyRadius/4
    });

    this.matterObject = Matter.Bodies.rectangle(this.initialPosition.x, this.initialPosition.y, this.bodyLenght, BONE.thickness, {
      angle: this.initialAngle,
      density: 0.04,
      friction: 0.01,
      frictionAir: 0.00001,
      restitution: 0.8,
      collisionFilter:{
        group:BONE.collisionBitset,
        mask:BONE.collisionBitmask
      }
    });
    this.constraintWithJoint1 = Matter.Constraint.create({
      bodyA:joint1.matterObject,
      bodyB:this.matterObject,
      pointA:{x:0, y:0},
      pointB:{x:shiftList[0], y:shiftList[1]},
      damping:CONSTRAINT.damping,
      stiffness:CONSTRAINT.stiffness});
    this.constraintWithJoint2 = Matter.Constraint.create({
      bodyA:joint2.matterObject,
      bodyB:this.matterObject,
      pointA:{x:0, y:0},
      pointB:{x:shiftList[2], y:shiftList[3]},
      damping:CONSTRAINT.damping,
      stiffness:CONSTRAINT.stiffness});
    Matter.World.add(engine.world, [this.matterObject, this.constraintWithJoint1, this.constraintWithJoint2]);
  }
}