export const GRADE_COUNT = 10;

export const COLORS_NAME = [
  'magenta',
  'orange',
  'yellow',
  'green',
  'tiffany',
  'skyblue',
  'blue',
  'purpil',
  'silver',
  'black',
];

export const COLORS_ID = COLORS_NAME.reduce((acc, name, idx) => ({ ...acc, [name]: idx }), {});
