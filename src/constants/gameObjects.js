export const GROUND = {
  thickness:10,
  friction:0.8,
  coordinates:[{x:0,y:400}, {x:200, y:700}, {x:300,y:700}, {x:350,y:650}, {x:400,y:600}, {x:500,y:550},
    {x:500,y:700}, {x:700,y:700}, {x:700,y:500}, {x:800,y:500}],
};

export const JOINT = {
  bodyRadius:15,
  visualRadius:40,
  friction:0.1,
  collisionBitset:0x0010,
  collisionBitmask:0x0001,
  typeString: 'JOINT'
};

export const RENDERER = {
  options:{
    width: 800,
    height: 800,
    wireframes: false,
  }
};