import clsx from 'clsx';

interface IIcon {
  name: any;
  family: any;
  className: any;
  style?: Record<any, any> | undefined;
}

function Icon({
  name = '',
  family = '',
  className = '',
  style = {},
}: IIcon): JSX.Element {
  return (
    <i
      style={style}
      className={clsx(family, family ? `${family}-${name}` : name, className)}
    />
  );
}

export default Icon;
