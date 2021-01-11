import React from 'react';
import { render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import Tree from 'components/Tree';
import { nodes } from 'sampleData';

const checkIfClosed = (el) => expect(el.parentElement.style.height).toBe('0px');
const checkIfOpen = (el) => expect(el.parentElement.style.height).toBe('auto');

describe('Tree', () => {
  it('accessible', async () => {
    const { container } = render(<Tree nodes={nodes} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('opens and closes children', async () => {
    const { getByText } = render(<Tree nodes={nodes} />);
    user.click(getByText('Drink'));
    user.click(getByText('Tea'));
    user.click(getByText('Black'));
    await waitFor(() => checkIfOpen(getByText('Hot Chocolate')));
    user.click(getByText('Drink'));
    await waitFor(() => checkIfClosed(getByText('Hot Chocolate')));
  });

  it('opens/closes on search', async () => {
    const { getByText, rerender, queryByText } = render(
      <Tree nodes={nodes} search="Black" />
    );
    await waitFor(() => checkIfOpen(getByText('Green')));
    rerender(<Tree nodes={nodes} search="Cappuccino" />);
    await waitFor(() =>
      expect(queryByText('Chocolate')).not.toBeInTheDocument()
    );
  });

  it('filters highlighted on search', async () => {
    const { queryByText } = render(
      <Tree filterHighlighted nodes={nodes} search="Black" />
    );
    expect(queryByText('Green')).not.toBeInTheDocument();
  });
});
