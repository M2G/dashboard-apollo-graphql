/*eslint-disable*/
import classnames from 'classnames';

function Icon({
 name = '', family = '', className = '', style = {},
}: any) {
  return <i style={style} className={classnames(family, family ? `${family}-${name}` : name, className)} />;
}

export default Icon;
