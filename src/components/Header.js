import React, { useState } from "react";
import "../styles/Header.css";
import { FaSearch } from "react-icons/fa";

function Header({ search }) {
  const [valueInput, setValueInput] = useState("");

  const inputChange = (inputValue) => {
    setValueInput(inputValue.target.value);
  };

  const submitting = (event) => {
    event.preventDefault();
    search(valueInput);
  };

  return (
    <div>
      <form className="formDiv" onSubmit={submitting}>
        <div className="search-div">
          <input
            value={valueInput}
            type="text"
            placeholder="Enter the Movie Name"
            onChange={inputChange}
          />
          <button type="submit" className="search-btn">
            <FaSearch />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Header;
