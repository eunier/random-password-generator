const { useState } = require('react');

const useRandomPasswordGenerator = () => {
  const [password, setPassword] = useState(null);

  const generateRandomPassword = () => {
    return setPassword(Math.floor(Math.random() * 9) + 1);
  };

  return [password, generateRandomPassword];
};

export default useRandomPasswordGenerator;
