const chunk = (arr: any[] | null | string, size: number) =>
  arr?.length &&
  size &&
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr?.slice(i * size, i * size + size),
  );

export default chunk;
