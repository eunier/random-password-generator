import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import useRandomPasswordGenerator from './hooks/useRandomPasswordGenerator';
import useVarNameString from './hooks/useVarNameString';

const PasswordGenerator = () => {
  const [withLowercase, setWithLowercase] = useState(false);
  const [withUppercase, setWithUppercase] = useState(false);
  const [checkboxCtrl, setCheckboxCtrl] = useState([]);
  const [anyCheckboxChecked, setAnyCheckboxChecked] = useState(false);
  const [passwordGeneratorOpts, setPasswordGeneratorOpts] = useState(null);
  const [randomPassword, generateRandomPassword] = useRandomPasswordGenerator();
  const getVarNameString = useVarNameString();

  useEffect(() => {
    setCheckboxCtrl(
      [
        [
          Object.keys({ withLowercase })[0],
          withLowercase,
          setWithLowercase,
          'Lowercase Letters',
        ],
        [
          Object.keys({ withUppercase })[0],
          withUppercase,
          setWithUppercase,
          'Uppercase Letters',
        ],
      ].map(([key, state, setState, desc]) => ({
        key,
        state,
        setState,
        desc,
      }))
    );
  }, [withLowercase, withUppercase]);

  useEffect(() => {
    generateRandomPassword();
  }, [generateRandomPassword]);

  useEffect(() => {
    const checkboxesValues = checkboxCtrl.map(({ state }) => state);
    const containsCheckedCheckbox = withOption => withOption === true;

    setAnyCheckboxChecked(!!checkboxesValues.find(containsCheckedCheckbox));
    setPasswordGeneratorOpts(
      checkboxCtrl.map(({ key, state }) => ({
        [key]: state,
      }))
    );
  }, [withLowercase, withUppercase, checkboxCtrl]);

  const onGenerateRandomPasswordHandler = e => {
    e.preventDefault();
    console.log({ passwordGeneratorOpts });
    generateRandomPassword(passwordGeneratorOpts);
  };

  return (
    <div className="container">
      <form onSubmit={onGenerateRandomPasswordHandler}>
        {checkboxCtrl.map(({ key, state, setState, desc }) => {
          key = `${key}-${uuid()}`;

          return (
            <div className="row" key={key}>
              <div className="col d-flex justify-content-center">
                <div className="form-group">
                  <input
                    className="form-check-input"
                    id={`form-check-input-${key}`}
                    type="checkbox"
                    checked={state}
                    onChange={e => setState(e.target.checked)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`form-check-input-${key}`}
                  >
                    {desc}
                  </label>
                </div>
              </div>
            </div>
          );
        })}

        <div className="row">
          <div className="col d-flex justify-content-center">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={!anyCheckboxChecked}
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
