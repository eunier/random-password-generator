import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import useRandomPasswordGenerator from './hooks/useRandomPasswordGenerator';

const PasswordGenerator = () => {
  const [withLowercase, setWithLowercase] = useState(false);
  const [withUppercase, setWithUppercase] = useState(false);
  const [randomPassword, generateRandomPassword] = useRandomPasswordGenerator();

  useEffect(() => generateRandomPassword(), [generateRandomPassword]);

  const onGenerateRandomPasswordHandler = e => {
    e.preventDefault();
  };

  const checkboxCtrl = [
    [uuid(), withLowercase, setWithLowercase, 'Lowercase Letters'],
    [uuid(), withUppercase, setWithUppercase, 'Uppercase Letters'],
  ].map(([key, state, setState, checkboxDesc]) => ({
    key,
    state,
    setState,
    checkboxDesc,
  }));

  return (
    <div className="container">
      <form onSubmit={onGenerateRandomPasswordHandler}>
        {checkboxCtrl.map(({ key, state, setState, checkboxDesc }) => (
          <div className="row" key={key}>
            <div className="col d-flex justify-content-center">
              <div className="form-group">
                <input
                  className="form-check-input"
                  id={`lowercase-letters-${key}`}
                  type="checkbox"
                  checked={state}
                  onChange={e => setState(e.target.checked)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`lowercase-letters-${key}`}
                >
                  {checkboxDesc}
                </label>
              </div>
            </div>
          </div>
        ))}

        <div className="row">
          <div className="col d-flex justify-content-center">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={true}
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
