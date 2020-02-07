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
        density: JOINT.density,
        friction: JOINT.friction,
        frictionAir: JOINT.frictionAir,
        restitution: JOINT.restitution,
        collisionFilter:{
            category:JOINT.collisionBitset,
            mask:JOINT.collisionBitmask
        }
      });
    Matter.World.add(this.engine.world, [this.matterObject]);
  }
}