import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import _ from 'lodash';
import Tree from 'components/Tree';
import Leaf from './components/Leaf';
import { findNodeDeep, normalizeTree, setValuesRecursive } from './helpers';

function CheckboxTree({ nodes, checkedKeys, onChange, ...props }) {
  const treeValues = useMemo(
    () => _.fromPairs(checkedKeys.map((item) => [item, true])),
    [checkedKeys]
  );

  const handleChange = useCallback(
    (value, nodeId) => {
      const newValues = produce(treeValues, (draft) => {
        const node = findNodeDeep(nodes, nodeId);
        setValuesRecursive(node, draft, value);
        normalizeTree(nodes, draft);
      });
      onChange(_.keys(newValues).filter((key) => newValues[key]));
    },
    [onChange, nodes, treeValues]
  );

  return (
    <Tree
      {...props}
      onChange={handleChange}
      nodes={nodes}
      checkedKeys={treeValues}
    />
  );
}

CheckboxTree.propTypes = {
  ...Tree.propTypes,
  onChange: PropTypes.func,
};

CheckboxTree.defaultProps = {
  ...Tree.defaultProps,
  renderLeaf: (props) => <Leaf {...props} />,
  onChange: _.noop,
  checkedKeys: [],
};

export default CheckboxTree;
