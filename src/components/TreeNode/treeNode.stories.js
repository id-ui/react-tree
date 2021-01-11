import React from 'react';
import { nodes } from 'sampleData';
import TreeNode from './TreeNode';

export default {
  title: 'TreeNode',
  component: TreeNode,
  argTypes: {
    childNodes: {
      disable: true,
      description: 'TreeNode child nodes',
      table: {
        defaultValue: {
          summary: '[]',
        },
      },
    },
    idKey: {
      control: 'text',
      description: 'property for React key',
      defaultValue: 'id',
      table: {
        defaultValue: {
          summary: 'id',
        },
      },
    },
    renderLeaf: {
      disable: true,
      description:
        'Function, that accepts all node props and collapse props ({ open, close, toggle, isOpen }) and returns node content. Content should apply collapse functions from props to open/close content',
      table: {
        defaultValue: {
          summary: '({ toggle, label }) => <div onClick={toggle}>{label}</div>',
        },
      },
    },
    childrenOffset: {
      control: 'text',
      description: 'distance between node childNodes and root',
      defaultValue: '20px',
      table: {
        defaultValue: {
          summary: '20px',
        },
      },
    },
    isOpen: {
      control: 'boolean',
      description: 'is node open',
    },
    className: {
      control: 'text',
      description: 'TreeNode className',
    },
  },
};

export const playground = (props) => {
  return <TreeNode {...nodes[1]} {...props} />;
};
