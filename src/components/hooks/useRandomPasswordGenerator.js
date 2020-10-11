const { useState, useCallback, useEffect } = require('react');

const useRandomPasswordGenerator = () => {
  const [password, setPassword] = useState(null);

  useEffect(() => {
    console.log({ password });
  });

  const generateRandomPassword = useCallback(opts => {
    console.log({ opts });
    setPassword(Math.floor(Math.random() * 9) + 1);
  }, []);

  return [password, generateRandomPassword];
};

export default useRandomPasswordGenerator;
