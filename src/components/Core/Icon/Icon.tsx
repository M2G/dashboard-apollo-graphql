import classnames from 'classnames';

interface IIcon {
  name: any;
  family: any;
  className: any;
  // eslint-disable-next-line react/require-default-props
  style?: Record<any, any> | undefined;
}

function Icon({
 name = '', family = '', className = '', style = {},
}: IIcon) {
  return <i style={style} className={classnames(family, family ? `${family}-${name}` : name, className)} />;
}

export default Icon;
