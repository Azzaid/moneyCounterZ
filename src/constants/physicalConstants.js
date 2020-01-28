export const GROUND = {
  thickness:10,
  friction:0.8
};

export const JOINT = {
  bodyRadius:15,
  visualRadius:40,
  friction:0.1,
  collisionBitset:0x0001,
  collisionBitmask:0x0001,
  typeString: 'JOINT'
};

export const BONE = {
  thickness:15,
  collisionBitset:0x0010,
  collisionBitmask:0x0010,
  typeString: 'BONE'
};

export const CONSTRAINT = {
  damping:1,
  stiffness:1,
  length:3,
};

export const RENDERER = {
  options:{
    width: 800,
    height: 800,
    wireframes: true,
  }
};