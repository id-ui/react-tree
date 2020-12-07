import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@kaprisa57/react-toggle-controls';
import { isAnyCheckedDeep } from 'components/CheckboxTree/helpers';
import { Container, Label, AnyCheckedIcon } from './styled';

function Leaf({
  label,
  name,
  values,
  onChange,
  toggle,
  disabled,
  className,
  childNodes,
  colors,
  allCheckedIcon,
  anyCheckedIcon,
  checkboxSize,
}) {
  const handleChange = useCallback(
    (checked) => {
      onChange(!childNodes || values[name] ? checked : true, name);
    },
    [onChange, name, childNodes, values]
  );

  const isChecked = useMemo(
    () => (childNodes ? isAnyCheckedDeep(childNodes, values) : values[name]),
    [values, childNodes, name]
  );

  return (
    <Container className={className}>
      <Checkbox
        name={name}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        icon={values[name] ? allCheckedIcon : anyCheckedIcon}
        colors={colors}
        size={checkboxSize}
      />
      <Label onClick={toggle}>{label}</Label>
    </Container>
  );
}

Leaf.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  values: PropTypes.object,
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
