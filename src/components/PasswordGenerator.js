import React, { useEffect } from 'react';

import useRandomPasswordGenerator from './hooks/useRandomPasswordGenerator';

const PasswordGenerator = () => {
  const [randomPassword, generateRandomPassword] = useRandomPasswordGenerator();

  useEffect(() => generateRandomPassword(), []);

  return (
    <div className="container">
      <div className="input-group mb3">
        <input className="form-control" type="text" />
        <div className="input-group-append">
          <button className="btn btn-primary" type="button">
            Generate Random Password
          </button>
        </div>
      </div>

      <div>Password: {randomPassword}</div>
    </div>
  );
};

export default PasswordGenerator;
