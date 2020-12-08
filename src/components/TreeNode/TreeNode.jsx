import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Collapse from '@idui/react-collapse';
import { Body, Header } from './styled';

function TreeNode({
  childNodes,
  renderLeaf,
  childrenOffset,
  idKey,
  className,
  isOpen: providedIsOpen,
  ...props
}) {
  const [isOpen, setOpen] = useState(providedIsOpen);

  useEffect(() => {
    setOpen(providedIsOpen);
  }, [providedIsOpen]);

  if (!childNodes) {
    return renderLeaf(props);
  }

  return (
    <Collapse isOpen={isOpen} isOpenControlled onChangeOpen={setOpen}>
      <Header>
        {(collapseHeaderProps) =>
          renderLeaf({
            ...collapseHeaderProps,
            ...props,
            hasChildren: true,
            childNodes,
          })
        }
      </Header>
      <Body offset={childrenOffset} className={className}>
        {childNodes.map((child, index) => (
          <TreeNode
            className={className}
            key={child[idKey] || index}
            renderLeaf={renderLeaf}
            childrenOffset={childrenOffset}
            {...props}
            {...child}
          />
        ))}
      </Body>
    </Collapse>
  );
}

TreeNode.propTypes = {
  childNodes: PropTypes.arrayOf(PropTypes.object),
  renderLeaf: PropTypes.func,
  childrenOffset: PropTypes.string,
  idKey: PropTypes.string,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
};

TreeNode.defaultProps = {
  childrenOffset: '20px',
  renderLeaf: ({ toggle, label }) => <div onClick={toggle}>{label}</div>,
  idKey: 'id',
};

export default TreeNode;
