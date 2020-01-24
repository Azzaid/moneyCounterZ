import Matter from "matter-js";
import { BONE, JOINT, CONSTRAINT } from "../../constants/gameObjects.js"
import { getLengthBetweenDots, getAngleBetweenDots } from "../math/planimetry.ts"


export default class Bone {
  constructor(joint1, joint2, engine) {
    
    this.bodyLenght = getLengthBetweenDots(joint1.x, joint1.y, joint2.x, joint2.y) - JOINT.bodyRadius*2;
    const angle = getAngleBetweenDots(joint1.x, joint1.y, joint2.x, joint2.y);
    
    this.x = Math.min(joint1.x, joint2.x)+ Math.abs(joint1.x - joint2.x)/2;
    this.y = Math.min(joint1.y, joint2.y)+ Math.abs(joint1.y - joint2.y)/2;
    
    this.initialX = this.x;
    this.initialY = this.y;
    this.initialAngle = angle;
    
    this.matterObject = Matter.Bodies.rectangle(this.x, this.y, this.bodyLenght, BONE.thickness, {
      angle:angle,
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
      pointA:{x:JOINT.bodyRadius*Math.cos(angle), y:JOINT.bodyRadius*Math.sin(angle)},
      pointB:{x:(-1)*this.bodyLenght/2*Math.cos(angle) + BONE.thickness/2*Math.sin(angle)},
      damping:CONSTRAINT.damping,
      stiffness:CONSTRAINT.stiffness});
    this.constraintWithJoint2 = Matter.Constraint.create({
      bodyA:joint2.matterObject,
      bodyB:this.matterObject,
      pointA:{x:(-1)*JOINT.bodyRadius*Math.cos(angle), y:(-1)*JOINT.bodyRadius*Math.sin(angle)},
      pointB:{x:this.bodyLenght/2*Math.cos(angle) + BONE.thickness/2*Math.sin(angle)},
      damping:CONSTRAINT.damping,
      stiffness:CONSTRAINT.stiffness});
    Matter.World.add(engine.world, [this.matterObject, this.constraintWithJoint1, this.constraintWithJoint2]);
  }
}