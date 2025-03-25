import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { auditValues } from '../utils/AdminApi';

const Audit = () => {
    const [addresses, setAddresses] = useState({
        audit_link: '',
        contract_address: '',
        vesting_address: ''
    });

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const token = localStorage.getItem('x-access-token');
                const response = await axios.get(`${process.env.REACT_APP_API}admin/get-addresses`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    const { audit_link, contract_address, vesting_address } = response.data.data[0];
                    setAddresses({ audit_link, contract_address, vesting_address });
                }
            } catch (error) {
                console.error('Failed to fetch addresses:', error);
                toast.error('Failed to fetch addresses', { autoClose: 1000 });
            }
        };

        fetchAddresses();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddresses((prevAddresses) => ({
            ...prevAddresses,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        const { audit_link, contract_address, vesting_address } = addresses;

        if (!audit_link || !contract_address || !vesting_address) {
            toast.error('All fields are required!', { autoClose: 1000 });
            return;
        }

        try {
            const response = await auditValues(audit_link, contract_address, vesting_address);
            console.log('auditValues', response)
            toast.success('Successfully Updated')

        } catch (error) {
            console.log("auditValues", error)
            toast.error('Failed to Update')
            // Errors are already handled in the auditValues function
        }
    };

    return (
        <div className="p-4 mt-2 Gradientbg-clr-3 text-white rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Audit & Addresses</h2>
            <div className="mb-4">
                <label className="block mb-1 capitalize">Audit</label>
                <div className="relative flex justify-start items-center">
                    <input
                        type="text"
                        name="audit_link"
                        value={addresses.audit_link}
                        onChange={handleChange}
                        className="p-2 bg-[#0e0a26ab] rounded w-full focus:outline-none"
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="block mb-1 capitalize">Contract presale address</label>
                <div className="relative flex justify-start items-center">
                    <input
                        type="text"
                        name="contract_address"
                        value={addresses.contract_address}
                        onChange={handleChange}
                        className="p-2 bg-[#0e0a26ab] rounded w-full focus:outline-none"
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="block mb-1 capitalize">Contract vesting address</label>
                <div className="relative flex justify-start items-center">
                    <input
                        type="text"
                        name="vesting_address"
                        value={addresses.vesting_address}
                        onChange={handleChange}
                        className="p-2 bg-[#0e0a26ab] rounded w-full focus:outline-none"
                    />
                </div>
            </div>
            <button
                onClick={handleSubmit}
                className="themeBtn active"
            >
                Update
            </button>
        </div>
    );
};

export default Audit;
