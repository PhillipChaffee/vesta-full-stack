export function getMapKeys<T>(map: Map<T, any>): T[] {
  const iter = map.keys();
  const returnValue: T[] = [];

  let nextValue = iter.next().value;
  while (nextValue !== undefined) {
    returnValue.push(nextValue);
    nextValue = iter.next().value;
  }

  return returnValue;
}

export function getUpdatedStateArray<T>(
  prevValue: T,
  newValue: T,
  prevState: T[],
  valueKey: keyof T
) {
  let existingValueUpdated = false;
  let newState = prevState.map((value) => {
    if (value[valueKey] === prevValue[valueKey]) {
      existingValueUpdated = true;
      return newValue;
    }
    return value;
  }) as T[];

  return existingValueUpdated ? newState : [...prevState, newValue];
}

export function camelToSnake(str: string) {
  return str.replace(/([A-Z])/g, (group) => "_" + group.toLowerCase());
}

type serializedType = { [key: string]: any };

export function recursiveJsonStringify<T>(t: T) {
  const oldKeys = Object.keys(t);
  const newKeys = oldKeys.map((key) => camelToSnake(key));

  let returnValue: serializedType = {};
  for (let i = 0; i < oldKeys.length; i++) {
    const value = t[oldKeys[i] as keyof T];
    if (typeof value === "object" && !(value as unknown as []).length) {
      returnValue[newKeys[i]] = recursiveJsonStringify(value);
    } else {
      returnValue[newKeys[i]] = value;
    }
  }

  return returnValue;
}
