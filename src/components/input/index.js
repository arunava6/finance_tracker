
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import './styles.css';

function Input({ label, state, setState, placeholder, type }) {
  const [showPassword, setShowPassword] = useState(false);

  // Determine input type based on showPassword state for password fields
  const inputType = type === 'password' && showPassword ? 'text' : type;

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle input change with first-letter capitalization for Full Name
  const handleChange = (e) => {
    let value = e.target.value;
    if (label === 'Full Name' && value) {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    setState(value);
  };

  return (
    <div className="input-wrapper">
      <p className="label-input">{label}</p>
      <div className="input-container">
        <input
          type={inputType || 'text'} // Default to text if type is not provided
          value={state}
          placeholder={placeholder}
          onChange={handleChange}
          className={`custom-input ${label === 'Full Name' ? 'name-input' : ''}`}
        />
        {type === 'password' && (
          <span
            className="password-toggle-icon"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
      </div>
    </div>
  );
}

export default Input;