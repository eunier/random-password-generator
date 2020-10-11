import useRandomNumber from './useRandomNumber';
import useRange from './useRange';

const { useState, useCallback } = require('react');

const useRandomPasswordGenerator = () => {
  const [password, setPassword] = useState(null);
  const getRange = useRange();
  const getRandomNumber = useRandomNumber();

  const generateRandomPassword = useCallback(
    opts => {
      const passwordLen = 30;
      const charCode_a = 'a'.charCodeAt(0);
      const charCode_z = 'z'.charCodeAt(0);
      const charCode_A = 'A'.charCodeAt(0);
      const charCode_Z = 'Z'.charCodeAt(0);

      const chars = [
        opts?.withLowercase ? [charCode_a, charCode_z] : null,
        opts?.withUppercase ? [charCode_A, charCode_Z] : null,
      ]
        .filter(el => el !== null)
        .map(([charCodeMin, charCodeMax]) =>
          getRange(charCodeMax - charCodeMin + 1).map((_el, idx) =>
            String.fromCharCode(idx + charCodeMin)
          )
        )
        .flat();

      setPassword(
        getRange(passwordLen).map(
          () => chars[getRandomNumber({ min: 0, max: chars.length - 1 })]
        )
      );
    },
    [getRange, getRandomNumber]
  );

  return [password, generateRandomPassword];
};

export default useRandomPasswordGenerator;
