import Matter from "matter-js";
import { getLineLenght, getAngleBetweenDots } from "./math/planimetry.ts"
import { GROUND } from "../constants/gameObjects"
import Joint from "./components/joint.js"

export default class Engine {
    constructor (DOMObj) {
        this.domObjectRef = DOMObj;
        this.engine = Matter.Engine.create();
        this.gameCanvas = document.createElement("canvas");
        this.gameCanvas.addEventListener('click', event => {this.addJoint(event.clientX - this.gamefieldCornerX, event.clientY - this.gamefieldCornerY)});
        this.domObjectRef.appendChild(this.gameCanvas);
        this.renderer = Matter.Render.create({canvas:this.gameCanvas, engine:this.engine});
        Matter.Render.run(this.renderer);
        this.updateGamefieldPosition();
        this.addGround([{x:0,y:400}, {x:300, y:400}, {x:500,y:450}, {x:600,y:450}, {x:800,y:400}]);

      this.jointsList = [];
    }

    updateGamefieldPosition() {
        const gamefieldCorner = this.domObjectRef.getBoundingClientRect();
        this.gamefieldCornerX = gamefieldCorner.left;
        this.gamefieldCornerY = gamefieldCorner.top;
    };

  addGround(groundSurfaceArray) {
    let previousDot = false;
    groundSurfaceArray.forEach(({x,y}) => {
      if (previousDot) {
        const length = getLineLenght(previousDot.x, previousDot.y, x, y);
        const angle = getAngleBetweenDots(previousDot.x, previousDot.y, x, y);

        const centerX = Math.min(previousDot.x, x) + Math.abs(previousDot.x - x)/2;
        const centerY = Math.min(previousDot.y, y) + Math.abs(previousDot.y - y)/2;

        const matterObject = Matter.Bodies.rectangle(centerX, centerY, length, GROUND.thickness, {
          angle:angle,
          isStatic:true,
          friction:GROUND.friction,
        });

        Matter.World.add(this.engine.world, [matterObject]);

        previousDot = {x:x, y:y};

      } else {
        previousDot = {x:x, y:y};
      }
    })
  };

  addJoint(x,y) {
    this.jointsList.push(new Joint(x, y, this.engine));
  };
}