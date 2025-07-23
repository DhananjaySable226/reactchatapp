import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './UsersScreen.css';
import axios from "axios";
import User from '../asets/user.png';
import AddUsers from '../asets/addUser.png'

function UsersScreen() {
  const localstorageData = localStorage.getItem("user");
  const user = localstorageData ? JSON.parse(localstorageData) : null;
  const mobile = user ? user.mobile : null;
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [usersChat, setUsersChat] = useState();

  // const UserTable = () => {
  //   navigate('/UserTable');
  // };
  const ChatScreen = (mobile) => {
    navigate(`/ChatScreen/${mobile}`);
  };
  const AddUser = () => {
    navigate('/AddUser');
  };
  // const SearchScreen = () => {
  //   navigate('/Search/Users');
  // };

  const getUsers = async () => {
    try {
      const response = await axios.get(`https://chat-app-3xsn.onrender.com/user/getUserChatCount/${mobile}/true`);
      setUsersChat(response.data.usersWithFalseStatusCount)
      setUsers(response.data.sortedUsers);
    } catch (err) {
      throw err;
    }
  };

  const updateUserStatus = async (userId) => {
    try {
      await axios.put(`https://chat-app-3xsn.onrender.com/chat/update/user-status/${mobile}/${userId}`);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    getUsers();
  }, [mobile]);

  const handleChatClick = (mobile) => {
    ChatScreen(mobile);
    updateUserStatus(mobile);
  };

  return (
    <div className="users-main-container">
      <p className="pinned">pinned</p>
      {users.length === 0 ? (
        <div className="no-users modern-card">
          <img src={User} alt="no user" className="no-user-icon" />
          <p className="no-user-text">No users added yet</p>
        </div>
      ) : (
        users.map((user, index) => (
          <div key={index} className="chat-item modern-card">
            <div>
              <img src={User} alt="user logo" />
            </div>
            <div onClick={() => handleChatClick(user.mobile)} className="chat-content" >
              <h3>{user.name ? user.name : user.mobile}</h3>
            </div>
            <div className="time-info">
              {user.statusFalseCount ? (
                <p className="p">{user.statusFalseCount}</p>
              ) : null}
            </div>
          </div>
        ))
      )}
      <button className="add-user-fab" onClick={AddUser} title="Add User">
        <img src={AddUsers} alt="add user" />
      </button>
    </div>
  );
}

export default UsersScreen;
