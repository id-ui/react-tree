import React, { ReactElement, useCallback, useMemo } from 'react';
import { get } from 'lodash-es';
import { isAnyCheckedDeep } from '../../helpers';
import { Container, LeafCheckbox, AnyCheckedIcon, ToggleIcon } from './styled';
import { checkboxColors } from './theme';
import { CheckboxTreeLeafProps } from './types';

function Leaf<NodeObjectType>({
  label,
  id,
  checkedKeysObject,
  onChange,
  toggle,
  disabled,
  className,
  childNodes,
  colors = checkboxColors,
  allCheckedIcon,
  anyCheckedIcon = <AnyCheckedIcon />,
  checkboxSize,
  hasChildren,
  isOpen,
  render,
}: CheckboxTreeLeafProps<NodeObjectType>): ReactElement {
  const handleChange = useCallback(
    (checked) => {
      onChange(
        !childNodes || !childNodes.length || get(checkedKeysObject, 'id')
          ? checked
          : true,
        id
      );
    },
    [onChange, id, childNodes, checkedKeysObject]
  );

  const isAnyChecked = useMemo(
    () => childNodes && isAnyCheckedDeep(childNodes, checkedKeysObject),
    [checkedKeysObject, childNodes]
  );

  const actualColors = useMemo(
    () => ({
      on: colors.on,
      off: isAnyChecked ? colors.anyChecked : colors.off,
      disabled: colors.disabled,
    }),
    [colors, isAnyChecked]
  );

  const isChecked = get(checkedKeysObject, id);

  if (render) {
    return render({
      hasChildren,
      toggle,
      isOpen,
      name: id,
      checked: isChecked,
      onChange: handleChange,
      disabled,
      label,
      hasCheckedChildren: isAnyChecked,
    });
  }

  return (
    <Container className={className}>
      {hasChildren && (
        <ToggleIcon onClick={toggle}>{isOpen ? '▾' : '▸'}</ToggleIcon>
      )}
      <LeafCheckbox
        name={id.toString()}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        icon={isChecked ? allCheckedIcon : anyCheckedIcon}
        colors={actualColors}
        size={checkboxSize}
        label={label}
      />
    </Container>
  );
}

export default Leaf;
