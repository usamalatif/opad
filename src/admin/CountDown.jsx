import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CountDown = () => {
    const [dateTime, setDateTime] = useState(new Date());
    const token = localStorage.getItem('token');

    const handleDateTimeChange = (date) => {
        setDateTime(date);
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}admin/create-date`,
                { date: dateTime.toISOString() },
                {
                    headers: {
                        'x-access-token': token,
                    },
                }
            );

            if (response.status === 200) {
                toast.success(response.data.message);
                console.log('TGE Date:', response.data.tge_date);
            }
        } catch (error) {
            console.error('Error updating date:', error);
            toast.error('Failed to update date.');
        }
    };

    return (
        <div className="Gradientbg-clr-3 p-4 text-white rounded-lg mt-2 mx-auto">
            <h2 className="text-lg font-bold mb-4">Set Countdown Date & Time</h2>
            <DatePicker
                selected={dateTime}
                onChange={handleDateTimeChange}
                showTimeSelect
                dateFormat="Pp"
                minDate={new Date()} // Prevent past dates
                className="mb-4 p-2 bg-[#0C1D3E] text-white rounded-md w-full"
            />
            <button
                onClick={handleUpdate}
                className="themeBtn active"
            >
                Update
            </button>
        </div>
    );
};

export default CountDown;
