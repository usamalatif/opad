import React, { useState } from 'react';
import { changePassword } from '../../utils/AdminApi';
import eyeIcon from '../../assets/icons/ph_eye.png';
import eyeIconNone from '../../assets/icons/radix-icons_eye-none.png';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PasswordModal = ({ isOpen, closeModal }) => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const toggleVisibility = (field) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };

    const validatePasswords = () => {
        const { password, confirmPassword } = formData;
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return false;
        }
        if (password.length < 8) {
            setError('Passwords must be at least 8 characters long.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async () => {
        if (!validatePasswords()) return;

        try {
            await changePassword(formData.password);
            toast.success('Password changed successfully!', { autoClose: 500 });
            closeModal();
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error('Error changing password:', error);
            toast.error('Failed to change password. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div
            id="modal-container"
            onClick={(e) => e.target.id === 'modal-container' && closeModal()}
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center p-2 z-50"
        >
            <div
                className="w-full max-w-[600px] p-6 rounded-md shadow-lg border-2 border-[#24243e]"
                style={{ background: "linear-gradient(135deg, #0f0c29, #0B0620, #13e1e51f)" }}
            >
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className='mb-4'>
                    <label htmlFor="password" className="text-white font-bold">Password:</label>
                    <div className='Gradientbg-clr-2 relative rounded w-full p-[1px] text-[20px] font-bold font-["Mona-Sans"] max-[950px]:w-full'>
                        <input
                            id="password"
                            type={formData.showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            className='border w-full bg-transparent rounded border-none pl-2 focus:outline-none bg-4 max-[950px]:w-full'
                        />
                        <img
                            src={formData.showPassword ? eyeIconNone : eyeIcon}
                            className='w-[20px] absolute right-2 top-1.5 cursor-pointer'
                            alt="Toggle password visibility"
                            onClick={() => toggleVisibility('showPassword')}
                        />
                    </div>
                </div>
                <div className='mb-4'>
                    <label htmlFor="confirmPassword" className="text-white font-bold">Confirm Password:</label>
                    <div className='Gradientbg-clr-2 relative rounded w-full p-[1px] text-[20px] font-bold font-["Mona-Sans"] max-[950px]:w-full'>
                        <input
                            id="confirmPassword"
                            type={formData.showConfirmPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className='border w-full bg-transparent rounded border-none pl-2 focus:outline-none bg-4 max-[950px]:w-full'
                        />
                        <img
                            src={formData.showConfirmPassword ? eyeIconNone : eyeIcon}
                            className='w-[20px] absolute right-2 top-1.5 cursor-pointer'
                            alt="Toggle confirm password visibility"
                            onClick={() => toggleVisibility('showConfirmPassword')}
                        />
                    </div>
                </div>
                <div className='flex gap-2'>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Change Password
                    </button>
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PasswordModal;
