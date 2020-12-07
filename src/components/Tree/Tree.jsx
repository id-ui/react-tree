import React, { Fragment, useEffect, useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import TreeNode from 'components/TreeNode';
import { highlightNodes } from './helpers';

function Tree({
  nodes,
  search,
  filterHighlighted,
  highlightClassName,
  idKey,
  searchBy,
  ...props
}) {
  const [highlightedNodes, setHighlightedNodes] = useState(nodes);

  useEffect(() => {
    if (!search) {
      setHighlightedNodes(nodes);
    } else {
      setHighlightedNodes(
        highlightNodes({
          nodes,
          regex: new RegExp(search, 'ig'),
          filterHighlighted,
          highlightClassName,
          searchBy,
        })
      );
    }
  }, [search, filterHighlighted, nodes, highlightClassName, searchBy]);

  return (
    <Fragment>
      {highlightedNodes.map((item, index) => (
        <TreeNode {...item} key={item[idKey] || index} {...props} />
      ))}
    </Fragment>
  );
}

Tree.propTypes = {
  ..._.omit(TreeNode.propTypes, ['childNodes', 'isOpen']),
  nodes: PropTypes.arrayOf(PropTypes.object),
  highlightClassName: PropTypes.string,
  search: PropTypes.string,
  filterHighlighted: PropTypes.bool,
  searchBy: PropTypes.string,
};

Tree.defaultProps = {
  ...TreeNode.defaultProps,
  nodes: [],
  highlightClassName: 'highlight',
  filterHighlighted: false,
  searchBy: 'label',
};

export default Tree;
