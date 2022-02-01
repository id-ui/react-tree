import { Checkbox } from '@idui/react-toggle-controls';

const { colors } = Checkbox.defaultProps;

export const checkboxColors = {
  ...colors,
  anyChecked: {
    ...colors.off,
    icon: colors.on.background,
  },
};
