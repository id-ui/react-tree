import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { nodes, SampleTreeNodeObject } from '../../sampleData';
import { LeafRenderer } from '../TreeNode/types';
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
} as ComponentMeta<typeof Tree>;

export const Playground: ComponentStory<typeof Tree> = (props) => {
  return <Tree {...props} nodes={nodes} />;
};

const CustomTree = styled(Tree)`
  border-left: 1px solid #aeaeae;
  margin-left: 3.5px;
`;

interface CustomLeafProps {
  hasChildren: boolean;
}

const CustomLeaf = styled.div<CustomLeafProps>`
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

const renderCustomLeaf: LeafRenderer<
  SampleTreeNodeObject,
  Record<string, unknown>
> = ({ toggle, isOpen, icon, label, hasChildren }) => (
  <CustomLeaf hasChildren={hasChildren} onClick={toggle}>
    {hasChildren && (isOpen ? '▾' : '▸') + ' '}
    {icon} {label}
  </CustomLeaf>
);

export const customTree: ComponentStory<typeof Tree> = (props) => {
  return <CustomTree {...props} renderLeaf={renderCustomLeaf} nodes={nodes} />;
};

const SearchTreeLeaf = styled.div`
  .highlight {
    background-color: #ffa7a7;
  }
`;

export const SearchTree: ComponentStory<typeof Tree> = () => {
  const [search, setSearch] = useState('');
  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const renderLeaf: LeafRenderer<
    SampleTreeNodeObject,
    Record<string, unknown>
  > = ({ toggle, isOpen, label, hasChildren }) => (
    <SearchTreeLeaf onClick={toggle}>
      {hasChildren && (isOpen ? '▾' : '▸') + ' '}
      <span dangerouslySetInnerHTML={{ __html: label }} />
    </SearchTreeLeaf>
  );

  return (
    <div>
      <input type="search" onChange={handleSearch} />
      <Tree<SampleTreeNodeObject, Record<string, unknown>>
        nodes={nodes}
        search={search}
        filterHighlighted
        renderLeaf={renderLeaf}
      />
    </div>
  );
};
