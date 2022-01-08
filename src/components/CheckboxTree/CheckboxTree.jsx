import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import Tree from 'components/Tree';
import Leaf from './components/Leaf';
import { findNodeDeep, normalizeTree, setValuesRecursive } from './helpers';

function CheckboxTree({
  nodes,
  checkedKeys,
  onChange,
  renderLeaf: providedRenderLeaf,
  ...props
}) {
  const treeValues = useMemo(
    () => Object.fromEntries(checkedKeys.map((item) => [item, true])),
    [checkedKeys]
  );

  const handleChange = useCallback(
    (value, nodeId) => {
      const newValues = produce(treeValues, (draft) => {
        const node = findNodeDeep(nodes, nodeId);
        setValuesRecursive(node, draft, value);
        normalizeTree(nodes, draft);
      });
      onChange(Object.keys(newValues).filter((key) => newValues[key]));
    },
    [onChange, nodes, treeValues]
  );

  const renderLeaf = (props) => <Leaf {...props} render={providedRenderLeaf} />;

  return (
    <Tree
      {...props}
      onChange={handleChange}
      nodes={nodes}
      checkedKeys={treeValues}
      renderLeaf={renderLeaf}
    />
  );
}

const colorsSetShape = PropTypes.shape({
  background: PropTypes.string,
  border: PropTypes.string,
  icon: PropTypes.string,
  hover: PropTypes.shape({
    background: PropTypes.string,
    border: PropTypes.string,
    icon: PropTypes.string,
  }),
});

CheckboxTree.propTypes = {
  ...Tree.propTypes,
  onChange: PropTypes.func,
  checkedKeys: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  colors: PropTypes.shape({
    on: colorsSetShape,
    off: colorsSetShape,
    disabled: colorsSetShape,
    anyChecked: colorsSetShape,
  }),
  allCheckedIcon: PropTypes.any,
  anyCheckedIcon: PropTypes.any,
  checkboxSize: PropTypes.string,
};

CheckboxTree.defaultProps = {
  ...Tree.defaultProps,
  onChange: () => {},
  checkedKeys: [],
  renderLeaf: undefined,
};

export default CheckboxTree;
