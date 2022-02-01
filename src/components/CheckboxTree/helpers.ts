import { Key } from 'react';
import { CheckedKeysObject } from './components/Leaf/types';

const hasChildren = <NodeObjectType extends { childNodes?: NodeObjectType[] }>(
  node: NodeObjectType
) => Boolean(node.childNodes && node.childNodes.length);

export const setValuesRecursive = <
  NodeObjectType extends {
    childNodes?: NodeObjectType[];
    disabled?: boolean;
    id: string;
  }
>(
  node: NodeObjectType,
  checkedKeys: CheckedKeysObject,
  value: boolean
) => {
  if (node.disabled) {
    return;
  }

  if (hasChildren(node)) {
    node.childNodes.forEach((child) =>
      setValuesRecursive(child, checkedKeys, value)
    );
  } else {
    checkedKeys[node.id] = value;
  }
};

export const normalizeTree = <
  NodeObjectType extends {
    childNodes?: NodeObjectType[];
    disabled?: boolean;
    id: string;
  }
>(
  nodes: NodeObjectType[],
  checkedKeys: CheckedKeysObject
): void =>
  nodes.forEach((node) => {
    if (hasChildren(node)) {
      normalizeTree(node.childNodes, checkedKeys);
      checkedKeys[node.id] = isAllCheckedDeep(node.childNodes, checkedKeys);
    }
  });

export const findNodeDeep = <
  NodeObjectType extends {
    childNodes?: NodeObjectType[];
    disabled?: boolean;
    id: string;
  }
>(
  nodes: NodeObjectType[],
  id: Key
): NodeObjectType => {
  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    if (node.id === id) {
      return node;
    } else if (hasChildren(node)) {
      const result = findNodeDeep(node.childNodes, id);
      if (result) {
        return result;
      }
    }
  }
};

export const isAllCheckedDeep = <
  NodeObjectType extends {
    childNodes?: NodeObjectType[];
    disabled?: boolean;
    id: string;
  }
>(
  nodes: NodeObjectType[],
  checkedKeys: CheckedKeysObject
): boolean =>
  nodes.every((node) =>
    hasChildren(node)
      ? isAllCheckedDeep(node.childNodes, checkedKeys)
      : checkedKeys[node.id]
  );

export const isAnyCheckedDeep = <
  NodeObjectType extends {
    childNodes?: NodeObjectType[];
    disabled?: boolean;
    id: string;
  }
>(
  nodes: NodeObjectType[],
  checkedKeys: CheckedKeysObject
): boolean =>
  nodes.some((node) =>
    hasChildren(node)
      ? isAnyCheckedDeep(node.childNodes, checkedKeys)
      : checkedKeys[node.id]
  );
