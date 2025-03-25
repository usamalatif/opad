import React, { useState, useEffect } from 'react';
import UpdateModal from '../Modal/UpdateModal';
import { toast } from 'react-toastify';
import { presaleStageToggle } from '../../utils/AdminApi';


const AdminTable = ({ initialData, phase1Data, phase2Data, phase3Data, phase4Data, phase5Data }) => {
    const [data, setData] = useState(initialData || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        setData(initialData || []);
    }, [initialData]);

    const handleUpdateClick = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };


    const toggleStatus = async (itemId) => {
        try {
            const itemToToggle = data.find((item) => item._id === itemId);
            const response = await presaleStageToggle(itemToToggle.stage_number);

            const updatedData = data.map((item) =>
                item._id === itemId ? { ...item, status: response.status } : item
            );

            setData(updatedData);
            toast.success('Status updated successfully', { autoClose: 1000 });
        } catch (error) {
            toast.error('Failed to update status', { autoClose: 1000 });
        }
    };
    const handleSave = (updatedItem) => {
        const updatedData = data.map((item) =>
            item._id === updatedItem._id ? updatedItem : item
        );
        setData(updatedData);
        closeModal();
    };

    if (!data.length) {
        return <p className="text-white">No data available.</p>;
    }



    // Function to calculate totalToken, soldAmount, and progress
    console.log("phase1Data, phase2Data, phase3Data, phase4Data, phase5Data", phase1Data, phase2Data, phase3Data, phase4Data, phase5Data);

    // Function to calculate totalToken, soldAmount, and progress
    const calculateProgress = (phaseData) => {
        const totalToken = Number(phaseData?.[0]) / 10 ** 18;
        const soldAmount = Number(phaseData?.[2]) / 10 ** 18;
        const progress = ((soldAmount / totalToken) * 100).toFixed(2);

        console.log(`totalToken: ${totalToken}, soldAmount: ${soldAmount}, progress: ${progress}`);
        return { totalToken, soldAmount, progress }; // Return an object with all values
    };

    // Call the function for each phase and destructure the returned object
    const phase1 = calculateProgress(phase1Data);
    const phase2 = calculateProgress(phase2Data);
    const phase3 = calculateProgress(phase3Data);
    const phase4 = calculateProgress(phase4Data);
    const phase5 = calculateProgress(phase5Data);

    // Output totalToken, soldAmount, and progress for each phase
    console.log("phase1:", phase1);
    console.log("phase2:", phase2);
    console.log("phase3:", phase3);
    console.log("phase4:", phase4);
    console.log("phase5:", phase5);


    return (
        <div className="overflow-x-auto">
            <table className="Gradientbg-clr-3 text-white rounded-lg w-[700px] md:w-full">
                <thead>
                    <tr>
                        <th className="text-md font-semibold px-3 py-4 text-left">ID</th>
                        <th className="text-md font-semibold px-3 py-4 text-left">Coin Price</th>
                        <th className="text-md font-semibold px-3 py-4 text-left">Amount in OZ7</th>
                        <th className="text-md font-semibold px-3 py-4 text-left">Amount in USDC</th>
                        <th className="text-md font-semibold px-3 py-4 text-left">Percentage Amount</th>
                        {/* <th className="text-md font-semibold px-3 py-4 text-left">Percentage Sold</th> */}
                        {/* <th className="text-md font-semibold px-3 py-4 text-left">Percentage Claimed</th> */}
                        <th className="text-md font-semibold px-3 py-4 text-left">Status</th>
                        <th className="text-md font-semibold px-3 py-4 text-left">Update</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item._id}>
                            {console.log(item, index, "cejcel")}
                            <td className="px-3 py-2">{item.stage_number}</td>
                            <td className="px-3 py-2">$ {item.coin_price}</td>

                            <td className="px-3 py-2">
                                {
                                    item.stage_number == 1
                                        ? phase1?.soldAmount.toFixed(2)
                                        : item.stage_number == 2
                                            ? phase2?.soldAmount.toFixed(2)
                                            : item.stage_number == 3
                                                ? phase3?.soldAmount.toFixed(2)
                                                : item.stage_number == 4
                                                    ? phase4?.soldAmount.toFixed(2)
                                                    : item.stage_number == 5
                                                        ? phase5?.soldAmount.toFixed(2)
                                                        : 0
                                }
                            </td>
                            <td className="px-3 py-2">$ {item.coin_price}</td>
                            <td className="px-3 py-2">

                                {
                                    item.stage_number == 1
                                        ? phase1?.progress
                                        : item.stage_number == 2
                                            ? phase2?.progress
                                            : item.stage_number == 3
                                                ? phase3?.progress
                                                : item.stage_number == 4
                                                    ? phase4?.progress
                                                    : item.stage_number == 5
                                                        ? phase5?.progress
                                                        : 0
                                }
                                &nbsp;%
                            </td>
                            {/* <td className="px-3 py-2">{item.percentage_sold} %</td> */}
                            {/* <td className="px-3 py-2">10 %</td> */}
                            <td className="px-3 py-2">
                                <button
                                    onClick={() => toggleStatus(item._id)}
                                    className={`px-4 py-1 font-semibold rounded ${item.status ? 'bg-green-500' : 'bg-red-500'}`}
                                >
                                    {item.status ? 'ON' : 'OFF'}
                                </button>
                            </td>
                            <td className="px-3 py-2">
                                <button
                                    onClick={() => handleUpdateClick(item)}
                                    className="px-4 py-1 font-semibold rounded bg-blue-500"
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <UpdateModal
                    item={selectedItem}
                    closeModal={closeModal}
                    handleSave={handleSave}
                />
            )}
        </div>
    );
};

export default AdminTable;

