/*eslint-disable*/
import { createContext, useState } from 'react';

export const FilterContext = createContext<Record<any, any>>({});

function Provider({ children }: any) {
const [state, setSate] = useState<any>(() => {});

  const value = {
    data: state,
    userData: (data: string) => {
      setSate(data);
    }
  }

  console.log('FilterContext value', value)

  return <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
}

export default { Provider, Consumer: FilterContext.Consumer };
