import InfiniteScroll from './InfiniteScroll';
import { render, screen } from '@testing-library/react';

describe('test InfiniteScroll', () => {
  test('should render', () => {
    const onLoadMore = jest.fn();

    render(
      <InfiniteScroll hasMore loading={false} onLoadMore={onLoadMore}>
        <div className="o-grid__row">
          <div className="min-w-[270px] max-w-[270px] rounded-lg border border-gray-700 bg-transparent p-6 shadow dark:border-gray-700 dark:bg-gray-800 ">
            <div className="o-cell--one">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Kalash at Le point fort daubervilliers (June 08, 2024)
              </h5>
              <p className="mb-3 font-normal text-dark dark:text-white">
                Paris, France
              </p>
              <a
                href="https://www.songkick.com/concerts/41170526-guy2bezbar-at-le-point-fort-daubervilliers"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Go somewhere
                <svg
                  aria-hidden="true"
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  fill="none"
                  viewBox="0 0 14 10"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="min-w-[270px] max-w-[270px] rounded-lg border border-gray-700 bg-transparent p-6 shadow dark:border-gray-700 dark:bg-gray-800 ">
            <div className="o-cell--one">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Lomepal at Accor Arena (December 05, 2024)
              </h5>
              <p className="mb-3 font-normal text-dark dark:text-white">
                Paris, France
              </p>
              <a
                href="https://www.songkick.com/concerts/40728528-lomepal-at-accor-arena"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Go somewhere
                <svg
                  aria-hidden="true"
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  fill="none"
                  viewBox="0 0 14 10"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="min-w-[270px] max-w-[270px] rounded-lg border border-gray-700 bg-transparent p-6 shadow dark:border-gray-700 dark:bg-gray-800 ">
            <div className="o-cell--one">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Ichon at Olympia (November 16, 2023)
              </h5>
              <p className="mb-3 font-normal text-dark dark:text-white">
                Paris, France
              </p>
              <a
                href="https://www.songkick.com/concerts/40290936-ichon-at-lolympia"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Go somewhere
                <svg
                  aria-hidden="true"
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  fill="none"
                  viewBox="0 0 14 10"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="min-w-[270px] max-w-[270px] rounded-lg border border-gray-700 bg-transparent p-6 shadow dark:border-gray-700 dark:bg-gray-800 ">
            <div className="o-cell--one">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Kalash at Le point fort daubervilliers (June 08, 2024)
              </h5>
              <p className="mb-3 font-normal text-dark dark:text-white">
                Paris, France
              </p>
              <a
                href="https://www.songkick.com/concerts/41170527-guy2bezbar-at-le-point-fort-daubervilliers"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Go somewhere
                <svg
                  aria-hidden="true"
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  fill="none"
                  viewBox="0 0 14 10"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </InfiniteScroll>,
    );

    expect(
      screen.getAllByText(
        'Kalash at Le point fort daubervilliers (June 08, 2024)',
      )[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByText('Lomepal at Accor Arena (December 05, 2024)')[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByText('Ichon at Olympia (November 16, 2023)')[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(
        'Kalash at Le point fort daubervilliers (June 08, 2024)',
      )[0],
    ).toBeInTheDocument();
  });
});
