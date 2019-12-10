import {getLengthBetweenDots} from '../math/planimetry.ts'
import { JOINT } from "../../constants/gameObjects.js"

export default function clickedJoint(dot, jointsList) {
    let clickedJoint = undefined;
    jointsList.forEach(joint => {
        if (getLengthBetweenDots(dot.x, dot.y, joint.x, joint.y) < JOINT.visualRadius) clickedJoint = joint;
    });
    return clickedJoint;
}