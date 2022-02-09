import React from 'react';
import { render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import CheckboxTree from '../components/CheckboxTree';
import { nodes } from '../sampleData';

const checkIfClosed = (el) => expect(el.parentElement.style.height).toBe('0px');
const checkIfOpen = (el) => expect(el.parentElement.style.height).toBe('auto');

describe('CheckboxTree', () => {
  it('accessible', async () => {
    const { container } = render(<CheckboxTree nodes={nodes} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('opens and closes children', async () => {
    const { getByText } = render(<CheckboxTree nodes={nodes} />);
    user.click(getByText('Drink').parentElement.previousElementSibling);
    user.click(getByText('Tea').parentElement.previousElementSibling);
    user.click(getByText('Black').parentElement.previousElementSibling);
    await waitFor(() =>
      checkIfOpen(getByText('Hot Chocolate').parentElement.parentElement)
    );
    user.click(getByText('Drink').parentElement.previousElementSibling);
    await waitFor(() =>
      checkIfClosed(getByText('Hot Chocolate').parentElement.parentElement)
    );
  });

  it('check node without children', () => {
    const handleChange = jest.fn();
    const { getByText } = render(
      <CheckboxTree onChange={handleChange} nodes={nodes} />
    );
    user.click(getByText('Drink').parentElement.previousElementSibling);
    user.click(getByText('Tea').parentElement.previousElementSibling);
    user.click(getByText('Black').parentElement.previousElementSibling);
    user.click(getByText('With Sugar'));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(['WithSugar']);
  });

  it('check node with children', () => {
    const handleChange = jest.fn();
    const { getByText } = render(
      <CheckboxTree onChange={handleChange} nodes={nodes} />
    );
    user.click(getByText('Cake'));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith([
      'Chocolate',
      'Vanilla',
      'Strawberry',
      'Cake',
    ]);
  });

  it('check node with children if one of children is disabled', () => {
    const handleChange = jest.fn();
    const { getByText } = render(
      <CheckboxTree onChange={handleChange} nodes={nodes} />
    );
    user.click(getByText('Drink'));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith([
      'Cappuccino',
      'Latte',
      'Americano',
      'HotChocolate',
      'Green',
      'Herbal',
      'WithSugar',
      'WithoutSugar',
      'HotMilk',
      'Coffee',
      'Black',
      'Tea',
    ]);
  });
});
