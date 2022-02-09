import { CollapseToggleProps } from '@idui/react-collapse/dist/components/Collapse/types';
import { ReactElement } from 'react';

export type LeafRenderer<NodeObjectType, LeafType> = (
  props: CollapseToggleProps &
    NodeObjectType &
    LeafType & {
      hasChildren?: boolean;
      /**
       * TreeNode child nodes
       * @default []
       */
      childNodes?: NodeObjectType[];
    }
) => ReactElement;

export type TreeNodeProps<NodeObjectType, LeafType> = LeafType &
  NodeObjectType & {
    /**
     * TreeNode child nodes
     * @default []
     */
    childNodes?: NodeObjectType[];
    /**
     * Function, that accepts all node props and collapse props ({ open, close, toggle, isOpen }) and returns node content. Content should apply collapse functions from props to open/close content
     * @default ({ toggle, label }) => <div onClick={toggle}>{label}</div>
     */
    renderLeaf: LeafRenderer<NodeObjectType, LeafType>;
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
  };
