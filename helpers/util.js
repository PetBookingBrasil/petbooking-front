export const toCamel = (s) => {
  return s.toLowerCase().replace(/([-_][A-Z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};
