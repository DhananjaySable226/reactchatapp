import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import UsersScreen from './component/UsersScreen';
import Login from './component/Login';
import UserTable from './component/UserTable';
import ChatScreen from './component/ChatScreen';
import AddUser from './component/AddUser';
import CreateUser from './component/CreateUser';
import Edit from './component/Edit';
import Search from './component/Search';

function App() {
  const localstorageData = localStorage.getItem("user");
  // const deleteData = () => {
  //   const deleteUserData = localStorage.removeItem("user")
  //   return deleteUserData
  // }

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={localstorageData ? <Navigate to="/UserScreen" /> : <Login />} />
          <Route path="/UserScreen" element={<UsersScreen />} />
          <Route path="/UserTable" element={<UserTable />} />
          <Route path="/ChatScreen/:mobile" element={<ChatScreen />} />
          <Route path="/AddUser" element={<AddUser />} />
          <Route path="/CreateUser" element={<CreateUser />} />
          <Route path="/Edit/user/:mobile" element={<Edit />} />
          <Route path="/Search/Users/" element={<Search />} />
        </Routes>
      </Router>
      {/* <button onClick={deleteData}>click</button> */}
    </div>
  );
}

export default App;
