import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/AdminApi';
import eyeIcon from '../assets/icons/ph_eye.png';
import eyeIconNone from '../assets/icons/radix-icons_eye-none.png';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: '',
        showPassword: false,
    });

    const toggleVisibility = (field) => {
        setFormData((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    /**
 * Handles the login form submission.
 * 
 * - Prevents the default form submission behavior.
 * - Attempts to log in the user with the provided credentials.
 * - If login is successful and a token is received, navigates to the `/auth` route with the token stored in state.
 * - If login fails, displays an error message.
 * - Catches any errors and sets a failure message.
 */

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(userName, password);

            if (response.token) {
                // Navigate to the auth screen with the token in state
                navigate('/auth', {
                    state: {
                        token: response.token,
                    },
                });
            } else {
                setMessage('Login failed');
            }
        } catch (error) {
            setMessage('Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Username"
                        required
                        className="w-full p-3 mb-4 bg-gray-700 rounded text-white placeholder-gray-400"
                    />
                    <div className="relative">
                        <input
                            value={password}
                            type={formData.showPassword ? 'text' : 'password'}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full p-3 mb-4 bg-gray-700 rounded text-white placeholder-gray-400"
                        />
                        <img
                            src={formData.showPassword ? eyeIcon : eyeIconNone}
                            className="w-[20px] absolute right-2 top-3.5 cursor-pointer"
                            alt="Toggle confirm password visibility"
                            onClick={() => toggleVisibility('showPassword')}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded font-bold"
                    >
                        Login
                    </button>
                </form>
                {message && <p className="mt-4 text-center">{message}</p>}
            </div>
        </div>
    );
};

export default Login;
