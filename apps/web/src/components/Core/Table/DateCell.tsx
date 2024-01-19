interface IDateCell {
  readonly date?: number;
}

function DateCell({ date }: IDateCell): JSX.Element | undefined {
  return (
    date && (
      <div className="date_cell">
        <div>{new Date(date).toLocaleDateString()}</div>
        <div>{new Date(date).toLocaleTimeString()}</div>
      </div>
    )
  );
}

export default DateCell;
