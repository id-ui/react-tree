# Tree React Component

[![NPM](https://img.shields.io/npm/v/@idui/react-tree.svg)](https://www.npmjs.com/package/@idui/react-tree/)
[![Size](https://img.shields.io/bundlephobia/min/@idui/react-tree)](https://www.npmjs.com/package/@idui/react-tree)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Coverage Status](https://coveralls.io/repos/github/id-ui/react-tree/badge.svg?branch=main)](https://coveralls.io/github/id-ui/react-tree?branch=main)
[![LICENSE](https://img.shields.io/github/license/id-ui/react-tree)](https://github.com/id-ui/react-tree/blob/main/LICENSE)

- [Docs](https://id-ui.github.io/react-tree/?path=/docs/tree--playground)
- [Playground](https://id-ui.github.io/react-tree/?path=/story/tree--playground)

## Install

```bash
npm install --save @idui/react-tree
```

```bash
yarn add @idui/react-tree
```

### See props in [Docs](https://id-ui.github.io/react-tree/?path=/docs/tree--playground)


### Basic Example

```jsx
import React from 'react'
import Tree from '@idui/react-tree'

const nodes = [
    { label: 'Cake' },
    { label: 'Coffee', childNodes: [
        { label: 'Cappuccino' },
        { label: 'Latte' },
        { label: 'Americano' },
    ]},
]

function Example() {
  return <Tree nodes={nodes} />
}
```

### Custom Tree

- [Live Example](https://id-ui.github.io/react-tree/?path=/story/tree--custom-tree)

```jsx
import React from 'react'
import styled from 'styled-components'
import Tree from '@idui/react-tree'

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

const nodes = [
{
  label: 'Cake',
  icon: '🍰',
  childNodes: [
    {
      label: 'Chocolate',
      icon: '🍫',
    },
    {
      label: 'Vanilla',
      icon: '🍬',
    },
    {
      label: 'Strawberry',
      icon: '🍓',
    },
  ],
}]

function Example() {
  return <Tree nodes={nodes} renderLeaf={renderCustomLeaf} />
}
```

### Checkbox Tree

- [Props](https://id-ui.github.io/react-tree/?path=/docs/checkbox-tree--playground)
- [Live Example](https://id-ui.github.io/react-tree/?path=/story/checkbox-tree--playground)

```jsx
import React, { useState } from 'react'
import { CheckboxTree } from '@idui/react-tree'

const nodes = [
    { label: 'Cake', id: 'cake' },
    { label: 'Coffee', id: 'coffee', childNodes: [
        { label: 'Cappuccino', id: 'Cappuccino' },
        { label: 'Latte', id: 'Latte' },
        { label: 'Americano', id: 'Americano' },
    ]},
]

function Example() {
  const [checkedKeys, setCheckedKeys] = useState([]);
    return (
      <CheckboxTree
        {...props}
        checkedKeys={checkedKeys}
        nodes={nodes}
        onChange={setCheckedKeys}
      />
    );
}
```

### Search in Tree

```jsx
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import Tree from '@idui/react-tree'

const nodes = [
    { label: 'Cake' },
    { label: 'Coffee', childNodes: [
        { label: 'Cappuccino' },
        { label: 'Latte' },
        { label: 'Americano' },
    ]},
]

const SearchTreeLeaf = styled.div`
  .highlight {
    background-color: #ffa7a7;
  }
`;

function Example() {
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
```

### See more details in [storybook](https://id-ui.github.io/react-tree/?path=/docs/tree--playground)

## License

MIT © [kaprisa57@gmail.com](https://github.com/id-ui)