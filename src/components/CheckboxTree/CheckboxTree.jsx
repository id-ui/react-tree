import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import _ from 'lodash';
import Tree from 'components/Tree';
import Leaf from './components/Leaf';
import { findNodeDeep, normalizeTree, setValuesRecursive } from './helpers';

function CheckboxTree({ nodes, values, onChange, ...props }) {
  const handleChange = useCallback(
    (value, elementName) => {
      onChange(
        produce(values, (draft) => {
          const node = findNodeDeep(nodes, elementName);
          setValuesRecursive(node, draft, value);
          normalizeTree(nodes, draft);
        })
      );
    },
    [onChange, nodes, values]
  );

  return (
    <Tree {...props} onChange={handleChange} nodes={nodes} values={values} />
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
  values: {},
};

export default CheckboxTree;
