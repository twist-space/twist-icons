import { FunctionalComponent, PropType, SVGAttributes, CSSProperties } from 'vue';
export interface AbstractNode {
    tag: string;
    attrs: Record<string, string>;
    children?: AbstractNode[];
}
export interface IconProps extends SVGAttributes {
    size?: number;
    color?: string;
    style?: CSSProperties;
    class?: string;
    title?: string;
    spin?: boolean;
    rotate?: number;
}
export type IconType = (props: IconProps) => FunctionalComponent<IconProps>;
export declare function IconBase(props: IconProps, { slots, attrs }: {
    slots: any;
    attrs: any;
}): JSX.Element;
export declare namespace IconBase {
    var props: {
        size: PropType<number>;
        color: PropType<string>;
        style: PropType<CSSProperties>;
        class: PropType<string>;
        title: PropType<string>;
        spin: PropType<boolean>;
        rotate: PropType<number>;
        onClick: PropType<(e: MouseEvent) => void>;
    };
    var inheritAttrs: boolean;
}
export declare function renderHelper(node: AbstractNode[]): any;
export declare function GenIcon(node: AbstractNode): (props: any) => JSX.Element;
