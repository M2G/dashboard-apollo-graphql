import { useSelector, shallowEqual } from 'react-redux';

export default (selector: (state: any) => unknown) => useSelector(selector, shallowEqual);
