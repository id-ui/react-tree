import * as React from 'react';

export interface TreeNodeProps {
    /**
     * TreeNode child nodes
     * @default []
     */
    childNodes?: object[];
    /**
     * Function, that accepts all node props and collapse props ({ open, close, toggle, isOpen }) and returns node content. Content should apply collapse functions from props to open/close content
     * @default ({ toggle, label }) => <div onClick={toggle}>{label}</div>
     */
    renderLeaf?: (props: object) => React.ReactNode;
    /**
     * distance between node childNodes and root
     * @default 20px
     */
    childrenOffset?: string;
    /**
     * property for React key
     * @default id
     */
    idKey?: string;
    /**
     * TreeNode className
     */
    className?: string;
    /**
     * is node open
     */
    isOpen?: boolean;
}

export class TreeNode extends React.Component<TreeNodeProps> {}

interface CommonTreeProps {
    /**
     * distance between node childNodes and root
     * @default 20px
     */
    childrenOffset?: string;
    /**
     * property for React key
     */
    idKey?: string;
    /**
     * TreeNode className
     */
    className?: string;
    /**
     * Tree nodes. Props of each node will be passed to it's renderLeaf. If node has childNodes it should have property "childNodes".
     * @default []
     */
    nodes?: object[];
    /**
     * class name for highlighting search matches
     * @default highlight
     */
    highlightClassName?: string;
    /**
     * string for searching matches in nodes by labelKey
     */
    search?: string;
    /**
     * whether filter search results or not
     * @default false
     */
    filterHighlighted?: boolean;
    /**
     * node property for search
     * @default label
     */
    searchBy?: string;
}


export interface TreeProps extends CommonTreeProps {
    /**
     * Function, that accepts all node props and collapse props ({ open, close, toggle, isOpen }) and returns node content. Content should apply collapse functions from props to open/close content
     * @default ({ toggle, label }) => <div onClick={toggle}>{label}</div>
     */
    renderLeaf?: (props: object) => React.ReactNode;
}

export default class Tree extends React.Component<TreeProps> {}

export interface CheckboxTreeRenderLeafArgs {
    checked: boolean;
    onChange: ((checked: boolean) => void);
    hasChildren: boolean;
    hasCheckedChildren: boolean;
    name: string;
    disabled: boolean;
    label: string;
    isOpen: boolean;
    toggle: () => void;
}

interface CheckboxColorsSet {
    background?: string;
    border?: string;
    icon?: string;
    hover?: {
        background?: string;
        border?: string;
        icon?: string;
    };
}


export interface CheckboxTreeProps extends CommonTreeProps {
    /**
     * selection change handler
     */
    onChange?: (values: string[] | number[]) => void;
    /**
     * array of checked node ids
     * @default []
     */
    checkedKeys?: string[] | number[]
    /**
     * Function, that returns node content.
     */
    renderLeaf?:  (CheckboxTreeRenderLeafArgs) => React.ReactNode;
    /**
     * checkbox checked icon if node has no childNodes or all node childNodes checked
     * @default idui/react-toggle-controls checkbox check icon
     */
    allCheckedIcon?: React.ReactNode;
    /**
     * checkbox checked icon if any of node childNodes checked
     * @default rounded square with currentColor
     */
    anyCheckedIcon?: React.ReactNode;
    /**
     * checkbox colors theme for different states
     */
    colors?: {
        on?: CheckboxColorsSet,
        off?: CheckboxColorsSet,
        disabled?: CheckboxColorsSet,
        anyChecked?: CheckboxColorsSet,
    };
    /**
     * checkbox size
     * @default 20px
     */
    checkboxSize?: string;
}

export class CheckboxTree extends React.Component<CheckboxTreeProps> {}