import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TitleChange = () => {
    const [titleTxt, setTitleTxt] = useState('');
    const token = localStorage.getItem('token');

    const handleUpdate = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}admin/start-text`,
                {
                    "start_text": titleTxt,
                },
                {
                    headers: {
                        'x-access-token': token,
                    },
                }
            );

            if (response.status === 200) {
                toast.success(response.data.message);
                console.log('Title Txt', response.data);
            }
        } catch (error) {
            console.error('Error updating Text:', error);
            toast.error('Failed to update Text.');
        }
    };

    return (
        <div className="Gradientbg-clr-3 p-4 text-white rounded-lg mt-2 mx-auto">
            <h2 className="text-lg font-bold mb-4">Title Change</h2>
            <div className='relative flex justify-start items-center'>
                <input
                    type="text"
                    value={titleTxt}
                    onChange={(e) => setTitleTxt(e.target.value)}
                    className="mb-4 p-2 pl-6 bg-[#0e0a26ab] rounded w-full focus:outline-none"
                />
            </div>
            <button
                onClick={handleUpdate}
                disabled={!titleTxt.trim()} // Disable if input is empty or whitespace
                className={`themeBtn ${titleTxt.trim() ? 'active' : 'opacity-50 cursor-not-allowed'}`}
            >
                Update
            </button>
        </div>
    );
}

export default TitleChange;
