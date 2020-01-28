import {getLengthBetweenDots} from '../math/planimetry.ts'
import { JOINT } from "../../constants/physicalConstants.js"

export default function clickedJoint(dot, jointsList) {
    let clickedJoint = undefined;
    jointsList.forEach(joint => {
        if (getLengthBetweenDots(dot, joint.initialPosition) < JOINT.visualRadius) clickedJoint = joint;
    });
    return clickedJoint;
}