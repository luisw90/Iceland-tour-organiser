import React, { FC } from "react";

type AddDeveloperFormProps = {
  error: string;
  handleSubmit: (event: any) => void;
};

export const Form: FC<AddDeveloperFormProps> = ({ error, handleSubmit }) => {
  return (
    <header className="header">
      <div className="form__container">
        <p className="page-title">Iceland Tour Organiser!</p>
        <form id="addDeveloperForm" className="form" onSubmit={handleSubmit}>
          <br></br>
          <label className="form__label">New Tourist signing up:</label>
          <input
            className="addDeveloperFirstNameInput"
            type="text"
            placeholder="first name"
            name="fname"
          />
          <input
            className="addDeveloperLastNameInput"
            type="text"
            placeholder="last name"
            name="lname"
          />
          <label className="form__label">Select Tour:</label>

          <select className="form__select-bootcamp" name="tour" required>
            <option value="jsfs">Golden Circle Full-Day Tour</option>
            <option value="jfs">Ice Cave Tour and Glacier Hike</option>
            <option value="dnfs">South of Iceland Full-Day Trip</option>
          </select>

          <div className="form__button-box">
            <input
              id="addDeveloperBtn"
              className="form__button addDeveloperBtn"
              type="submit"
              value="Add"
            />
            {error && (
              <div className="errorMessage-box">
                <p className="errorMessage">{error}</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </header>
  );
};
