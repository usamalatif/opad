import React, { useEffect, useRef, useState } from 'react';
import AdminTable from './Table/AdminTable';
import { handlevalidToken, presaleStageView } from '../utils/AdminApi';
// import { ToastContainer } from 'react-toastify';
import VestingTable from './Table/VestingTable ';
import UpdateData from './UpdateData';
import { useNavigate } from 'react-router-dom';
import PasswordModal from './Modal/PasswordModal';
import Audit from './Audit';
import CountDown from './CountDown';
import TitleChange from './TitleChange';

import { useFetchTiers } from '../web3/ContractRead';
import AdminPanel from '../components/AdminPanel/AdminPanel';

const Admin = () => {
    const [presaleData, setPresaleData] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [activeTab, setActiveTab] = useState('Dashboard');
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const openModalPassword = () => {
        setIsPasswordModalOpen(true);
    };

    const closeModal = () => {
        setIsPasswordModalOpen(false);
        setActiveTab('Dashboard')
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleMouseEnter = () => {
        clearTimeout(timeoutId);
        setIsModalOpen(true);
    };

    const handleMouseLeave = () => {
        const id = setTimeout(() => {
            if (!modalRef.current || !modalRef.current.contains(document.activeElement)) {
                setIsModalOpen(false);
            }
        }, 100);
        setTimeoutId(id);
    };

    const handleDeleteToken = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleactiveTab = (tabName) => {
        setActiveTab(tabName);
    };

    useEffect(() => {
        const fetchPresaleData = async () => {
            try {
                const data = await presaleStageView();
                console.log("presaleData", data.data);
                setPresaleData(data.data);
            } catch (error) {
                console.error('Failed to fetch presale data:', error);
            }
        };

        fetchPresaleData();
    }, []);


    const { phase1Data, phase2Data, phase3Data, phase4Data, phase5Data } = useFetchTiers();
    console.log("vesting Phases Data", phase1Data, phase2Data, phase3Data, phase4Data, phase5Data)


    return (
        <div className="flex flex-col md:flex-row md:h-screen h-full" style={{ background: "linear-gradient(135deg, #0B0620, #13e1e51f)" }}>
            {/* <ToastContainer /> */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
                <ul className="Gradientbg-clr-3 py-4 h-full">
                    <h1 className="text-2xl font-bold p-4">Admin Panel</h1>
                    <li
                        className={`p-4 font-bold cursor-pointer ${activeTab === 'Dashboard' ? 'bg-zinc-100 text-black' : 'hover:bg-zinc-100 hover:text-black'}`}
                        onClick={() => handleactiveTab('Dashboard')}
                    >
                        Dashboard
                    </li>
                    <li
                        className={`p-4 font-bold cursor-pointer ${activeTab === 'Password' ? 'bg-zinc-100 text-black' : 'hover:bg-zinc-100 hover:text-black'}`}
                        onClick={() => { handleactiveTab('Password'); openModalPassword(); }}
                    >
                        Password
                    </li>
                    <li
                        className={`p-4 font-bold cursor-pointer ${activeTab === 'Logout' ? 'bg-zinc-100 text-black' : 'hover:bg-zinc-100 hover:text-black'}`}
                        onClick={() => {
                            handleactiveTab('Logout');
                            handleDeleteToken();
                        }}
                    >
                        Logout
                    </li>
                </ul>
            </div>

            <div className="flex-1 p-4 md:p-8 overflow-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-bold text-white gradient-text mb-4 md:mb-0">Dashboard</h2>
                    <div className='flex items-center gap-1'>
                        <div
                            className='relative flex items-center'
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img
                                src="https://placehold.co/40x40"
                                alt="User-Image"
                                className="rounded-full cursor-pointer"
                            />
                            {isModalOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-gray-700 text-white rounded-lg shadow-lg p-2">
                                    <p className="font-semibold">Name: User</p>
                                    <button className="mt-2 w-full py-1 bg-red-500 hover:bg-red-600 rounded-lg text-white" onClick={handleDeleteToken}>Logout</button>
                                </div>
                            )}

                        </div>
                        <button onClick={toggleSidebar} className="text-white md:hidden ">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <h3 className="text-white text-2xl font-bold mb-4">Presale Phases</h3>

                <AdminTable initialData={presaleData} phase1Data={phase1Data} phase2Data={phase2Data} phase3Data={phase3Data} phase4Data={phase4Data} phase5Data={phase5Data}  />
                <br />
                <VestingTable phase1Data={phase1Data} phase2Data={phase2Data} phase3Data={phase3Data} phase4Data={phase4Data} phase5Data={phase5Data} />
                <UpdateData />
                <PasswordModal isOpen={isPasswordModalOpen} closeModal={closeModal} />
                <Audit />
                <CountDown />
                <TitleChange />
                <AdminPanel/>
            </div>
        </div>
    );
};

export default Admin;
