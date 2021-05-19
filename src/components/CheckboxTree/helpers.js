const hasChildren = (node) =>
  Boolean(node.childNodes && node.childNodes.length);

export const setValuesRecursive = (node, checkedKeys, value) => {
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

export const normalizeTree = (nodes, checkedKeys) =>
  nodes.forEach((node) => {
    if (hasChildren(node)) {
      normalizeTree(node.childNodes, checkedKeys);
      checkedKeys[node.id] = isAllCheckedDeep(node.childNodes, checkedKeys);
    }
  });

export const findNodeDeep = (nodes, id) => {
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

export const isAllCheckedDeep = (nodes, checkedKeys) =>
  nodes.every((node) =>
    hasChildren(node)
      ? isAllCheckedDeep(node.childNodes, checkedKeys)
      : checkedKeys[node.id]
  );

export const isAnyCheckedDeep = (nodes, checkedKeys) =>
  nodes.some((node) =>
    hasChildren(node)
      ? isAnyCheckedDeep(node.childNodes, checkedKeys)
      : checkedKeys[node.id]
  );
