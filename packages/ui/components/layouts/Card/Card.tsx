import { HTMLAttributes, ReactNode } from 'react';

import { AnyComponent } from '@types';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tag?: 'div' | 'header' | 'footer' | 'section' | 'article' | 'main';
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
function Card({ tag = 'div', children, ...rest }: CardProps) {
  const DynamicTag = tag || (`${tag}` as keyof AnyComponent);

  return (
    <DynamicTag
      {...rest}
      className={[
        'max-w-sm rounded-lg border border-gray-200 bg-transparent p-6 shadow dark:border-gray-700 dark:bg-gray-800',
        rest.className,
      ].join(' ')}>
      {children}
    </DynamicTag>
  );
}

export default Card;
