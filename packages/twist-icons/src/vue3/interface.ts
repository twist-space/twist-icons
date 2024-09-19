import { FunctionalComponent } from 'vue'

export interface IconBaseProps {
  size?: number;
  color?: string
}

export interface IconProps extends IconBaseProps {
  title?: string;
  spin?: boolean;
  rotate?: number;
}

export interface IconContext extends IconBaseProps {}

export type IconType = (props: IconProps) => FunctionalComponent<IconProps>;
