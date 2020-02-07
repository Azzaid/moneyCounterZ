import {getAngleBetweenDots, getLengthBetweenDots, getLineCenter} from "../math/planimetry.ts";
import Matter from "matter-js";
import {BONE, GROUND} from "../../constants/physicalConstants";

export default class Ground {
    constructor(engine) {
        this.groundObjectsList = [];
        this.engine = engine;


    }

    create(heightMap) {
        this.heightMap = heightMap.slice();

        let previousDot = false;
        this.heightMap.forEach(dot => {
            if (previousDot) {
                const length = getLengthBetweenDots(previousDot, dot);
                const angle = getAngleBetweenDots(previousDot, dot);
                const initialPosition = getLineCenter(previousDot, dot);

                const matterObject = Matter.Bodies.rectangle(initialPosition.x, initialPosition.y, length, GROUND.thickness, {
                    angle:angle,
                    isStatic:true,
                    friction:GROUND.friction,
                    collisionFilter:{
                        category:GROUND.collisionBitset,
                        mask:GROUND.collisionBitmask
                    }
                });

                this.groundObjectsList.push(matterObject);
                Matter.World.add(this.engine.world, [matterObject]);
            }

            previousDot = dot;
        });
    }
}