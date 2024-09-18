import { Input, message } from 'antd';
import axios from 'axios';
import React from 'react';
import { HideLoading, showLoading } from '../redux/rootSlice';
import { useDispatch } from 'react-redux';

function Login() {
    const [user, setUser] = React.useState({
        username: "",
        password: ""
    });
    const dispatch = useDispatch();
    
    const login = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post("/api/portfolio/admin-login", {
                username: user.username.trim(),  // Ensure no extra spaces
                password: user.password.trim()   // Ensure no extra spaces
            });
            dispatch(HideLoading());
            if(response.data.success){
                message.success(response.data.message);
                localStorage.setItem('token', JSON.stringify(response.data.data));  // Store token properly
                window.location.href = '/admin';
            }
            else{
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(error.message);
            dispatch(HideLoading());
        }
    }

    return (
        <div className='flex justify-center items-center h-screen bg-primary'>
            <div className='w-96 flex gap-5 p-5 shadow border border-gray-500 flex-col bg-white'>
                <h1 className='text-2xl'>Aqsa - Admin Login</h1>
                <hr/>
                <Input className='input' type='text' placeholder='Username' value={user.username} onChange={(e) => setUser({...user, username: e.target.value})}/>
                <Input className='input' type='password' placeholder='Password' value={user.password} onChange={(e) => setUser({...user, password: e.target.value})}/>
                <button className='bg-primary text-white p-2' onClick={login}>Login</button>
            </div>
        </div>
    );
}

export default Login;
