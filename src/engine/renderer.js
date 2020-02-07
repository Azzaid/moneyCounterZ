import Matter from "matter-js";

import clickedJoint from './helperFunctions/clickedJoint'

import Joint from "./components/joint.js"
import Bone from "./components/bone.js"
import Ground from "./components/ground.js"

import { RENDERER } from "../constants/physicalConstants"
import { hills, flat } from "../constants/groundMaps"

export default class Renderer {
    constructor (engine, canvas) {
        this.gameCanvas = canvas;
        this.engine = engine;
        this.context = this.gameCanvas.getContext('2d');

        this.cameraXOffset = 0;
        this.cameraYOffset = 0;
    }

    draw () {
        this.engine
    }
}