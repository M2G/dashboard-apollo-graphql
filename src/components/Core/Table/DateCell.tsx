/*eslint-disable*/
import { instanceOf } from 'prop-types';


function DateCell({ date }: number | any) {

  console.log('DateCell', date)

  return (
    <div className="date_cell">
      {date > 0 ? (
        <>
          <div>{new Date(date * 1000).toLocaleDateString()}</div>
          <div>{new Date(date * 1000).toLocaleTimeString()}</div>
        </>
      ) : (
        '-'
      )}
    </div>
  );
}

DateCell.propTypes = {
  date: instanceOf(Date),
};

export default DateCell;
