const imageFilter = (images) => {
  Object.filter = (obj, predicate) =>
    Object.keys(obj)
      .filter((key) => predicate(obj[key]))
      .reduce((res, key) => ((res[key] = obj[key]), res), {});
  const image = Object.filter(images, (value) => value !== "");
  return image;
};

module.exports = imageFilter;
