import { useCallback } from 'react';

const useVarNameString = () => useCallback(obj => Object.keys(obj)[0], []);

export default useVarNameString;
