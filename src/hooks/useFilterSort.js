import { useMemo } from "react";

const useFilterSort = ({ data, filters = [], sortFn = null }) => {
  return useMemo(() => {
    let result = [...data];

    for (const filter of filters) {
      result = result.filter(filter);
    }

    if (sortFn) {
      result.sort(sortFn);
    }

    return result;
  }, [data, filters, sortFn]);
};

export default useFilterSort;
