interface ExoticComponentWithDisplayName<P = any>
  extends React.ExoticComponent<P> {
  defaultProps?: Partial<P>;
  displayName?: string;
}

export type AnyComponent<P = any> =
  | ExoticComponentWithDisplayName<P>
  | React.ComponentType<P>;

export type KnownTarget = keyof JSX.IntrinsicElements | AnyComponent;

export type WebTarget =
  | string // allow custom elements, etc.
  | KnownTarget;
