export const setValuesRecursive = (node, values, value) => {
  if (node.disabled) {
    return;
  }

  if (node.childNodes) {
    node.childNodes.forEach((child) =>
      setValuesRecursive(child, values, value)
    );
  } else {
    values[node.name] = value;
  }
};

export const normalizeTree = (nodes, values) =>
  nodes.forEach((node) => {
    if (node.childNodes) {
      normalizeTree(node.childNodes, values);
      values[node.name] = isAllCheckedDeep(node.childNodes, values);
    }
  });

export const findNodeDeep = (nodes, name) => {
  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    if (node.name === name) {
      return node;
    } else if (node.childNodes) {
      const result = findNodeDeep(node.childNodes, name);
      if (result) {
        return result;
      }
    }
  }
};

export const isAllCheckedDeep = (nodes, values) =>
  nodes.every((node) =>
    node.childNodes
      ? isAllCheckedDeep(node.childNodes, values)
      : values[node.name]
  );

export const isAnyCheckedDeep = (nodes, values) =>
  nodes.some((node) =>
    node.childNodes
      ? isAnyCheckedDeep(node.childNodes, values)
      : values[node.name]
  );
