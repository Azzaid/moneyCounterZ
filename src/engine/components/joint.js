import Matter from "matter-js";
import { JOINT } from "../../constants/gameObjects.js"

export default class Joint {
  constructor(x, y, engine) {
    this.initialX = x;
    this.initialY = y;
    this.x = x;
    this.y = y;
    this.engine = engine;
    this.type = JOINT.typeString;
    this.matterObject = Matter.Bodies.circle(
      this.initialX, this.initialY, JOINT.bodyRadius,
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