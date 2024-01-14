import { HTMLAttributes, ReactNode } from 'react';

import { AnyComponent } from '@types';

interface CellProps extends HTMLAttributes<HTMLDivElement> {
  tag?: 'div';
  children: ReactNode;
}

/**
 * A card component to display content in a card-like layout.
 * By default, it will display its content in a row with wrap.
 * You can override this behavior by passing a `className` prop.
 *
 * @param tag - The tag to use for the card. Defaults to `div`.
 * @param children - The content to display.
 *
 * @returns {JSX.Element}
 */
function Cell({ tag = 'div', children, ...rest }: CellProps) {
  const DynamicTag = tag || (`${tag}` as keyof AnyComponent);

  return (
    <DynamicTag {...rest} className={rest.className}>
      {children}
    </DynamicTag>
  );
}

export default Cell;
