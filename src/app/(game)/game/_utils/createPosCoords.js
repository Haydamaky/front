const positionCoors = [
  'left-[6%] top-[9.5%]',
  ...Array.from(
    { length: 9 },
    (_, i) =>
      'left-[' + Math.floor((17.5 + 7.7 * i) * 10) / 10 + '%] top-[9.5%]',
  ),
  'left-[90.8%] top-[9.5%]',
  ...Array.from(
    { length: 9 },
    (_, i) =>
      'left-[90.8%] top-[' + Math.floor((20 + 7.1 * i) * 10) / 10 + '%]',
  ),
  'left-[90.8%] top-[87%]',
  ...Array.from(
    { length: 9 },
    (_, i) =>
      'left-[' + Math.floor((79.2 - 7.69 * i) * 10) / 10 + '%] top-[87%]',
  ),
  'left-[6%] top-[87%]',
  ...Array.from(
    { length: 9 },
    (_, i) => 'left-[6%] top-[' + Math.floor((76.5 - 7.1 * i) * 10) / 10 + '%]',
  ),
  'left-[6%] top-[9.5%]',
];
console.log(positionCoors);
