import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@idui/react-toggle-controls';
import { isAnyCheckedDeep } from 'components/CheckboxTree/helpers';
import { Container, LeafCheckbox, AnyCheckedIcon, ToggleIcon } from './styled';

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

  const isChecked = useMemo(
    () =>
      childNodes ? isAnyCheckedDeep(childNodes, checkedKeys) : checkedKeys[id],
    [checkedKeys, childNodes, id]
  );

  return (
    <Container className={className}>
      {hasChildren && (
        <ToggleIcon onClick={toggle}>{isOpen ? '▾' : '▸'}</ToggleIcon>
      )}
      <LeafCheckbox
        name={id}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        icon={checkedKeys[id] ? allCheckedIcon : anyCheckedIcon}
        colors={colors}
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
};

export default Leaf;
