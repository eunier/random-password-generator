import { useCallback } from 'react';

const useRandomNumber = () =>
  useCallback(({ min, max }) => Math.floor(Math.random() * max) + min, []);

export default useRandomNumber;
