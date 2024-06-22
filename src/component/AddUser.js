import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import User from '../asets/user.png';
import NewUser from '../asets/addition.png';
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

    const getUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/user/getUsers/${mobile}/false`);
            const responseData = response.data;
            if (responseData.status === 200 && Array.isArray(responseData.result)) {
                setUsers(responseData.result);
            } else {
                console.error('Invalid response format:', responseData);
            }
        } catch (err) {
            throw err;
        }
    }
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
            <div className="title">
                <h1>ADD NEW MEMBER</h1>
                <div className="logo-container">
                    <img onClick={handleClick} src={NewUser} alt="logo" />
                </div>
            </div>
            <div className="user-list">
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
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
}

export default AddUser;
