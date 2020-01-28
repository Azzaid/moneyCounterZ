import Matter from "matter-js";
import { JOINT } from "../../constants/physicalConstants.js"

export default class Joint {
  constructor(x, y, engine) {
    this.initialPosition = {x, y};
    this.engine = engine;
    this.type = JOINT.typeString;
    this.matterObject = Matter.Bodies.circle(
        this.initialPosition.x, this.initialPosition.y, JOINT.bodyRadius,
      {
        density: 0.04,
        friction: JOINT.friction,
        frictionAir: 0.00001,
        restitution: 0.8,
        collisionFilter:{
          group:JOINT.collisionBitset,
          mask:JOINT.collisionBitmask
        }
      });
    Matter.World.add(this.engine.world, [this.matterObject]);
  }
}