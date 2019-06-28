import Matter from "matter-js";
import { BONE, JOINT, CONSTRAINT } from "../../constants/gameObjects.js"


export default class Bone {
  constructor(joint1, joint2, index, engine, handleBoneClick) {
    this.joint1 = joint1;
    this.joint2 = joint2;
    this.index = index;
    this.engine = engine;
    this.handleBoneClick = handleBoneClick(index);
    
    this.bodyLenght = Math.sqrt(Math.pow((this.joint1.y-this.joint2.y) ,2) + Math.pow((this.joint1.x-this.joint2.x),2)) - JOINT.bodyRadius*2;
    const angle = getAngleBetweenDots([this.joint1.x,this.joint1.y],[this.joint2.x,this.joint2.y]);
    
    this.x = Math.min(this.joint1.x, this.joint2.x)+ Math.abs(this.joint1.x - this.joint2.x)/2;
    this.y = Math.min(this.joint1.y, this.joint2.y)+ Math.abs(this.joint1.y - this.joint2.y)/2;
    
    this.initialX = this.x;
    this.initialY = this.y;
    this.initialAngle = angle;
    
    this.matterObject = Matter.Bodies.rectangle(this.x, this.y, this.bodyLenght, BONE.thickness, {
      angle:angle/57.29,
      density: 0.04,
      friction: 0.01,
      frictionAir: 0.00001,
      restitution: 0.8,
    });
    this.constraintWithJoint1 = Matter.Constraint.create({
      bodyA:joint1.matterObject,
      bodyB:this.matterObject,
      pointA:{x:JOINT.bodyRadius*Math.cos(angle/57.29),
        y:JOINT.bodyRadius*Math.sin(angle/57.29)},
      pointB:{x:(-1)*this.bodyLenght/2*Math.cos(angle/57.29) + BONE.thickness/2*Math.sin(angle/57.29)},
      damping:CONSTRAINT.damping,
      stiffness:CONSTRAINT.stiffness});
    this.constraintWithJoint2 = Matter.Constraint.create({
      bodyA:joint2.matterObject,
      bodyB:this.matterObject,
      pointA:{x:(-1)*JOINT.bodyRadius*Math.cos(angle/57.29),
        y:(-1)*JOINT.bodyRadius*Math.sin(angle/57.29)},
      pointB:{x:this.bodyLenght/2*Math.cos(angle/57.29) + BONE.thickness/2*Math.sin(angle/57.29)},
      damping:CONSTRAINT.damping,
      stiffness:CONSTRAINT.stiffness});
    Matter.World.add(this.engine.world, [this.matterObject, this.constraintWithJoint1, this.constraintWithJoint2]);
  }
  
  render(isSelected) {
    this.x = this.matterObject.position.x;
    this.y = this.matterObject.position.y;
    const angle = this.matterObject.angle * 57.29;
    return (
      <div id = {`bone_${this.index}`}
    className = "bone"
    style={{
      width:this.bodyLenght+BONE.visualJointOverlap*2,
        height:BONE.thickness,
        transform:`translate(${this.x-this.bodyLenght/2-BONE.visualJointOverlap}px, ${this.y-BONE.thickness/2}px) rotate(${angle}deg)`,
        background:`${isSelected ? 'green' : 'blue'}`}}
    onClick={this.handleBoneClick}/>
  )
  }
}