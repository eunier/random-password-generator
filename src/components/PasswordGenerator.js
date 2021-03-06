import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import useRandomPasswordGenerator from "../hooks/useRandomPasswordGenerator";
import useVarNameString from "../hooks/useVarNameString";
import useRange from "../hooks/useRange";

const PasswordGenerator = () => {
  const [withLowercase, setWithLowercase] = useState(false);
  const [withUppercase, setWithUppercase] = useState(false);
  const [withNumbers, setWithNumbers] = useState(false);
  const [withSymbols, setWithSymbols] = useState(false);
  const [passwordLen, setPasswordLen] = useState(6);
  const [checkboxCtrl, setCheckboxCtrl] = useState([]);
  const [anyCheckboxChecked, setAnyCheckboxChecked] = useState(false);
  const [passwordGeneratorOpts, setPasswordGeneratorOpts] = useState(null);
  const [randomPassword, generateRandomPassword] = useRandomPasswordGenerator();
  const getVarNameString = useVarNameString();
  const getRange = useRange();

  useEffect(() => {
    setCheckboxCtrl(
      [
        [
          getVarNameString({ withLowercase }),
          withLowercase,
          setWithLowercase,
          "Lowercase Letters"
        ],
        [
          getVarNameString({ withUppercase }),
          withUppercase,
          setWithUppercase,
          "Uppercase Letters"
        ],
        [
          getVarNameString({ withNumbers }),
          withNumbers,
          setWithNumbers,
          "Numbers"
        ],
        [
          getVarNameString({ withSymbols }),
          withSymbols,
          setWithSymbols,
          "Symbols"
        ]
      ].map(([key, state, setState, desc]) => ({
        key,
        state,
        setState,
        desc
      }))
    );
  }, [
    withLowercase,
    withUppercase,
    withNumbers,
    withSymbols,
    getVarNameString
  ]);

  useEffect(() => {
    const checkboxesValues = checkboxCtrl.map(({ state }) => state);
    const containsCheckedCheckbox = withOption => withOption === true;

    setAnyCheckboxChecked(!!checkboxesValues.find(containsCheckedCheckbox));

    const _passwordGeneratorOpts = { passwordLen };

    checkboxCtrl.forEach(
      ({ key, state }) => (_passwordGeneratorOpts[key] = state)
    );

    setPasswordGeneratorOpts(_passwordGeneratorOpts);
  }, [
    withLowercase,
    withUppercase,
    withNumbers,
    withSymbols,
    passwordLen,
    checkboxCtrl
  ]);

  const onGenerateRandomPasswordHandler = e => {
    e.preventDefault();
    generateRandomPassword(passwordGeneratorOpts);
  };

  return (
    <div className="container-sm">
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
            <div className="form-group">
              <label htmlFor="password-length-select">Password Length</label>
              <select
                className="form-control"
                id="password-length-select"
                value={passwordLen}
                onChange={e => setPasswordLen(e.target.value)}
              >
                {getRange(128 - 6 + 1).map((_el, idx) => {
                  const optionVal = idx + 6;

                  return (
                    <option key={uuid()} value={optionVal}>
                      {optionVal}
                    </option>
                  );
                })}
                {[256, 512, 1024, 2048].map(el => (
                  <option key={uuid()} value={el}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

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
          <p className="text-break text-monospace">{randomPassword}</p>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
