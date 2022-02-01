import React, { Key, ReactElement, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Collapse from '@idui/react-collapse';
import { get } from 'lodash-es';
import { Body, Header } from './styled';
import { TreeNodeProps } from './types';

function TreeNode<NodeObjectType, LeafType>({
  childNodes,
  renderLeaf,
  childrenOffset = '20px',
  idKey = 'id',
  className,
  isOpen: providedIsOpen,
  ...props
}: TreeNodeProps<NodeObjectType, LeafType>): ReactElement {
  const [isOpen, setOpen] = useState(providedIsOpen);

  useEffect(() => {
    setOpen(providedIsOpen);
  }, [providedIsOpen]);

  const leafProps = (props as unknown) as NodeObjectType & LeafType;

  if (!childNodes || !childNodes.length) {
    return renderLeaf(leafProps);
  }

  return (
    <Collapse isOpen={isOpen} onChangeOpen={setOpen}>
      <Header>
        {(collapseHeaderProps) =>
          renderLeaf({
            ...collapseHeaderProps,
            ...leafProps,
            hasChildren: true,
            childNodes,
          })
        }
      </Header>
      <Body offset={childrenOffset} className={className}>
        {childNodes.map((child, index) => (
          <TreeNode
            className={className}
            key={get(child, idKey) || index}
            renderLeaf={renderLeaf}
            childrenOffset={childrenOffset}
            {...leafProps}
            {...child}
          />
        ))}
      </Body>
    </Collapse>
  );
}

export default TreeNode;
