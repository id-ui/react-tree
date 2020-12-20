import React, { Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html {
      font-size: 10px;
    }
    
    body {
      font-size: 1.4rem;
      font-family: Roboto, sans-serif;
      color: #14113C;
    }
    
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      outline: none;
    }
`;

export const parameters = {
  layout: 'centered',
};

const Container = styled.div`
  width: 500px;
  height: 500px;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f2ff;
  display: flex;
  flex-direction: column;
`;

export const decorators = [
  (Story) => (
    <Fragment>
      <Container>
        <Story />
      </Container>
      <GlobalStyle />
    </Fragment>
  ),
];
