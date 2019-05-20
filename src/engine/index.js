import Matter from "matter-js";
import { getLineLenght, getAngleBetweenDots } from "./math/planimetry.ts"
import { GROUND, RENDERER } from "../constants/gameObjects"
import Joint from "./components/joint.js"

export default class Engine {
    constructor () {
      this.gameCanvas = document.createElement("canvas");
      this.gameCanvas.addEventListener('click', event => {this.addJoint(event.clientX - this.gamefieldCornerX, event.clientY - this.gamefieldCornerY)});

      this.engine = Matter.Engine.create();

      this.jointsList = [];
    }

    mount(gameFieldDOMObj) {
      this.gameFieldWrapper = gameFieldDOMObj;
      this.gameFieldWrapper.appendChild(this.gameCanvas);

      console.log(this.gameFieldWrapper, 'rendered into', this.gameCanvas);
      this.updateGamefieldPosition();

      this.renderer = Matter.Render.create({canvas:this.gameCanvas, engine:this.engine, options:RENDERER.options});
      Matter.Render.run(this.renderer);

      this.addGround([{x:0,y:400}, {x:200, y:700}, {x:300,y:700}, {x:350,y:650}, {x:400,y:600}, {x:500,y:550},
        {x:500,y:700}, {x:700,y:700}, {x:700,y:500}, {x:800,y:500}]);
    }

    updateGamefieldPosition() {
        const gamefieldCorner = this.gameCanvas.getBoundingClientRect();
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

  getJointsList() {
    let jointsList = this.jointsList.map(joint => {return ({x: joint.initialX, y: joint.initialY})});;
    return jointsList;
  }

  loadJointsFromList(jointsList) {
    jointsList.forEach(joint => this.addJoint(joint.x, joint.y))
  }

  startSimulation(time) {
    console.debug('start');
    const stepTime = isFinite(time) ? time : false;
    const startTime = new Date().getTime();
    this.renderStep(startTime, startTime, stepTime)
  };

  stopSimulation() {
    console.debug('stop');
    this.stopAnimationFlag = true;
  };

  renderStep(animationStartTime, previousCallTime, targetAnimationLength)  {
    const currentTime = new Date().getTime();
    Matter.Engine.update(this.engine, previousCallTime-currentTime, 1);
    if (!this.stopAnimationFlag) {
      if (!targetAnimationLength || currentTime - animationStartTime < targetAnimationLength) window.requestAnimationFrame(()=>{
        this.renderStep(animationStartTime, currentTime, targetAnimationLength)
      })
    } else {
      this.stopAnimationFlag = false;
    }
  };
}