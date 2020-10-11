import React, { useEffect } from 'react';

import useRandomPasswordGenerator from './hooks/useRandomPasswordGenerator';

const PasswordGenerator = () => {
  const [randomPassword, generateRandomPassword] = useRandomPasswordGenerator();

  useEffect(() => generateRandomPassword(), [generateRandomPassword]);

  const onGenerateRandomPasswordHandler = e => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col d-flex justify-content-center">
          <form onSubmit={onGenerateRandomPasswordHandler}>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={() => generateRandomPassword()}
            >
              Generate Random Password
            </button>
          </form>
        </div>
      </div>

      <div className="row">
        <div className="col d-flex justify-content-center">
          <div>Password: {randomPassword}</div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
