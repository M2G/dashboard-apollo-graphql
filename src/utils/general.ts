const getRandomId = (size = 8) =>
  Math.random()
    .toString(36)
    // eslint-disable-next-line require-unicode-regexp
    .replace(/[^a-z]+/g, '')
    .substr(0, size);

export default getRandomId;
