import React, { useState } from 'react';
import { withPropsTable } from 'storybook-addon-react-docgen';
import { Checkbox } from '@kaprisa57/react-toggle-controls';
import { nodes } from 'sampleData';
import TreeStory from 'components/Tree/tree.stories';
import CheckboxTree from './CheckboxTree';

export default {
  title: 'CheckboxTree',
  component: CheckboxTree,
  argTypes: {
    values: {
      disable: true,
      description: 'tree values with shape { name: checked }',
      table: {
        defaultValue: { summary: '{}' },
      },
    },
    ...TreeStory.argTypes,
    renderLeaf: {
      disable: true,
      description:
        'Function, that accepts all node props, tree values { name: checked } and collapse props ({ open, close, toggle, isOpen }) and returns node content. Content should apply collapse functions from props to open/close content',
      table: {
        defaultValue: { summary: '(props) => <CheckboxTreeLeaf {...props} />' },
      },
    },
    colors: {
      control: 'object',
      description: 'checkbox colors. (See @kaprisa57/react-toggle-controls)',
      defaultValue: Checkbox.defaultProps.colors,
      table: {
        defaultValue: { summary: JSON.stringify(Checkbox.defaultProps.colors) },
      },
    },
    allCheckedIcon: {
      disable: true,
      description:
        'checkbox checked icon if node has no childNodes or all node childNodes checked',
      table: {
        defaultValue: '@kaprisa57/react-toggle-controls checkbox check icon',
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
  decorators: [withPropsTable],
  parameters: {
    props: {
      propTablesInclude: [CheckboxTree],
    },
  },
};

export function Playground(props) {
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
