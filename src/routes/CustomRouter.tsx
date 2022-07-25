/*eslint-disable*/
import { useLayoutEffect, useState } from 'react';
import type { BrowserRouterProps } from 'react-router-dom';
import { Router } from 'react-router-dom';
import type { BrowserHistory } from 'history';

interface Props extends BrowserRouterProps {
  history: BrowserHistory;
}

function CustomRouter({ history, ...props }: Props | any) {

  console.log('history', history)

  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return <Router
      // eslint-disable-next-line
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
}

export default CustomRouter;
