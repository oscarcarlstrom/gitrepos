const compareByProperty = (property, compareAscending) => {
  return (a, b) => {
    const c = compareAscending ? -1 : 1;
    const propA = isString(a[property]) ? a[property].toLowerCase() : a[property];
    const propB = isString(b[property]) ? b[property].toLowerCase() : b[property];

    if (propA < propB) {
      return c;
    }
    else if (propA > propB) {
      return c * -1;
    }
    return 0;
  }
};

const isString = (s) => typeof s === "string";

export {compareByProperty, isString};
