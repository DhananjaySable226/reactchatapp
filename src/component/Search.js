import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import User from '../asets/user.png';
import './Search.css';
import axios from "axios";

function Search() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([]);

    const ChatScreen = (mobile) => {
        navigate(`/ChatScreen/${mobile}`);
    };

    const searchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/user/serarch/users?searchQuery=${searchQuery}`);
            setUsers(response.data.result);
        } catch (err) {
            throw err;
        }
    };

    return (
        <div className="SearchContainer">
            <div className="SearchForm">
                <input
                    className="SearchInput"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                    type="text"
                    placeholder="Search Here..."
                />
                <button onClick={searchUsers} className="SearchButton" type="button">SEARCH</button>
            </div>
            {users.map((user, id) => (
                <div key={id} onClick={() => ChatScreen(user.mobile)} className="UserInfo">
                    <div>
                        <img className="UserImage" src={User} alt="user logo" />
                    </div>
                    <div className="UserInfoText">
                        <h2>{user.name}</h2>
                        <p>{user.mobile}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Search;
