import styled from 'styled-components';
import Collapse from '@kaprisa57/react-collapse';
import { prop } from 'styled-tools';

export const Header = styled(Collapse.Header)`
  cursor: pointer;
`;

export const Body = styled(Collapse.Body)`
  padding-left: ${prop('offset')};
`;
