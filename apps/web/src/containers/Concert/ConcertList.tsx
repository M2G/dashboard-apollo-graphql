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
    <Card className="ml-2">
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
              className="lucide lucide-chevron-right ml-2"
              fill="none"
              height="20"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="20"
              xmlns="http://www.w3.org/2000/svg">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
        </div>
      </div>
    </Card>
  );
}

export default memo(ConcertList);
