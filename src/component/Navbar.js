import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import UserIcon from '../asets/user.png';
import FindIcon from '../asets/find.png';

function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="navbar-left" onClick={() => navigate('/UserScreen')}>
                <span className="navbar-title">ChatApp</span>
            </div>
            <div className="navbar-right">
                <img
                    src={FindIcon}
                    alt="search"
                    className="navbar-icon"
                    title="Search"
                    onClick={() => navigate('/Search/Users')}
                />
                <img
                    src={UserIcon}
                    alt="users"
                    className="navbar-icon"
                    title="User Table"
                    onClick={() => navigate('/UserTable')}
                />
            </div>
        </nav>
    );
}

export default Navbar; 