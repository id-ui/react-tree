import styled from 'styled-components';
import { Checkbox } from '@idui/react-toggle-controls';

export const Container = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  position: relative;
`;

export const LeafCheckbox = styled(Checkbox)`
  cursor: pointer;
`;

export const AnyCheckedIcon = styled.div`
  width: 10px;
  height: 10px;
  background-color: currentColor;
  border-radius: 2px;
`;

export const ToggleIcon = styled.span`
  position: absolute;
  left: -15px;
  display: inline-block;
  cursor: pointer;
  font-size: 16px;
  line-height: 20px;
  vertical-align: middle;
`;
