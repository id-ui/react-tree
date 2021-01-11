import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { nodes } from 'sampleData';
import { ifProp } from 'styled-tools';
import Tree from './Tree';

export default {
  title: 'Tree',
  component: Tree,
  argTypes: {
    nodes: {
      disable: true,
      description:
        'Tree nodes. Props of each node will be passed to it\'s renderLeaf. If node has childNodes it should have property "childNodes".',
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
    search: {
      control: 'text',
      description: 'string for searching matches in nodes by labelKey',
    },
    searchBy: {
      control: 'text',
      description: 'node property for search',
      defaultValue: 'label',
      table: {
        defaultValue: {
          summary: 'label',
        },
      },
    },
    filterHighlighted: {
      control: 'boolean',
      description: 'whether filter search results or not',
      defaultValue: false,
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    highlightClassName: {
      control: 'text',
      description: 'class name for highlighting search matches',
      defaultValue: 'highlight',
      table: {
        defaultValue: {
          summary: 'highlight',
        },
      },
    },
    className: {
      control: 'text',
      description: 'TreeNode className',
    },
  },
};

export const playground = (props) => {
  return <Tree {...props} nodes={nodes} />;
};

const CustomTree = styled(Tree)`
  border-left: 1px solid #aeaeae;
  margin-left: 3.5px;
`;

const CustomLeaf = styled.div`
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 2px;
  ${ifProp(
    'hasChildren',
    css`
      transition: color 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        color: rgba(0, 0, 0, 1);
      }
    `
  )};
`;

const renderCustomLeaf = ({ toggle, isOpen, icon, label, hasChildren }) => (
  <CustomLeaf hasChildren={hasChildren} onClick={toggle}>
    {hasChildren && (isOpen ? '▾' : '▸') + ' '}
    {icon} {label}
  </CustomLeaf>
);

export const customTree = (props) => {
  return <CustomTree {...props} renderLeaf={renderCustomLeaf} nodes={nodes} />;
};

const SearchTreeLeaf = styled.div`
  .highlight {
    background-color: #ffa7a7;
  }
`;

export function SearchTree() {
  const [search, setSearch] = useState('');
  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  return (
    <div>
      <input type="search" onChange={handleSearch} />
      <Tree
        nodes={nodes}
        search={search}
        filterHighlighted
        renderLeaf={({ toggle, isOpen, label, hasChildren }) => (
          <SearchTreeLeaf onClick={toggle}>
            {hasChildren && (isOpen ? '▾' : '▸') + ' '}
            <span dangerouslySetInnerHTML={{ __html: label }} />
          </SearchTreeLeaf>
        )}
      />
    </div>
  );
}
