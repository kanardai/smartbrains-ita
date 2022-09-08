export const checkUrlSymbol = (e: string) => {
  if (e.length === 0) {
    return true;
  } else return !e.match(/^[A-Za-z0-9\-]+$/);
};
