export const cleanString = (str: string) => {
  return str.toLowerCase().normalize('NFKD').replace(/[^\w]/g, '');
};
