import Matter from "matter-js";

import { getLengthBetweenDots, getProjectedLengthBetweenDots, getAngleBetweenDots, getLineCenter, shiftDot } from "../math/planimetry.ts"

import { BONE, CONSTRAINT } from "../../constants/physicalConstants.js"

export default class Bone {
  constructor(joint1, joint2, engine) {
    
    this.bodyLenght = getLengthBetweenDots(joint1.initialPosition, joint2.initialPosition);
    this.initialAngle = getAngleBetweenDots(joint1.initialPosition, joint2.initialPosition);
    this.initialPosition = getLineCenter(joint1.initialPosition, joint2.initialPosition);

    console.log('angles is ', this.initialAngle, this.initialAngle - Math.PI/2);
    const joint1ConstraintShift = getProjectedLengthBetweenDots(joint1.initialPosition, this.initialPosition);
    const joint2ConstraintShift = getProjectedLengthBetweenDots(joint2.initialPosition, this.initialPosition);

    this.matterObject = Matter.Bodies.rectangle(this.initialPosition.x, this.initialPosition.y, this.bodyLenght, BONE.thickness, {
      angle: this.initialAngle,
      density: BONE.density,
      friction: BONE.friction,
      frictionAir: BONE.frictionAir,
      restitution: BONE.restitution,
      collisionFilter:{
        category:BONE.collisionBitset,
        mask:BONE.collisionBitmask
      }
    });
    this.constraintWithJoint1 = Matter.Constraint.create({
      bodyA:joint1.matterObject,
      bodyB:this.matterObject,
      pointB:{x:joint1ConstraintShift.x, y:joint1ConstraintShift.y},
      damping:CONSTRAINT.damping,
      stiffness:CONSTRAINT.stiffness});
    this.constraintWithJoint2 = Matter.Constraint.create({
      bodyA:joint2.matterObject,
      bodyB:this.matterObject,
      pointA:{x:0, y:0},
      pointB:{x:joint2ConstraintShift.x, y:joint2ConstraintShift.y},
      damping:CONSTRAINT.damping,
      stiffness:CONSTRAINT.stiffness});
    Matter.World.add(engine.world, [this.matterObject, this.constraintWithJoint1, this.constraintWithJoint2]);
  }
}