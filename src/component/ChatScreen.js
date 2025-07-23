import React, { useEffect, useState, useCallback } from "react";
import User from '../asets/user.png'
// import Edit from "../asets/edit.png" // Remove edit icon import
import './ChatScreen.css';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ChatScreen() {
    const localstorageData = localStorage.getItem("user");
    const user = localstorageData ? JSON.parse(localstorageData) : null;
    const own = user ? user.mobile : null;
    const { mobile } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [showMenu, setShowMenu] = useState(false);

    const validateMessage = () => {
        if (message.trim() === '') return false;
        if (message.length > 200) return false;
        return true;
    };

    const getUserInfo = useCallback(async () => {
        try {
            const response = await axios.get(`https://chat-app-3xsn.onrender.com/chat/getUser/all-info/${own}/${mobile}`);
            const userData = response.data.result;
            if (userData) {
                setUserName(userData.name || 'Unknown User');
                setDateTime(userData.dateTime || 'Unknown Time');
            }
        } catch (err) {
            console.error(err);
        }
    }, [own, mobile]);

    const sendMSG = async () => {
        if (!validateMessage()) {
            return;
        }
        try {
            await axios.post(`https://chat-app-3xsn.onrender.com/chat/create-user/send-msg/${mobile}`, {
                senderId: own,
                receiverId: mobile,
                message,
                status: false
            });
            getUserChat();
            setMessage('');
        } catch (err) {
            throw err;
        }
    }
    const getUserChat = useCallback(async () => {
        try {
            const response = await axios.get(`https://chat-app-3xsn.onrender.com/chat/get/users/chat/${own}/${mobile}`);
            const filter = response.data.result[0]?.messages;
            setData(filter || []);
        } catch (err) {
            console.error(err);
        }
    }, [own, mobile]);
    useEffect(() => {
        getUserChat();
        getUserInfo();
    }, [getUserChat, getUserInfo]);
    const handleEditUser = () => {
        navigate(`/Edit/user/${mobile}`);
        setShowMenu(false);
    };
    const handleDeleteUser = () => {
        alert('Delete user feature coming soon!');
        setShowMenu(false);
    };
    const handleSeeProfile = () => {
        alert('See user profile feature coming soon!');
        setShowMenu(false);
    };
    const handleBack = () => {
        navigate('/UserScreen');
    };

    return (
        <div className="chat-screen-container">
            <div className="chat-header">
                <div className="chat-header-back-user" onClick={handleBack} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <button className="chat-header-back" tabIndex={-1} style={{ marginRight: 0, background: 'none', border: 'none', padding: 0 }} title="Back to Users">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18l-6-6 6-6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div className="chat-header-left" style={{ marginRight: 0 }}>
                        <img src={User} alt="logo" />
                    </div>
                </div>
                <div className="chat-header-info">
                    <h2>{userName}</h2>
                    <p>Last seen {dateTime}</p>
                </div>
                <div className="chat-header-menu">
                    <button className="menu-btn" onClick={() => setShowMenu(v => !v)} title="Options">
                        <span className="menu-dots">&#8942;</span>
                    </button>
                    {showMenu && (
                        <div className="menu-dropdown">
                            <div className="menu-item" onClick={handleEditUser}>Edit User</div>
                            <div className="menu-item" onClick={handleDeleteUser}>Delete User</div>
                            <div className="menu-item" onClick={handleSeeProfile}>See User Profile</div>
                        </div>
                    )}
                </div>
            </div>
            <div className="chat-messages">
                {data && data.length > 0 ? (
                    data.map((msg, index) => (
                        <div key={index} className={msg.senderId == own ? 'message sender' : 'message receiver'}>
                            {msg.message}
                        </div>
                    ))
                ) : (
                    <p className="no-messages">No messages yet.</p>
                )}
            </div>
            <div className="chat-input">
                <input type="text" onChange={(e) => setMessage(e.target.value)} value={message} placeholder="Type a message..." />
                <button type="submit" onClick={sendMSG}>Send</button>
            </div>
        </div>
    );
}

export default ChatScreen;
