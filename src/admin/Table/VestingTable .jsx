import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { updateVestingDate, vestingOnOff } from '../../utils/AdminApi';
import { userViewVestings } from '../../utils/Api';
import { useReadContract } from 'wagmi';
import { presaleContractAddress } from '../../services/config';
import functionAbi from '../../Abi/abi.json';


const VestingTable = (phase1Data, phase2Data, phase3Data, phase4Data, phase5Data) => {
    const [vestingNumber, setVestingNumber] = useState(1);
    const [vestingData, setVestingData] = useState([]);
    const [vestingNumberOnOff, setVestingNumberOnOff] = useState(1);
    const [startDate, setStartDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState();
    const contractAddress = presaleContractAddress;

    const handleToggle = async (itemId, status) => {
        const itemToToggle = vestingData.find((item) => item._id === itemId);
        console.log("itemToToggle", itemToToggle.vesting_number);

        try {
            const response = await vestingOnOff(itemToToggle.vesting_number, status); // Passing vesting_number and status
            console.log('new response', response);

            if (response) {
                const updatedData = vestingData.map((item) =>
                    item._id === itemId ? { ...item, status: response.status } : item
                );
                console.log("updatedData", updatedData);
                setVestingData(updatedData);
                toast.success('Status updated successfully', { autoClose: 1000 });
            } else {
                throw new Error('Failed to update status');
            }
        } catch (error) {
            toast.error('Failed to update status', { autoClose: 1000 });
        }
    };

    useEffect(() => {
        const fetchViewVestings = async () => {
            try {
                const response = await userViewVestings();
                console.log("vestingNumberOnOff", response.data);

                if (Array.isArray(response.data)) {
                    setVestingData(response.data);
                } else {
                    console.error('Unexpected data format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching vesting data:', error);
            }
        };

        fetchViewVestings();
    }, []);

    const handleVestingNumberChangeOnoff = async (e) => {
        setVestingNumberOnOff(parseInt(e.target.value));
    };

    const handleVestingNumberChange = (e) => {
        setVestingNumber(parseInt(e.target.value));
    };

    const handleDateChange = (date) => {
        setStartDate(date);
        console.log("Selected Date and Time:", date);
    };

    const handleSubmit = async () => {
        try {
            const currentDate = new Date();

            if (startDate <= currentDate) {
                toast.error('Please select a future date', { autoClose: 1000 });
                return;
            }

            setLoading(true);

            // Get the date and time in the required format
            const year = startDate.getFullYear();
            const month = String(startDate.getMonth() + 1).padStart(2, '0');
            const day = String(startDate.getDate()).padStart(2, '0');
            const hours = String(startDate.getHours()).padStart(2, '0');
            const minutes = String(startDate.getMinutes()).padStart(2, '0');
            const seconds = String(startDate.getSeconds()).padStart(2, '0');

            const timezoneOffset = -startDate.getTimezoneOffset();
            const absOffsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
            const absOffsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');
            const gmtSign = timezoneOffset >= 0 ? '+' : '-';
            const gmtString = `GMT${gmtSign}${absOffsetHours}:${absOffsetMinutes}`;

            const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${gmtString}`;

            // Regular expression to validate the format
            const dateTimeFormat = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} GMT[+-]\d{2}:\d{2}$/;

            // Check if the formatted date matches the required format
            if (!dateTimeFormat.test(formattedDate)) {
                toast.error('Selected date and time must be in the format YYYY-MM-DD HH:MM:SS GMT+HH:MM', { autoClose: 2000 });
                setLoading(false);
                return;
            }

            console.log("Formatted Date:", formattedDate);

            await updateVestingDate(vestingNumber, formattedDate);
            toast.success('Vesting date updated successfully', { autoClose: 1000 });
        } catch (error) {
            toast.error('Failed to update vesting date', { autoClose: 1000 });
        } finally {
            setLoading(false);
        }
    };


    const calculateProgress = (phaseData) => {
        // const totalToken = Number(phaseData?.[0]) / 10 ** 18;
        const soldAmount = Number(phaseData?.[2]) / 10 ** 18;
        // const progress = ((soldAmount / totalToken) * 100).toFixed(2);

        // console.log(`totalToken: ${totalToken}, soldAmount: ${soldAmount}, progress: ${progress}`);
        return soldAmount; // Return an object with all values
    };

    const phase1 = calculateProgress(phase1Data.phase1Data);
    const phase2 = calculateProgress(phase1Data.phase2Data);
    const phase3 = calculateProgress(phase1Data.phase3Data);
    const phase4 = calculateProgress(phase1Data.phase4Data);
    const phase5 = calculateProgress(phase1Data.phase5Data);
    console.log("adasdasdasdasdd", phase1, phase2, phase3, phase4, phase5);

    const { data: totalClaimPerPhase, refetch: refetchTotalClaimPerPhase } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'totalClaimPerPhase',
        watch: true,
    });
    console.log("totalClaimPerPhase", totalClaimPerPhase)

    return (
        <div className="vesting-table Gradientbg-clr-3 px-2 mb-2 pb-2 rounded-lg">
            <div className='py-5 flex items-center justify-start gap-2 max-[600px]:flex-col max-[600px]:items-start'>
                <div className="vesting-selector flex flex-col gap-1 max-[600px]:w-full">
                    <label htmlFor="vestingNumber" className='font-bold'>Vesting Number:</label>
                    <select id="vestingNumber" className=' bg-transparent text-white border p-2 rounded-lg w-[150px] focus:outline-none max-[600px]:w-full' value={vestingNumber} onChange={handleVestingNumberChange}>
                        {[1, 2, 3, 4, 5].map((number) => (
                            <option key={number} value={number} className='text-black font-bold'>
                                {number}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="date-selector flex flex-col gap-1 w-fit rounded-lg justify-between max-[600px]:w-full">
                    <label htmlFor="startDate" className='font-bold pr-3'>Select Date and Time:</label>
                    <div className='border p-2 rounded-lg max-[600px]:w-full'>
                        <DatePicker
                            id="startDate"
                            selected={startDate}
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd h:mm aa"
                            placeholderText='yyyy-MM-dd h:mm aa'
                            showTimeSelect
                            timeFormat="HH:mm"
                            minDate={new Date()}
                        />
                    </div>
                </div>
            </div>
            <button className="update-button themeBtn active" onClick={handleSubmit} disabled={loading}>
                Update Vesting Date
            </button>

            <div className="overflow-x-auto">
                <table className="Gradientbg-clr-3 text-white rounded-lg mt-3 w-[700px] md:w-full">
                    <thead>
                        <tr>
                            <th className="text-md font-semibold px-3 py-4 text-left">Vesting Number</th>
                            <th className="text-md font-semibold px-0 py-4 text-left">Total Claim Per Phase</th>
                            <th className="text-md font-semibold px-3 py-4 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vestingData.map((item, index) => (
                            <tr key={index}>
                                {
                                    console.log("index", index)
                                }
                                <td className="px-3 py-2">{item.vesting_number}</td>
                                <td>
                                    {/* {
                                        index === 0 && (
                                            phase1Data.phase1Data?.[1]
                                        )
                                    } */}
                                    {
                                        index === 0
                                            ? (Number(totalClaimPerPhase?.[0]) / 10 ** 18)
                                            : index === 1
                                                ? (Number(totalClaimPerPhase?.[1]) / 10 ** 18)
                                                : index === 2
                                                    ? (Number(totalClaimPerPhase?.[2]) / 10 ** 18)
                                                    : index === 3
                                                        ? (Number(totalClaimPerPhase?.[3]) / 10 ** 18)
                                                        : index === 4
                                                            ? (Number(totalClaimPerPhase?.[4]) / 10 ** 18)
                                                            : 0
                                    }
                                </td>
                                <td className="px-3 py-2">
                                    <select
                                        value={item.status}
                                        onChange={(e) => handleToggle(item._id, e.target.value)}
                                        className={`bg-transparent p-2 rounded-lg w-[150px] font-bold focus:outline-none max-[600px]:w-full
                                            ${item.status === 'completed' ? 'text-[#BBE333] border-2 border-[#BBE333]' : ''}
                                            ${item.status === 'available' ? 'text-[#99D9EA] border-2 border-[#99D9EA]' : ''}
                                            ${item.status === 'unavailable' ? 'text-[#C3C3C3] border-2 border-[#C3C3C3]' : ''}`
                                        }
                                    >
                                        <option value="completed" className='text-black font-bold'>Completed</option>
                                        <option value="available" className='text-black font-bold'>Available</option>
                                        <option value="unavailable" className='text-black font-bold'>Unavailable</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default VestingTable;