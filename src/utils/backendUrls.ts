export const filterUrl = (filterValue: string) => {
  return `${process.env.REACT_APP_HTTP_FILTER_URL}?search=${filterValue}`;
};
