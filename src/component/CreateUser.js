import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './CreateUser.css';
import axios from "axios";

function CreateUser() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');

  const validateInputs = () => {
    if (!name || !mobile) {
      setError('Please enter both name and mobile number');
      return false;
    } else if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return false;
    }
    return true;
  }

  const addUsers = async () => {
    if (!validateInputs()) {
      return;
    }
    try {
      await axios.post(`https://chat-app-3xsn.onrender.com/user/addUsers`, {
        name,
        mobile,
        show: false
      });
      alert('User added successfully');
      navigate(`/AddUser`);
    } catch (err) {
      alert('Failed to add user');
      throw err;
    }
  }

  return (
    <div className="form-container">
      <div className="form-group">
        <label className="form-label">UserName*</label>
        <input
          className="form-input"
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Enter name"
        />
      </div>
      <div className="form-group">
        <label className="form-label">User Mobile*</label>
        <input
          className="form-input"
          type="number"
          onChange={(e) => setMobile(e.target.value)}
          value={mobile}
          placeholder="Enter mobile number"
        />
      </div>
      <div className="form-group">
        <button className="form-button" onClick={addUsers} type="button">Submit</button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default CreateUser;
