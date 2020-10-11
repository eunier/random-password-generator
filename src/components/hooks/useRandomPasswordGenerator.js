import useRandomNumber from './useRandomNumber';
import useRange from './useRange';

const { useState, useCallback } = require('react');

const useRandomPasswordGenerator = () => {
  const [password, setPassword] = useState(null);
  const getRange = useRange();
  const getRandomNumber = useRandomNumber();

  const generateRandomPassword = useCallback(
    opts => {
      const { withLowercase, withUppercase } = opts ?? {
        withLowercase: false,
        withUppercase: false,
      };
      
      const passwordLen = 30;
      const charCode_a_z = ['a'.charCodeAt(0), 'z'.charCodeAt(0)];
      const charCode_A_Z = ['A'.charCodeAt(0), 'Z'.charCodeAt(0)];

      const chars = [
        withLowercase ? charCode_a_z : null,
        withUppercase ? charCode_A_Z : null,
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
