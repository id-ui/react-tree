import React from 'react';
import { render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import Tree from 'components/Tree';
import {nodes, SampleTreeNodeObject} from 'sampleData';
import {LeafRenderer} from "../components/TreeNode/types";

const checkIfClosed = (el) => expect(el.parentElement.style.height).toBe('0px');
const checkIfOpen = (el) => expect(el.parentElement.style.height).toBe('auto');

const renderLeaf: LeafRenderer<
    SampleTreeNodeObject,
    Record<string, unknown>
    > = ({ toggle, label }) => <div onClick={toggle}>{label}</div>;

const renderTree = (props?: object) => <Tree renderLeaf={renderLeaf} nodes={nodes} {...props}/>

describe('Tree', () => {
  it('accessible', async () => {
    const { container } = render(renderTree());
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('opens and closes children', async () => {
    const { getByText } = render(renderTree());
    user.click(getByText('Drink'));
    user.click(getByText('Tea'));
    user.click(getByText('Black'));
    await waitFor(() => checkIfOpen(getByText('Hot Chocolate')));
    user.click(getByText('Drink'));
    await waitFor(() => checkIfClosed(getByText('Hot Chocolate')));
  });

  it('opens/closes on search', async () => {
    const { getByText, rerender, queryByText } = render(
        renderTree({search:'Black'})
    );
    await waitFor(() => checkIfOpen(getByText('Green')));
    rerender(renderTree({search:'Cappuccino'}));
    await waitFor(() =>
      expect(queryByText('Chocolate')).not.toBeInTheDocument()
    );
  });

  it('filters highlighted on search', async () => {
    const { queryByText } = render(
    renderTree({search:'Black', filterHighlighted:true})
    );
    expect(queryByText('Green')).not.toBeInTheDocument();
  });
});
