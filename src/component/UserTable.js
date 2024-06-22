import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './UserTable.css';
import User from '../asets/user.png';
import Wrong from '../asets/wrong.png';
import axios from "axios";

function UserTable() {
  const navigate = useNavigate();
  const localstorageData = localStorage.getItem("user");
  const user = localstorageData ? JSON.parse(localstorageData) : null;
  const mobile = user ? user.mobile : null;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/user/getOneUser/${mobile}`);
      setUserData(response.data.result);
    } catch (err) {
      throw err
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [mobile]);
  const UserScreen = () => {
    navigate('/UserScreen');
  };

  return (
    <div className="user-table-container">
      <img src={Wrong} onClick={UserScreen} alt="wrong icon" className="wrong-icon" />
      <img src={User} alt="user icon" className="user-icon" />
      {loading ? (
        <p>Loading...</p>
      ) : (
        userData && (
          <>
            <h2>{userData.name}</h2>
            <p className="mobile-number">+91 {userData.mobile}</p>
          </>
        )
      )}
    </div>
  );
}

export default UserTable;
