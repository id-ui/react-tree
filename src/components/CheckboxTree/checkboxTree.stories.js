import React, { useState } from 'react';
import { nodes } from 'sampleData';
import TreeStory from 'components/Tree/tree.stories';
import CheckboxTree from './CheckboxTree';
import { checkboxColors } from './components/Leaf/theme';

export default {
  title: 'CheckboxTree',
  component: CheckboxTree,
  argTypes: {
    checkedKeys: {
      disable: true,
      description: 'array of checked node ids',
      table: {
        defaultValue: { summary: '[]' },
      },
    },
    ...TreeStory.argTypes,
    renderLeaf: {
      disable: true,
      description:
        'Function, that accepts { checked, onChange, hasChildren, hasCheckedChildren, name, disabled, label, isOpen: is node open, toggle: toggle open state } and returns node content.',
    },
    colors: {
      control: 'object',
      description:
        'checkbox colors for on/off/anyChecked/disabled states. (See @idui/react-toggle-controls)',
      defaultValue: checkboxColors,
      table: {
        defaultValue: { summary: JSON.stringify(checkboxColors) },
      },
    },
    allCheckedIcon: {
      disable: true,
      description:
        'checkbox checked icon if node has no childNodes or all node childNodes checked',
      table: {
        defaultValue: '@idui/react-toggle-controls checkbox check icon',
      },
    },
    anyCheckedIcon: {
      disable: true,
      description: 'checkbox checked icon if any of node childNodes checked',
      table: {
        defaultValue: { summary: 'rounded square with currentColor' },
      },
    },
    checkboxSize: {
      control: 'text',
      description: 'checkbox size',
      defaultValue: '20px',
      table: { defaultValue: { summary: '20px' } },
    },
  },
};

export function Playground(props) {
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
