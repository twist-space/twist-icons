import { FunctionalComponent, CSSProperties } from 'vue'

export interface IconBaseProps {
  size?: number;
  color?: string;
  style?: CSSProperties;
  class?: string;
}

export interface IconProps extends IconBaseProps {
  title?: string;
  spin?: boolean;
  rotate?: number;
}

export interface IconContext extends IconBaseProps {}

export type IconType = (props: IconProps) => FunctionalComponent<IconProps>;
