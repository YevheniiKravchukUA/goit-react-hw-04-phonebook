import { useEffect, useState } from 'react';

export function useLocaleStorage(initialState) {
  const [state, setState] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? initialState
  );

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(state));
  }, [state]);

  return [state, setState];
}
