import React from 'react';
import { render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import CheckboxTree from 'components/CheckboxTree';
import { nodes } from 'sampleData';

describe('CheckboxTree', () => {
  it('accessible', async () => {
    const { container } = render(<CheckboxTree nodes={nodes} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('opens and closes children', async () => {
    const { getByText, queryByText } = render(<CheckboxTree nodes={nodes} />);
    user.click(getByText('Drink'));
    user.click(getByText('Tea'));
    user.click(getByText('Black'));
    expect(getByText('With Sugar')).toBeInTheDocument();
    user.click(getByText('Drink'));
    await waitFor(() =>
      expect(queryByText('With Sugar')).not.toBeInTheDocument()
    );
  });

  it('check node without children', () => {
    const handleChange = jest.fn();
    const { getByText } = render(
      <CheckboxTree onChange={handleChange} nodes={nodes} />
    );
    user.click(getByText('Drink'));
    user.click(getByText('Tea'));
    user.click(getByText('Black'));
    user.click(getByText('With Sugar').previousElementSibling);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith({
      Black: false,
      Cake: false,
      Coffee: false,
      Drink: false,
      MilkCocktail: false,
      Tea: false,
      WithSugar: true,
    });
  });

  it('check node with children', () => {
    const handleChange = jest.fn();
    const { getByText } = render(
      <CheckboxTree onChange={handleChange} nodes={nodes} />
    );
    user.click(getByText('Cake').previousElementSibling);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith({
      Cake: true,
      Black: false,
      Chocolate: true,
      Coffee: false,
      Drink: false,
      MilkCocktail: false,
      Strawberry: true,
      Tea: false,
      Vanilla: true,
    });
  });

  it('check node with children if one of children is disabled', () => {
    const handleChange = jest.fn();
    const { getByText } = render(
      <CheckboxTree onChange={handleChange} nodes={nodes} />
    );
    user.click(getByText('Drink').previousElementSibling);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith({
      Black: true,
      Cake: false,
      Coffee: true,
      Drink: false,
      MilkCocktail: false,
      Tea: true,
      WithSugar: true,
      Green: true,
      Herbal: true,
      HotChocolate: true,
      HotMilk: true,
      Latte: true,
      WithoutSugar: true,
      Americano: true,
      Cappuccino: true,
    });
  });
});
