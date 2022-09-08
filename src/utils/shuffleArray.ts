export const shuffleArray = <Type>(array: Type[]) => {
  return array.sort(() => Math.random() - 0.5);
};
