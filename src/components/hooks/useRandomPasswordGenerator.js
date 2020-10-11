const { useState, useCallback } = require('react');

const useRandomPasswordGenerator = () => {
  const [password, setPassword] = useState(null);

  const generateRandomPassword = useCallback(
    () => setPassword(Math.floor(Math.random() * 9) + 1),
    []
  );

  return [password, generateRandomPassword];
};

export default useRandomPasswordGenerator;
 