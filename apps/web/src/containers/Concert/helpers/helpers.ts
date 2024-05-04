function chunk(arr: [] | null | string, size: number) {
  return (
    arr?.length &&
    size &&
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr?.slice(i * size, i * size + size),
    )
  );
}

export default chunk;
