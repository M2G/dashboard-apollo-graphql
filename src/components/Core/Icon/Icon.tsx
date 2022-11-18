/*eslint-disable*/
import classnames from 'classnames';

interface IIcon {
  name: any;
  family: any;
  className: any;
  style: any;
}

function Icon({ name = '', family = '', className = '', style = {} }: IIcon) {
  return <i style={style} className={classnames(family, family ? `${family}-${name}` : name, className)} />;
}

export default Icon;
