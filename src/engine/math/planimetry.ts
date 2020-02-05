interface dot {
  x: number;
  y: number;
}

export function getLengthBetweenDots (dot1: dot, dot2: dot) {
  return Math.sqrt(Math.pow((dot1.y - dot2.y) ,2) + Math.pow((dot1.x - dot2.x),2));
}

export function getProjectedLengthBetweenDots(dot1: dot, dot2: dot) {
  const xAxisProjection: number = dot1.x - dot2.x;
  const yAxisProjection: number = dot1.y - dot2.y;

  return {x:xAxisProjection, y:yAxisProjection};
}

export function getAngleBetweenDots(dot1: dot, dot2: dot) {
  let xAxisProjection: number;
  let yAxisProjection: number;

  xAxisProjection = +(dot2.x - dot1.x).toFixed(0);
  yAxisProjection = +(dot2.y - dot1.y).toFixed(0);

  let angle: number;

  if (xAxisProjection != 0) {
    angle = Math.atan(yAxisProjection/xAxisProjection);
  } else {
    angle = (yAxisProjection > 0 ? 1 : -1) * Math.PI/2;
  }

  return angle;
}

export function shiftDot(dot: dot, length: number, angle: number) {
  const xShift: number = length*Math.cos(angle);
  const yShift: number = length*Math.sin(angle);

  const shiftedDot: dot = {x:dot.x + xShift, y:dot.y + yShift};
  return shiftedDot;
}

export function getLineCenter(dot1: dot, dot2: dot) {
  let center: dot = {x:0, y:0};

  center.x = Math.min(dot1.x, dot2.x) + Math.abs(dot1.x - dot2.x)/2;
  center.y = Math.min(dot1.y, dot2.y) + Math.abs(dot1.y - dot2.y)/2;
  center.x = +center.x.toFixed(0);
  center.y = +center.y.toFixed(0);

  return center;
}

export function getVectorProjections(lenght: number, angle: number) {
  let xAxisProjection: number;
  let yAxisProjection: number;

  return {xAxisProjection, yAxisProjection};
}