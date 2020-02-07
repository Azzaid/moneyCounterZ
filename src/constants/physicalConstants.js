export const GROUND = {
  thickness:10,
  friction:0.8,
  collisionBitset:0x011,
  collisionBitmask:0x100,
};

export const JOINT = {
  bodyRadius:15,
  visualRadius:40,
  collisionBitset:0x101,
  collisionBitmask:0x010,
  typeString: 'JOINT',
  density: 0.04,
  friction:0.5,
  frictionAir: 0.00001,
  restitution: 0.3,
};

export const BONE = {
  thickness:15,
  collisionBitset:0x101,
  collisionBitmask:0x001,
  typeString: 'BONE',
  density: 0.04,
  friction: 0.01,
  frictionAir: 0.00001,
  restitution: 0.8,
};

export const CONSTRAINT = {
  damping:0.1,
  stiffness:0.7,
  length:3,
};

export const RENDERER = {
  options:{
    width: 800,
    height: 800,
    wireframes: true,
  }
};