import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import User from '../asets/user.png';
import './AddUser.css';

function AddUser() {
    const localstorageData = localStorage.getItem("user");
    const user = localstorageData ? JSON.parse(localstorageData) : null;
    const mobile = user ? user.mobile : null;
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    const handleClick = () => {
        navigate('/CreateUser');
    };

    const getUsers = useCallback(async () => {
        try {
            const response = await axios.get(`https://chat-app-3xsn.onrender.com/user/getUsers/${mobile}/false`);
            const responseData = response.data;
            if (responseData.status === 200 && Array.isArray(responseData.result)) {
                setUsers(responseData.result);
            } else {
                console.error('Invalid response format:', responseData);
            }
        } catch (err) {
            throw err;
        }
    }, [mobile]);
    const clickUser = (mobile) => {
        navigate(`/ChatScreen/${mobile}`);
    }
    useEffect(() => {
        if (mobile) {
            getUsers();
        }
    }, [mobile]);

    return (
        <div className="add-user">
            <div className="adduser-header">
                <span className="adduser-title">Add New Member</span>
                <button className="adduser-add-btn" onClick={handleClick} title="Add User">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="11" fill="#fff" stroke="#4f8cff" strokeWidth="2" />
                        <path d="M12 8v8M8 12h8" stroke="#4f8cff" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                </button>
            </div>
            <div className="add-user-list">
                {users && users.length > 0 ? (
                    users.map(user => (
                        <div key={user.id} onClick={() => clickUser(user.mobile)} className="user-container">
                            <div>
                                <img src={User} alt="user logo" />
                            </div>
                            <div>
                                <h3>{user.name}</h3>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-users-found">
                        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" style={{ marginBottom: 10 }}>
                            <circle cx="12" cy="12" r="10" stroke="#4f8cff" strokeWidth="2.5" fill="#f4f6fb" />
                            <path d="M15.5 9.5C15.5 11.1569 14.1569 12.5 12.5 12.5C10.8431 12.5 9.5 11.1569 9.5 9.5C9.5 7.84315 10.8431 6.5 12.5 6.5C14.1569 6.5 15.5 7.84315 15.5 9.5Z" stroke="#4f8cff" strokeWidth="2" />
                            <path d="M6 18C6 15.7909 9.13401 14 12.5 14C15.866 14 19 15.7909 19 18" stroke="#4f8cff" strokeWidth="2" />
                            <line x1="7" y1="17" x2="17" y2="7" stroke="#ff4d4f" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        No users found.
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddUser;
