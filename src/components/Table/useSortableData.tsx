import { useMemo, useState } from 'react';

const useSortableData = (items: any, config = null) => {
  const [sortConfig, setSortConfig] = useState<any>(config);

  const sortedItems = useMemo(() => {
    const sortableItems: any = [...items];
    if (sortConfig !== null) {
      sortableItems.sort(
        (a: Record<string, number> | any, b: Record<string, number> | any) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        },
      );
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: any) => {
    let direction = 'ascending';
    if (
      sortConfig
      && sortConfig.key === key
      && sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ direction, key });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

export default useSortableData;
