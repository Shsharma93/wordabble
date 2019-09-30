const getHandValue = () => {
  const random = Math.floor(Math.random() * 3) + 0;
  const handList = [
    [
      { id: 'item-1', letter: 'i', value: 1 },
      { id: 'item-2', letter: 'n', value: 2 },
      { id: 'item-3', letter: 'e', value: 3 },
      { id: 'item-4', letter: 'r', value: 4 },
      { id: 'item-5', letter: 't', value: 5 },
      { id: 'item-6', letter: 'i', value: 6 },
      { id: 'item-7', letter: 'a', value: 7 }
    ],
    [
      { id: 'item-1', letter: 'a', value: 1 },
      { id: 'item-2', letter: 'n', value: 2 },
      { id: 'item-3', letter: 'i', value: 3 },
      { id: 'item-4', letter: 'm', value: 4 },
      { id: 'item-5', letter: 'a', value: 5 },
      { id: 'item-6', letter: 't', value: 6 },
      { id: 'item-7', letter: 'e', value: 7 }
    ],
    [
      { id: 'item-1', letter: 'a', value: 1 },
      { id: 'item-2', letter: 's', value: 2 },
      { id: 'item-3', letter: 'o', value: 3 },
      { id: 'item-4', letter: 'c', value: 4 },
      { id: 'item-5', letter: 'i', value: 5 },
      { id: 'item-6', letter: 'a', value: 6 },
      { id: 'item-7', letter: 'l', value: 7 }
    ]
  ];
  return handList[random];
};

// const getHandValue = () => {
//   return Array.from({ length: 7 }, (v, k) => k).map(k => {
//     const random = Math.floor(Math.random() * 26) + 0;
//     const letter = Object.keys(letterValues)[random];
//     const value = letterValues[letter];
//     return {
//       id: `letter-${k}`,
//       letter,
//       value
//     };
//   });
// };

export default getHandValue;
