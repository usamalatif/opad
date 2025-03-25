import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uis_calender from '../assets/icons/uis_calender.svg';
import moment from 'moment';

const UpdateData = () => {
    const [loading, setLoading] = useState(false);
    const [minimumPurchase, setMinimumPurchase] = useState(1);
    const [maximumPurchase, setMaximumPurchase] = useState(10000);
    const [presaleAllocation, setPresaleAllocation] = useState('50 000 000 OZ7');
    const [listingPrice, setListingPrice] = useState(0.030);
    const [tgeDate, setTgeDate] = useState('');
    const [dateError, setDateError] = useState('');
    const [inputErrors, setInputErrors] = useState({});

    const formatDate = (date) => {
        return moment(date).format('YYYY-MM-DD HH:mm:ss') + ` ${moment(date).format('Z')}`;
    };

    const handleSubmit = async () => {
        let errors = {};

        if (!minimumPurchase) errors.minimumPurchase = 'Minimum Purchase is required';
        if (maximumPurchase > 10000) errors.maximumPurchase = 'Maximum Purchase cannot be greater than 10,000';
        if (!presaleAllocation) errors.presaleAllocation = 'Presale Allocation is required';
        if (!listingPrice) errors.listingPrice = 'Listing Price is required';
        if (!tgeDate) errors.tgeDate = 'TGE Date is required';

        if (Object.keys(errors).length > 0) {
            setInputErrors(errors);
            return;
        }

        setInputErrors({});
        const token = localStorage.getItem('token');

        try {
            setLoading(true);
            const response = await axios.post(
                `${process.env.REACT_APP_API}admin/update-data`,
                {
                    minimum_purchase: minimumPurchase,
                    maximum_purchase: maximumPurchase,
                    presale_allocation: presaleAllocation,
                    listing_price: listingPrice,
                    tge_date: tgeDate,
                },
                {
                    headers: {
                        'x-access-token': token,
                    },
                }
            );
            toast.success(response.data.message, { autoClose: 2000 });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message, { autoClose: 2000 });
            console.error('Error updating data', error);
        }
    };

    return (
        <div className="p-4 Gradientbg-clr-3 text-white rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Update Data</h2>
            <div className="mb-4">
                <label className="block mb-1">Minimum Purchase</label>
                <div className='relative flex justify-start items-center'>
                    <span className='absolute ml-2'>$</span>
                    <input
                        type="number"
                        value={minimumPurchase}
                        onChange={(e) => setMinimumPurchase(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "-" || e.key === "e") {
                                e.preventDefault();
                            }
                        }}
                        onWheel={(e) => e.preventDefault()}
                        className="p-2 pl-6 bg-[#0e0a26ab] rounded w-full focus:outline-none"
                    />
                </div>
                {inputErrors.minimumPurchase && <p className="text-red-500 mt-2">{inputErrors.minimumPurchase}</p>}
            </div>
            <div className="mb-4">
                <label className="block mb-1">Maximum Purchase</label>
                <div className='relative flex justify-start items-center'>
                    <span className='absolute ml-2'>$</span>
                    <input
                        type="number"
                        value={maximumPurchase}
                        max="10000" // Enforcing maximum value in the UI
                        onChange={(e) => setMaximumPurchase(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "-" || e.key === "e") {
                                e.preventDefault();
                            }
                        }}
                        onWheel={(e) => e.preventDefault()}
                        className="p-2 pl-6 bg-[#0e0a26ab] rounded w-full focus:outline-none"
                    />
                </div>
                {inputErrors.maximumPurchase && <p className="text-red-500 mt-2">{inputErrors.maximumPurchase}</p>}
            </div>
            <div className="mb-4">
                <label className="block mb-1">Presale Allocation</label>
                <input
                    type="text"
                    value={presaleAllocation}
                    onChange={(e) => setPresaleAllocation(e.target.value)}
                    className="p-2 bg-[#0e0a26ab] rounded w-full focus:outline-none"
                />
                {inputErrors.presaleAllocation && <p className="text-red-500 mt-2">{inputErrors.presaleAllocation}</p>}
            </div>
            <div className="mb-4">
                <label className="block mb-1">Listing Price</label>
                <div className='relative flex justify-start items-center'>
                    <span className='absolute ml-2'>$</span>
                    <input
                        type="number"
                        value={listingPrice}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            if (inputValue === "" || Number(inputValue) <= 10000000000000000000) {
                                setListingPrice(inputValue);
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "-" || e.key === "e") {
                                e.preventDefault();
                            }
                        }}
                        onWheel={(e) => e.preventDefault()}
                        className="p-2 pl-6 bg-[#0e0a26ab] rounded w-full focus:outline-none"
                    />
                </div>
                {inputErrors.listingPrice && <p className="text-red-500 mt-2">{inputErrors.listingPrice}</p>}
            </div>
            <div className="mb-4">
                <label className="block mb-1">TGE Date</label>
                <input
                    type="text"
                    value={tgeDate}
                    onChange={(e) => setTgeDate(e.target.value)}
                    className="p-2 pl-2 bg-[#0e0a26ab] rounded w-full focus:outline-none"
                />
                {inputErrors.tgeDate && <p className="text-red-500 mt-2">{inputErrors.tgeDate}</p>}
            </div>
            <button
                onClick={handleSubmit}
                className="themeBtn active"
                disabled={loading}
            >
                Update
            </button>
        </div>
    );
};

export default UpdateData;
