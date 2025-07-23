import React, { useState } from "react";
import './Edit.css';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
    const { mobile } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');

    const updateUserName = async () => {
        try {
            await axios.put(`https://chat-app-3xsn.onrender.com/user/update-user/${mobile}`, {
                name
            });
            setName('');
            navigate('/UserScreen');
        } catch (err) {
            throw err;
        }
    }
    return (
        <div className="edit-container">
            <div>
                <label>UserName*</label>
                <input type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Enter Name"
                />
            </div>
            <div>
                <button onClick={updateUserName} type="submit">SAVE</button>
            </div>
        </div>
    );
}

export default Edit;
