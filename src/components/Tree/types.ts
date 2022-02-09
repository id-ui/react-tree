import { LeafRenderer } from '../TreeNode/types';

export type TreeProps<NodeObjectType, LeafType> = LeafType & {
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
  nodes?: NodeObjectType[];
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
  /**
   * Function, that accepts all node props and collapse props ({ open, close, toggle, isOpen }) and returns node content. Content should apply collapse functions from props to open/close content
   * @default ({ toggle, label }) => <div onClick={toggle}>{label}</div>
   */
  renderLeaf: LeafRenderer<NodeObjectType, LeafType>;
  /**
   * TreeNode child nodes
   * @default []
   */
  childNodes?: NodeObjectType[];
  /**
   * is node open
   */
  isOpen?: boolean;
};
