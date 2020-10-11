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
          getVarNameString({ withLowercase }),
          withLowercase,
          setWithLowercase,
          'Lowercase Letters',
        ],
        [
          getVarNameString({ withUppercase }),
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
  }, [withLowercase, withUppercase, getVarNameString]);

  useEffect(() => {
    generateRandomPassword();
  }, [generateRandomPassword]);

  useEffect(() => {
    const checkboxesValues = checkboxCtrl.map(({ state }) => state);
    const containsCheckedCheckbox = withOption => withOption === true;

    setAnyCheckboxChecked(!!checkboxesValues.find(containsCheckedCheckbox));

    const _passwordGeneratorOpts = {};

    checkboxCtrl.forEach(
      ({ key, state }) => (_passwordGeneratorOpts[key] = state)
    );

    setPasswordGeneratorOpts(_passwordGeneratorOpts);
  }, [withLowercase, withUppercase, checkboxCtrl]);

  const onGenerateRandomPasswordHandler = e => {
    e.preventDefault();
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
          <p>{randomPassword}</p>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
