/*eslint-disable*/
interface IDateCell {
  date?: number;
}

function DateCell({ date }: IDateCell) {
  return <div className="date_cell">
      {date && date > 0 ? (
        <>
          <div>{new Date(date * 1000).toLocaleDateString()}</div>
          <div>{new Date(date * 1000).toLocaleTimeString()}</div>
        </>
      ) : (
        '-'
      )}
    </div>
}

export default DateCell;
