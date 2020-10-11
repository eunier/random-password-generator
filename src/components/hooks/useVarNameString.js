import { useCallback, useEffect, useState } from 'react';

const useVarNameString = () => {
  const [varNameString, setVarNameString] = useState('');

  const getVarNameString = useCallback(
    (obj, cb) => {
      setVarNameString(Object.keys(obj)[0]);
      cb(varNameString);
    },
    [varNameString]
  );

  return getVarNameString;
};

export default useVarNameString;
