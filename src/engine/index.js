import Matter from "matter-js";
import { getLineLenght, getAngleBetweenDots } from "./math/planimetry.ts"
import { GROUND, RENDERER } from "../constants/gameObjects"
import Joint from "./components/joint.js"

export default class Engine {
  constructor () {
    this.gameCanvas = document.createElement("canvas");
    this.gameCanvas.setAttribute("id", "gameCanvas");
    this.gameCanvas.addEventListener('mousedown', this.handleGameFieldClick);
    
    this.engine = Matter.Engine.create();
    
    this.jointsList = [];
    
    this.simInProgress = false;
    
    this.selectedJoint = false;
  }
  
  mount(gameFieldDOMObj) {
    this.gameFieldWrapper = gameFieldDOMObj;
    this.gameFieldWrapper.appendChild(this.gameCanvas);
    
    this.renderer = Matter.Render.create({canvas:this.gameCanvas, engine:this.engine, options:RENDERER.options});
    Matter.Render.run(this.renderer);
    
    this.addGround(GROUND.coordinates);
  }
  
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
  
  handleGameFieldClick(event) {
    this.addJoint(event.offsetX, event.offsetY)
  }
  
  addJoint(x, y) {
    if (!this.simInProgress) {
      this.jointsList.push(new Joint(x, y, this.engine));
    }
  };
  
  getJointsList() {
    let jointsList = this.jointsList.map(joint => {return ({x: joint.initialX, y: joint.initialY})});
    return jointsList;
  }
  
  loadJointsFromList(jointsList) {
    this.clearField();
    jointsList.forEach(joint => this.addJoint(joint.x, joint.y))
  }
  
  clearField() {
    Matter.Engine.clear(this.engine);
    this.addGround(GROUND.coordinates);
  }
  
  startSimulation(time) {
    console.debug('start');
    this.simInProgress = true;
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
      this.simInProgress = false;
    }
  };
}