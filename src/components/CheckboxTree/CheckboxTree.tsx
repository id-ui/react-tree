import React, { Key, useCallback, useMemo } from 'react';
import { noop } from '../../helpers';
import Tree from '../Tree';
import Leaf from './components/Leaf';
import { findNodeDeep, normalizeTree, setValuesRecursive } from './helpers';
import { CheckboxTreeProps } from './types';
import { CheckboxTreeLeafProps } from './components/Leaf/types';

function CheckboxTree<
  NodeObjectType extends {
    childNodes?: NodeObjectType[];
    disabled?: boolean;
    id: string;
  }
>({
  nodes = [],
  checkedKeys = [],
  onChange = noop,
  renderLeaf: providedRenderLeaf,
  ...props
}: CheckboxTreeProps<NodeObjectType>) {
  const treeValues = useMemo(
    () => Object.fromEntries(checkedKeys.map((item) => [item, true])),
    [checkedKeys]
  );

  const handleChange = useCallback(
    (value: boolean, nodeId: Key): void => {
      const newValues = Object.assign({}, treeValues);
      const node = findNodeDeep(nodes, nodeId);
      setValuesRecursive(node, newValues, value);
      normalizeTree(nodes, newValues);

      onChange(Object.keys(newValues).filter((key) => newValues[key]));
    },
    [onChange, nodes, treeValues]
  );

  const renderLeaf = (props: CheckboxTreeLeafProps<NodeObjectType>) => (
    <Leaf {...props} render={providedRenderLeaf} />
  );

  return (
    <Tree<NodeObjectType, CheckboxTreeLeafProps<NodeObjectType>>
      {...props}
      onChange={handleChange}
      nodes={nodes}
      checkedKeysObject={treeValues}
      renderLeaf={renderLeaf}
    />
  );
}

export default CheckboxTree;
