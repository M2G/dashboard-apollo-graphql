function Cell({ children, classes }: any) {
  return <div className={`o-cell--${classes}`}>{children}</div>;
}

export default Cell;
