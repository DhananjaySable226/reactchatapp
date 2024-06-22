import React, { useEffect, useState } from "react";
import User from '../asets/user.png'
import Edit from "../asets/edit.png"
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
    const [error, setError] = useState('');

    const clickUser = () => {
        navigate(`/Edit/user/${mobile}`);
    }
    const validateMessage = () => {
        if (message.trim() === '') {
            setError('Message cannot be empty.');
            return false;
        }
        if (message.length > 200) {
            setError('Message cannot exceed 200 characters.');
            return false;
        }
        setError('');
        return true;
    };

    const getUserInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/chat/getUser/all-info/${own}/${mobile}`);
            const userData = response.data.result;
            if (userData) {
                setUserName(userData.name || 'Unknown User');
                setDateTime(userData.dateTime || 'Unknown Time');
            }
        } catch (err) {
            throw err;
        }
    }

    const sendMSG = async () => {
        if (!validateMessage()) {
            return;
        }
        try {
            await axios.post(`http://localhost:4000/chat/create-user/send-msg/${mobile}`, {
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
    const getUserChat = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/chat/get/users/chat/${own}/${mobile}`);
            const filter = response.data.result[0]?.messages;
            setData(filter || []);
        } catch (err) {
            throw err;
        }
    }
    useEffect(() => {
        getUserChat();
        getUserInfo();
    }, [own, mobile])

    return (
        <div className="chat-screen-container">
            <div className="chat-header">
                <img src={User} alt="logo" />
                <h2>{userName}</h2>
                <p>Last seen {dateTime}</p>
                <div onClick={clickUser}>
                    <img src={Edit} alt="logo" />
                </div>
            </div>
            <div style={{ width: '100%', height: '300px', overflowY: 'scroll' }}>
                {data && data.length > 0 ? (
                    data.map((msg, index) => (
                        <div key={index} style={{ textAlign: msg.senderId == own ? 'right' : 'left', margin: '10px' }}>
                            <div style={{ display: 'inline-block', backgroundColor: msg.senderId == own ? 'green' : 'red', padding: '8px', borderRadius: '8px' }}>
                                {msg.message}
                            </div>
                        </div>
                    ))
                ) : (
                    <p></p>
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
