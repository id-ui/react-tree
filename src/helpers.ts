export const noop = () => {};

type PlainObject = Record<string, unknown>;

const isObject = (value: unknown): value is PlainObject =>
  typeof value === 'object';

export const get = <T>(object: unknown, path: string): T => {
  const properties = path.split('.');

  let result: unknown = object;
  let index = 0;

  while (index < properties.length) {
    if (isObject(result)) {
      result = result[properties[index]];
    } else {
      return undefined;
    }

    index++;
  }

  return result as T;
};

export const set = (object: unknown, path: string, value: unknown) => {
  const properties = path.split('.');

  let current: unknown = object;
  let index = 0;

  while (index < properties.length - 1) {
    const property = properties[index];

    if (!isObject(current)) {
      return;
    }

    if (!isObject(current[property])) {
      current[property] = {};
    }

    current = current[property];

    index++;
  }

  if (!isObject(current)) {
    return;
  }

  const property = properties[index];
  current[property] = value;
};
