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
