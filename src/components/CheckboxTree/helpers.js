export const setValuesRecursive = (node, checkedKeys, value) => {
  if (node.disabled) {
    return;
  }

  if (node.childNodes) {
    node.childNodes.forEach((child) =>
      setValuesRecursive(child, checkedKeys, value)
    );
  } else {
    checkedKeys[node.id] = value;
  }
};

export const normalizeTree = (nodes, checkedKeys) =>
  nodes.forEach((node) => {
    if (node.childNodes) {
      normalizeTree(node.childNodes, checkedKeys);
      checkedKeys[node.id] = isAllCheckedDeep(node.childNodes, checkedKeys);
    }
  });

export const findNodeDeep = (nodes, id) => {
  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    if (node.id === id) {
      return node;
    } else if (node.childNodes) {
      const result = findNodeDeep(node.childNodes, id);
      if (result) {
        return result;
      }
    }
  }
};

export const isAllCheckedDeep = (nodes, checkedKeys) =>
  nodes.every((node) =>
    node.childNodes
      ? isAllCheckedDeep(node.childNodes, checkedKeys)
      : checkedKeys[node.id]
  );

export const isAnyCheckedDeep = (nodes, checkedKeys) =>
  nodes.some((node) =>
    node.childNodes
      ? isAnyCheckedDeep(node.childNodes, checkedKeys)
      : checkedKeys[node.id]
  );
