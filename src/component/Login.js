import React, { useState } from "react";
import axios from "axios";
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [show] = useState();
    const [errors, setErrors] = useState({});

    const handleClick = () => {
        if (validate()) {
            addUser();
            navigate('/UserScreen');
        }
    };

    const validate = () => {
        let tempErrors = {};
        let isValid = true;
        if (!name || name.trim() === '') {
            tempErrors["name"] = "Name is required";
            isValid = false;
        }
        if (!mobile || mobile.trim() === '') {
            tempErrors["mobile"] = "Mobile number is required";
            isValid = false;
        } else if (!/^\d{10}$/.test(mobile)) {
            tempErrors["mobile"] = "Mobile number is invalid. It should be 10 digits.";
            isValid = false;
        }
        setErrors(tempErrors);
        return isValid;
    };

    const addUser = async () => {
        try {
            const response = await axios.post(`https://chat-app-3xsn.onrender.com/user/loginUser`, {
                name,
                mobile,
                show: false
            });
            alert('Data saved');
            const { userId } = response.data.result;
            localStorage.setItem('user', JSON.stringify({ name, mobile, userId, show }));
        } catch (err) {
            throw err
        }
    };

    return (
        <div className="container">
            <div>
                <label className="label">Name*</label>
                <input
                    className="input"
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Enter name"
                    value={name}
                />
                {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div>
                <label className="label">Mobile*</label>
                <input
                    className="input"
                    onChange={(e) => setMobile(e.target.value)}
                    type="number"
                    placeholder="Enter mobile number"
                    value={mobile}
                />
                {errors.mobile && <span className="error">{errors.mobile}</span>}
            </div>
            <div>
                <button className="button" onClick={handleClick} type="submit">Submit</button>
            </div>
        </div>
    );
}

export default Login;
