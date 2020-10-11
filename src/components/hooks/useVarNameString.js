import { useCallback } from 'react';

const useVarNameString = () => {
  const getVarNameString = useCallback(obj => Object.keys(obj)[0], []);

  return getVarNameString;
};

export default useVarNameString;
