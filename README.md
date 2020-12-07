# Tree React Component

[![NPM](https://img.shields.io/npm/v/@kaprisa57/react-tree/.svg)](https://www.npmjs.com/package/@kaprisa57/react-tree/) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Coverage Status](https://coveralls.io/repos/github/kseniya57/react-tree/badge.svg?branch=main)](https://coveralls.io/github/kseniya57/react-tree?branch=main)

- [Docs](https://kseniya57.github.io/react-tree/?path=/docs/tree--playground)
- [Playground](https://kseniya57.github.io/react-tree/?path=/story/tree--playground)

## Install

```bash
npm install --save @kaprisa57/react-tree
```

```bash
yarn add @kaprisa57/react-tree
```

### See props in [Docs](https://kseniya57.github.io/react-tree/?path=/docs/tree--playground)


### Basic Example

```jsx
import React from 'react'
import Tree from '@kaprisa57/react-tree'

const nodes = [
    { label: 'Cake' },
    { label: 'Coffee', children: [
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

- [Live Example](https://kseniya57.github.io/react-tree/?path=/story/tree--custom-tree)

```jsx
import React from 'react'
import styled from 'styled-components'
import Tree from '@kaprisa57/react-tree'

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

- [Props](https://kseniya57.github.io/react-tree/?path=/docs/checkbox-tree--playground)
- [Live Example](https://kseniya57.github.io/react-tree/?path=/story/checkbox-tree--playground)

```jsx
import React, { useState } from 'react'
import { CheckboxTree } from '@kaprisa57/react-tree'

const nodes = [
    { label: 'Cake', name: 'cake' },
    { label: 'Coffee', name: 'coffee', children: [
        { label: 'Cappuccino', name: 'Cappuccino' },
        { label: 'Latte', name: 'Latte' },
        { label: 'Americano', name: 'Americano' },
    ]},
]

function Example() {
  const [values, setValues] = useState({});
    return (
      <CheckboxTree
        {...props}
        values={values}
        nodes={nodes}
        onChange={setValues}
      />
    );
}
```

### Search in Tree

```jsx
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import Tree from '@kaprisa57/react-tree'

const nodes = [
    { label: 'Cake' },
    { label: 'Coffee', children: [
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

### See more details in [storybook](https://kseniya57.github.io/react-tree/?path=/docs/tree--playground)

## License

MIT © [kaprisa57@gmail.com](https://github.com/kaprisa57@gmail.com)