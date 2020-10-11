import React, { useEffect, useState } from 'react';

import useRandomPasswordGenerator from './hooks/useRandomPasswordGenerator';

const PasswordGenerator = () => {
  const [withLowercase, setWithLowercase] = useState(false);
  const [randomPassword, generateRandomPassword] = useRandomPasswordGenerator();

  // const useCallback

  useEffect(() => generateRandomPassword(), [generateRandomPassword]);

  const onGenerateRandomPasswordHandler = e => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <form onSubmit={onGenerateRandomPasswordHandler}>
        <div className="row">
          <div className="col d-flex justify-content-center">
            <div className="form-group">
              <input
                className="form-check-input"
                id="lowercase-letters"
                type="checkbox"
                checked={withLowercase}
                onChange={e => setWithLowercase(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="lowercase-letters">
                Lowercase Letters
              </label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col d-flex justify-content-center">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={() => generateRandomPassword()}
            >
              Generate Random Password
            </button>
          </div>
        </div>
      </form>

      <div className="row">
        <div className="col d-flex justify-content-center">
          <div>Password: {randomPassword}</div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
