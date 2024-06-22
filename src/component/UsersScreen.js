import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './UsersScreen.css';
import axios from "axios";
import Find from '../asets/find.png';
import User from '../asets/user.png';
import AddUsers from '../asets/addUser.png'

function UsersScreen() {
  const localstorageData = localStorage.getItem("user");
  const user = localstorageData ? JSON.parse(localstorageData) : null;
  const mobile = user ? user.mobile : null;
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [usersChat, setUsersChat] = useState();

  const UserTable = () => {
    navigate('/UserTable');
  };
  const ChatScreen = (mobile) => {
    navigate(`/ChatScreen/${mobile}`);
  };
  const AddUser = () => {
    navigate('/AddUser');
  };
  const SearchScreen = () => {
    navigate('/Search/Users');
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/user/getUserChatCount/${mobile}/true`);
      setUsersChat(response.data.usersWithFalseStatusCount)
      setUsers(response.data.sortedUsers);
    } catch (err) {
      throw err;
    }
  };

  const updateUserStatus = async (userId) => {
    try {
      await axios.put(`http://localhost:4000/chat/update/user-status/${mobile}/${userId}`);
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
    <div className="chat-screen">
      <div>
        <div className="eirdt-block">
          <span className="chat">Chats</span>
          {usersChat ? (
            <span className="zero">{usersChat}</span>
          ) : null}
          <div className="icons">
            <img onClick={SearchScreen} src={Find} alt="search logo" />
            <img onClick={UserTable} src={User} alt="user logo" />
          </div>
        </div>
      </div>
      <p className="pinned">Pinned</p>
      {users.map((user, index) => (
        <div key={index} className="chat-item">
          <div>
            <img src={User} alt="user logo" />
          </div>
          <div onClick={() => handleChatClick(user.mobile)} className="chat-content" >
            <h3>{user.name}</h3>
            <p>{user.mobile}</p>
          </div>
          <div className="time-info">
            {user.statusFalseCount ? (
              <p className="p">{user.statusFalseCount}</p>
            ) : null}
            <p>{user.time}</p>
          </div>
        </div>
      ))}
      <img className="add-user-logo" onClick={AddUser} src={AddUsers} alt="logo" />
    </div>
  );
}

export default UsersScreen;
