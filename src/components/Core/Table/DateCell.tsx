import type { Maybe } from 'graphql/generated';

interface IDateCell {
  readonly date: Maybe<number> | undefined;
}

function DateCell({ date }: IDateCell): JSX.Element {
  return (
    <div className="date_cell">
      {date && date > 0 ? (
        <>
          <div>{new Date(date * 1000).toLocaleDateString()}</div>
          <div>{new Date(date * 1000).toLocaleTimeString()}</div>
        </>
      ) : null}
    </div>
  );
}

export default DateCell;
