import {
  CheckboxThemedElements,
  ToggleState,
} from '@idui/react-toggle-controls';

const defaultColors = {
  [ToggleState.on]: {
    [CheckboxThemedElements.background]: '#580B9E',
    [CheckboxThemedElements.border]: '#580B9E',
    [CheckboxThemedElements.icon]: '#FFFFFF',
  },
  [ToggleState.off]: {
    [CheckboxThemedElements.background]: 'transparent',
    [CheckboxThemedElements.border]: '#CCCCCC',
    [CheckboxThemedElements.icon]: 'transparent',
    hover: {
      [CheckboxThemedElements.border]: '#580B9E',
    },
  },
  [ToggleState.disabled]: {
    [CheckboxThemedElements.background]: '#F5F5F5',
    [CheckboxThemedElements.border]: '#D9D9D9',
    [CheckboxThemedElements.icon]: '#D9D9D9',
  },
};

export const checkboxColors = {
  ...defaultColors,
  anyChecked: {
    ...defaultColors.off,
    icon: defaultColors.on.background,
  },
};
