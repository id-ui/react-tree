import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@idui/react-toggle-controls';
import { isAnyCheckedDeep } from 'components/CheckboxTree/helpers';
import { Container, LeafCheckbox, AnyCheckedIcon, ToggleIcon } from './styled';
import { checkboxColors } from './theme';

function Leaf({
  label,
  id,
  checkedKeys,
  onChange,
  toggle,
  disabled,
  className,
  childNodes,
  colors,
  allCheckedIcon,
  anyCheckedIcon,
  checkboxSize,
  hasChildren,
  isOpen,
}) {
  const handleChange = useCallback(
    (checked) => {
      onChange(!childNodes || checkedKeys[id] ? checked : true, id);
    },
    [onChange, id, childNodes, checkedKeys]
  );

  const isAnyChecked = useMemo(
    () => childNodes && isAnyCheckedDeep(childNodes, checkedKeys),
    [checkedKeys, childNodes]
  );

  const actualColors = useMemo(
    () => ({
      on: colors.on,
      off: isAnyChecked ? colors.anyChecked : colors.off,
      disabled: colors.disabled,
    }),
    [colors, isAnyChecked]
  );

  return (
    <Container className={className}>
      {hasChildren && (
        <ToggleIcon onClick={toggle}>{isOpen ? '▾' : '▸'}</ToggleIcon>
      )}
      <LeafCheckbox
        name={id}
        checked={checkedKeys[id]}
        onChange={handleChange}
        disabled={disabled}
        icon={checkedKeys[id] ? allCheckedIcon : anyCheckedIcon}
        colors={actualColors}
        size={checkboxSize}
        label={label}
      />
    </Container>
  );
}

Leaf.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  checkedKeys: PropTypes.object,
  onChange: PropTypes.func,
  toggle: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  childNodes: PropTypes.arrayOf(PropTypes.object),
  colors: Checkbox.propTypes.colors,
  allCheckedIcon: PropTypes.any,
  anyCheckedIcon: PropTypes.any,
  checkboxSize: PropTypes.string,
};

Leaf.defaultProps = {
  anyCheckedIcon: <AnyCheckedIcon />,
  colors: checkboxColors,
};

export default Leaf;
