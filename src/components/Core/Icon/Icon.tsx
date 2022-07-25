/*eslint-disable*/
import classnames from 'classnames';

const Icon = ({ name = '', family = '', className = '', style = {} }: any) =>
  <i style={style} className={classnames(family, family ? `${family}-${name}` : name, className)} />;

export default Icon;
