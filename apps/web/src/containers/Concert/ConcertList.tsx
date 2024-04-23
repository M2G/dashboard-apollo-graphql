import { memo } from 'react';
import { Card } from 'ui';

function ConcertList({
  node,
}: {
  node: {
    city: string;
    concert_id: string;
    display_name: string;
    uri: string;
  };
}): JSX.Element {
  return (
    <Card>
      <div className="o-cell--one">
        <div className="flex flex-col h-[200px]">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {node?.display_name}
          </h5>
          <p className="mb-3 font-normal text-dark dark:text-white grow">
            {node?.city}
          </p>
          <a
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            href={node?.uri || ''}>
            Go somewhere
            <svg
              aria-hidden="true"
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              fill="none"
              viewBox="0 0 14 10"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 5h12m0 0L9 1m4 4L9 9"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </a>
        </div>
      </div>
    </Card>
  );
}

export default memo(ConcertList);
