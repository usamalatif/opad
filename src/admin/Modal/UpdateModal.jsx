import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { presaleStageUpdate } from '../../utils/AdminApi';

const UpdateModal = ({ item, closeModal, handleSave }) => {
    const [updatedItem, setUpdatedItem] = useState({ ...item });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Prevent minus sign and any non-numeric value
        if (name === "coin_price") {
            const validValue = value.replace(/[^0-9.]/g, ''); // Only allow numbers and dots for decimal
            if (parseFloat(validValue) < 0) {
                return; // Prevent typing negative values
            }
            setUpdatedItem((prev) => ({ ...prev, [name]: validValue }));
        } else if (name === "percentage_sold") {
            if (parseFloat(value) > 100) {
                return; // Limit percentage_sold to 100
            }
            setUpdatedItem((prev) => ({ ...prev, [name]: value }));
        }
    };


    const handleSaveClick = async () => {
        try {
            const response = await presaleStageUpdate(
                updatedItem.stage_number,
                updatedItem.percentage_sold,
                updatedItem.coin_price
            );
            console.log('handleSaveClick', response)

            if (response.status === 200) {
                toast.success('Item updated successfully', { autoClose: 1000 });
                handleSave(updatedItem);
                closeModal();
            } else {
                toast.error('Failed to update item', { autoClose: 1000 });
            }
        } catch (error) {
            toast.error('Failed to update item', { autoClose: 1000 });
        }
    };

    const handleClickOutside = (e) => {
        if (e.target.id === 'modal-container') {
            closeModal();
        }
    };

    return (
        <div
            id="modal-container"
            onClick={handleClickOutside}
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center p-2 z-50"
        >
            <div
                className="w-full max-w-[600px] p-6 rounded-md shadow-lg border-2 border-[#24243e]"
                style={{ background: "linear-gradient(135deg, #0f0c29, #0B0620, #13e1e51f)" }}
            >
                <h2 className="text-2xl font-bold mb-4 text-white">Update Item</h2>
                <div className='mb-4'>
                    <label className="text-white font-bold">Stage Number:</label>
                    <div className='Gradientbg-clr-2 rounded w-full p-[1px] text-[20px] font-bold font-["Mona-Sans"] max-[950px]:w-full'>
                        <input
                            type="number"
                            name="id"
                            value={updatedItem.stage_number}
                            disabled={true}
                            className='border w-full bg-transparent rounded border-none pl-2 focus:outline-none bg-4 max-[950px]:w-full'
                        />
                    </div>
                </div>
                <div className='mb-4'>
                    <label className="text-white font-bold">Coin Price:</label>
                    <div className='relative Gradientbg-clr-2 rounded w-full p-[1px] text-[20px] font-bold font-["Mona-Sans"] max-[950px]:w-full'>
                        <input
                            type="number"
                            name="coin_price"
                            value={updatedItem.coin_price}
                            onChange={handleChange}
                            onKeyDown={(e) => {
                                if (e.key === "-" || e.key === "e") {
                                    e.preventDefault(); // Prevent typing minus sign and 'e'
                                }
                            }}
                            className="border w-full bg-transparent rounded border-none pl-2 focus:outline-none bg-4 max-[950px]:w-full"
                        />
                        <label className="text-white font-bold absolute right-[10px]">$</label>
                    </div>
                </div>

                <button
                    onClick={handleSaveClick}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Save
                </button>
                <button
                    onClick={closeModal}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-4"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default UpdateModal;
