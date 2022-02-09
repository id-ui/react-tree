import { Key } from 'react';
import { TreeProps } from '../Tree/types';
import { LeafRenderer } from '../TreeNode/types';
import { CheckboxTreeLeafProps } from './components/Leaf/types';

export type CheckboxTreeProps<NodeObjectType> = Omit<
  TreeProps<NodeObjectType, CheckboxTreeLeafProps<NodeObjectType>>,
  'onChange'
> & {
  /**
   * selection change handler
   */
  onChange?: (values: Key[]) => void;
  /**
   * array of checked node ids
   * @default []
   */
  checkedKeys?: Key[];
  /**
   * Function, that returns node content.
   */
  renderLeaf?: LeafRenderer<
    NodeObjectType,
    CheckboxTreeLeafProps<NodeObjectType>
  >;
};
