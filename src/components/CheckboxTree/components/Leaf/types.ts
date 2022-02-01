import { CollapseToggleProps } from '@idui/react-collapse/dist/components/Collapse/types';
import { Key, ReactElement, ReactNode } from 'react';

export type CheckedKeysObject = { [key: Key]: boolean };

export enum CheckboxTreeLeafThemedElements {
  background = 'background',
  border = 'border',
  icon = 'icon',
}

export type CheckboxTreeLeafColorsSet = {
  [key in CheckboxTreeLeafThemedElements]?: string;
} & {
  hover?: {
    [key in CheckboxTreeLeafThemedElements]?: string;
  };
};

export enum CheckboxTreeLeafToggleState {
  on = 'on',
  off = 'off',
  disabled = 'disabled',
  anyChecked = 'anyChecked',
}

export type CheckboxTreeLeafColors = {
  [key in CheckboxTreeLeafToggleState]?: CheckboxTreeLeafColorsSet;
};

export interface CheckboxTreeLeafRendererProps extends CollapseToggleProps {
  checked: boolean;
  onChange: (checked: boolean, key: Key) => void;
  hasChildren: boolean;
  hasCheckedChildren: boolean;
  name: Key;
  disabled: boolean;
  label: string;
}

export interface CheckboxTreeLeafProps<NodeObjectType>
  extends Exclude<CheckboxTreeLeafRendererProps, 'name'> {
  id: Key;
  className?: string;
  /**
   * checkbox checked icon if node has no childNodes or all node childNodes checked
   * @default idui/react-toggle-controls checkbox check icon
   */
  allCheckedIcon?: ReactNode;
  /**
   * checkbox checked icon if any of node childNodes checked
   * @default rounded square with currentColor
   */
  anyCheckedIcon?: ReactNode;
  /**
   * array of checked node ids
   * @default []
   */
  checkedKeysObject?: CheckedKeysObject;
  /**
   * checkbox colors theme for different states
   */
  colors?: CheckboxTreeLeafColors;
  childNodes: NodeObjectType[];
  /**
   * checkbox size
   * @default 20px
   */
  checkboxSize?: string;
  render: (props: CheckboxTreeLeafRendererProps) => ReactElement;
}
