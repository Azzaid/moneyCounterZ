export function getLineLenght (dot1X: number, dot1Y: number, dot2X: number, dot2Y: number) {
  return Math.sqrt(Math.pow((dot1Y - dot2Y) ,2) + Math.pow((dot1X - dot2X),2));
}

export function getAngleBetweenDots(dot1X: number, dot1Y: number, dot2X: number, dot2Y: number) {
  let x: number;
  let y: number;
  x = +(dot2X - dot1X).toFixed(0);
  y = +(dot2Y - dot1Y).toFixed(0);

  let angle: number;

  if (x != 0) {
    angle = Math.atan(y/x);
  } else {
    angle = Math.sign(y) * Math.PI/2;
  }

  return angle;
}