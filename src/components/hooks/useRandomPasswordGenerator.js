import useRandomNumber from './useRandomNumber';
import useRange from './useRange';

const { useState, useCallback } = require('react');

const useRandomPasswordGenerator = () => {
  const [password, setPassword] = useState(null);
  const getRange = useRange();
  const getRandomNumber = useRandomNumber();

  const generateRandomPassword = useCallback(
    opts => {
      const {
        withLowercase,
        withUppercase,
        withNumbers,
        withSymbols,
        passwordLen,
      } = opts ?? {
        withLowercase: false,
        withUppercase: false,
        withNumbers: false,
        withSymbols: false,
        passwordLen: 0,
      };

      const charCode_a_z = ['a'.charCodeAt(0), 'z'.charCodeAt(0)];
      const charCode_A_Z = ['A'.charCodeAt(0), 'Z'.charCodeAt(0)];
      const charCode_0_9 = ['0'.charCodeAt(0), '9'.charCodeAt(0)];
      const symbols = '!@#$%^&*()_+{}|:"<>?-=[]\\,./';

      const chars = [
        withLowercase ? charCode_a_z : null,
        withUppercase ? charCode_A_Z : null,
        withNumbers ? charCode_0_9 : null,
      ]
        .filter(el => el !== null)
        .map(([charCodeMin, charCodeMax]) =>
          getRange(charCodeMax - charCodeMin + 1).map((_el, idx) =>
            String.fromCharCode(idx + charCodeMin)
          )
        )
        .concat(withSymbols ? symbols.split('') : [])
        .flat();

      setPassword(
        getRange(passwordLen ?? 0)
          .map(() => chars[getRandomNumber({ min: 0, max: chars.length - 1 })])
          .join('')
      );
    },
    [getRange, getRandomNumber]
  );

  return [password, generateRandomPassword];
};

export default useRandomPasswordGenerator;
