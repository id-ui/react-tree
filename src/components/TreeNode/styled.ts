import styled from 'styled-components';
import Collapse from '@idui/react-collapse';
import { prop } from 'styled-tools';

export const Header = styled(Collapse.Header)`
  cursor: pointer;
`;

interface TreeNodeBodyProps {
  offset: string;
}

export const Body = styled(Collapse.Body)<TreeNodeBodyProps>`
  padding-left: ${prop('offset')};
`;
