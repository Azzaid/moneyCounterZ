export function getLineLenght (dot1X, dot1Y, dot2X, dot2Y) {
  return Math.sqrt(Math.pow((dot1Y - dot2Y) ,2) + Math.pow((dot1X - dot2X),2));
}

export function getAngleBetweenDots(dot1X, dot1Y, dot2X, dot2Y) {
  let x = (dot2X - dot1X).toFixed(0);
  let y = (dot2Y - dot1Y).toFixed(0);
  let angle = 0;

  if (x != 0) {
    angle = Math.atan(y/x);
  } else {
    angle = Math.sign(y) * Math.PI/2;
  }

  return angle;
}