import React, { useEffect, useState } from 'react';
import USDIMG from '../../assets/images/Ellipse 43.png';
import LOGOIMG from '../../assets/images/Group 942.png';
import PreSaleBox from './PreSaleBox';
import PreLargeBox from './PreLargeBox';
import PreSalePurchaseBox from './PreSalePurchaseBox';
import ConnectButton from '../../web3/ConnectButton';
import { countDown, userViewPresales } from '../../utils/Api';
import { useAccount, useReadContract } from 'wagmi';
import { toast } from 'react-toastify';
import { useTranslation } from '../../context/TranslationContext';
import PreSaleHolderRank from './PreSaleHolderRank';
import axios from 'axios';
import { useFetchTiers, UserPurchase } from '../../web3/ContractRead';
import functionAbi from '../../Abi/abi.json';
import { presaleContractAddress } from '../../services/config';
import { useWallet } from '../../context/WalletContext';
import ConnectButton2 from '../../web3/ConnectButton2';

const Presale = () => {
    const { t } = useTranslation();

    const { checkSignature, setCheckSignature } = useWallet()


    const [userPresalesData, setUserPresalesData] = useState([]);
    // console.log("userPresalesDatassss", userPresalesData)


    const { isConnected } = useAccount();
    const userToken = localStorage.getItem('userToken');
    const [getTitleTxt, setGetTitleTxt] = useState('')

    // Read purchases of each phase
    const { purchases1, purchases2, purchases3, purchases4, purchases5, refetchPurchases1, refetchPurchases2, refetchPurchases3, refetchPurchases4, refetchPurchases5 } = UserPurchase();
    /////////////////////Pre Sale Phases Read Functions///////////////////////
    // const { phase1Data, phase2Data, phase3Data, phase4Data, phase5Data } = useFetchTiers();
    // const { PreSaleCombinedData } = useFetchTiers();
    // console.log("Phases Data", PreSaleCombinedData)

    // const [getIndex, setGetIndex] = useState()
    // PreSaleCombinedData.forEach((phase, index) => {
    //     if (phase[5] === true) {
    //         console.log(`Array index: ${index}, Data:`, phase);
    //         setGetIndex(index)
    //     }
    // });
    // console.log("Array index data:", getIndex)

    // const combinedArray = userPresalesData.map((element, index) => ({
    //     array1: element,
    //     array2: PreSaleCombinedData[index],
    // }));



    // console.log("combinedArray", combinedArray)
    // console.log("Phase-1", combinedData.phase1Data)
    // console.log("Phase-2", combinedData.phase2Data)
    // console.log("Phase-3", combinedData.phase3Data)
    // console.log("Phase-4", combinedData.phase4Data)
    // console.log("Phase-5", combinedData.phase5Data)

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // }
    /////////////////////Pre Sale Phases Read Functions///////////////////////
    //Presale Data From endpoints
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await userViewPresales();
                setUserPresalesData(response.data);
                // console.log("userPresalesData", response.data);
            } catch (error) {
                console.error("Error fetching user presales data", error);
            }
        };

        fetchData();
    }, [isConnected, userToken]);


    useEffect(() => {
        const fetchTitle = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}user/view-text`)
                // console.log("vestingNumberOnOff", response.data);

                if (response.status === 200) {
                    setGetTitleTxt(response.data.data);
                    //  console.log("first", response.data.data)
                } else {
                    console.error('Unexpected data format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching vesting data:', error);
            }
        };

        fetchTitle();
    }, []);



    // const filteredDataNew = combinedData.map(item => item[5])
    // const filteredDataNew = combinedData.every(value => value === true);
    // console.log("Item 6", filteredDataNew)

    // const filteredEndponitStatus = userPresalesData.every((item) => item.status === true);
    // console.log("Item 6", filteredEndponitStatus)

    const filteredEndponitStatus = userPresalesData.some((item) => item.status === true);
    // console.log("Item 6", filteredEndponitStatus);


    /////////////////////////////////////////////////
    /// Each Phase Data Read
    // const contractAddress = '0x35C3A715Ab954E50d2C8a1f4f92280002eE649A5';
    const contractAddress = presaleContractAddress;
    // console.log("presaleContractAddress", presaleContractAddress)
    const { data: phase1Data, refetch: refetchPhase1Data } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'presalePhases',
        args: [1],
        watch: true,
    });

    const { data: phase2Data, refetch: refetchPhase2Data } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'presalePhases',
        args: [2],
        watch: true,
    });

    const { data: phase3Data, refetch: refetchPhase3Data } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'presalePhases',
        args: [3],
        watch: true,
    });

    const { data: phase4Data, refetch: refetchPhase4Data } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'presalePhases',
        args: [4],
        watch: true,
    });

    const { data: phase5Data, refetch: refetchPhase5Data } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'presalePhases',
        args: [5],
        watch: true,
    });

    const PreSaleAllData = {
        phase1Data,
        phase2Data,
        phase3Data,
        phase4Data,
        phase5Data,
    };

    // console.log("PreSaleAllData", PreSaleAllData)

    useEffect(() => {
        //   console.log("PreSaleAllData", PreSaleAllData)
    }, [PreSaleAllData])

    // return { PreSaleCombinedData };
    ////////////////////////////////////////////////

    return (
        <div className='px-2 py-8'>
            <PresaleTimer getTitleTxt={getTitleTxt} />
            <ConnectButton2 />
            {/* <ConnectButton /> */}

            {isConnected && checkSignature && (
                <PreSaleHolderRank />
            )}

            {userPresalesData && (
                <div className='max-w-[1140px] mx-auto justify-between gap-8 flex max-[1024px]:flex-col'>
                    <div className='w-[54%] grid grid-cols-2 gap-3 max-[1024px]:w-full max-[600px]:grid-cols-1'>

                        {userPresalesData.map((item, index) => (
                            //Data is passing according to the logic set in teh admin and explain in th edox as well
                            <PreSaleBox
                                index={index}
                                LOGOIMG={LOGOIMG}
                                USDIMG={USDIMG}
                                IDO={item.stage_number === 6 ? true : false}
                                data={item}
                                filteredEndponitStatus={filteredEndponitStatus}
                                contractData={
                                    // index == 0 ? null : PreSaleAllData.phase1Data 
                                    index == 0
                                        ? PreSaleAllData.phase1Data
                                        : index == 1
                                            ? PreSaleAllData.phase2Data
                                            : index == 2
                                                ? PreSaleAllData.phase3Data
                                                : index == 3
                                                    ? PreSaleAllData.phase4Data
                                                    : index == 4
                                                        ? PreSaleAllData.phase5Data
                                                        : null
                                    // : PreSaleAllData.phase3Data;

                                }
                                contractRefetch={
                                    // index == 0 ? null : PreSaleAllData.phase1Data 
                                    index == 0
                                        ? refetchPhase1Data
                                        : index == 1
                                            ? refetchPhase2Data
                                            : index == 2
                                                ? refetchPhase3Data
                                                : index == 3
                                                    ? refetchPhase4Data
                                                    : index == 4
                                                        ? refetchPhase5Data
                                                        : null
                                    // : PreSaleAllData.phase3Data;

                                }
                                purchases={
                                    // index == 0 ? null : PreSaleAllData.phase1Data 
                                    index == 0
                                        ? purchases1
                                        : index == 1
                                            ? purchases2
                                            : index == 2
                                                ? purchases3
                                                : index == 3
                                                    ? purchases4
                                                    : index == 4
                                                        ? purchases5
                                                        : null
                                    // : PreSaleAllData.phase3Data;

                                }
                                refetchPurchases={
                                    // index == 0 ? null : PreSaleAllData.phase1Data 
                                    index == 0
                                        ? refetchPurchases1
                                        : index == 1
                                            ? refetchPurchases2
                                            : index == 2
                                                ? refetchPurchases3
                                                : index == 3
                                                    ? refetchPurchases4
                                                    : index == 4
                                                        ? refetchPurchases5
                                                        : null
                                }
                            />
                        ))}

                        {/* {filteredEndponitStatus ?
                            <>
                                {combinedArray.map((item, index) => (
                                    <PreSaleBox
                                        key={index}
                                        LOGOIMG={LOGOIMG}
                                        USDIMG={USDIMG}
                                        IDO={item.stage_number === 6 ? true : false}
                                        data={item.array1}
                                        dataContract={item.array2}
                                    />
                                ))}
                            </>
                            :
                            <>
                                {combinedArray.map((item, index) => (
                                    <PreSaleBox
                                        key={index}
                                        LOGOIMG={LOGOIMG}
                                        USDIMG={USDIMG}
                                        IDO={item.stage_number === 6 ? true : false}
                                        data={item.array1}
                                        dataContract={item.array2}
                                    />
                                ))}
                            </>
                        } */}
                    </div>
                    <div className='w-[46%] flex flex-col gap-3 max-[1024px]:w-full'>
                        <PreLargeBox />
                        <PreSalePurchaseBox />
                    </div>
                </div>
            )}


        </div>
    );
};

export default Presale;


const PresaleTimer = ({ getTitleTxt }) => {
    const [countDownData, setCountDownData] = useState(null);
    const [timeLeft, setTimeLeft] = useState({});
    useEffect(() => {
        const fetchCountDown = async () => {
            try {
                const response = await countDown();
                setCountDownData(response.data);
                // console.log("setCountDownData", response);

                // Start the countdown timer
                const targetDate = new Date(response.date);
                // console.log("targetDate", targetDate);

                const intervalId = setInterval(() => {
                    const now = new Date();
                    const difference = targetDate - now;

                    if (difference <= 0) {
                        clearInterval(intervalId);
                        setTimeLeft({
                            days: 0,
                            hours: 0,
                            minutes: 0,
                            seconds: 0,
                        });
                    } else {
                        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                        setTimeLeft({
                            days,
                            hours,
                            minutes,
                            seconds,
                        });
                    }
                }, 1000);
            } catch (error) {
                console.error("Error fetching countdown data", error);
            }
        };

        fetchCountDown();
    }, []);
    return (
        <div>
            <h2 className='text-[#B5E61D] font-bold text-4xl text-center pt-16 uppercase'>
                {/* <span className='text-white'>$0Z7</span> {t('PRESALE_TITLE')} <span className='text-white'>starts</span> */}
                {getTitleTxt}
            </h2>
            <div className='text-center text-[#B5E61D] font-bold text-4xl py-4'>
                <div className='flex justify-center items-center gap-4 w-full max-w-[520px] mx-auto py-4 rounded max-[650px]:gap-1  max-[650px]:grid  max-[650px]:grid-cols-4'>

                    <div className='Gradientbg-clr-2 rounded-lg p-[2px] max-[950px]:w-full'>
                        <div className='flex flex-col text-7xl w-full bg-[#1E214E] p-4 rounded-lg max-[650px]:text-lg  max-[650px]:py-4'>
                            {(timeLeft.days ?? 0).toString().padStart(2, '0')} <span className='text-xs font-normal'>Days</span>
                        </div>
                    </div>

                    <span className=' max-[650px]:hidden'>:</span>
                    <div className='Gradientbg-clr-2 rounded-lg p-[2px] max-[950px]:w-full'>
                        <div className='flex flex-col text-7xl w-full max-w-[120px] bg-[#1E214E] p-4 rounded-lg max-[650px]:text-lg  max-[650px]:py-4'>
                            {(timeLeft.hours ?? 0).toString().padStart(2, '0')} <span className='text-xs font-normal'>Hours</span>
                        </div>
                    </div>
                    <span className=' max-[650px]:hidden'>:</span>
                    <div className='Gradientbg-clr-2 rounded-lg p-[2px] max-[950px]:w-full'>
                        <div className='flex flex-col text-7xl w-full max-w-[120px] bg-[#1E214E] p-4 rounded-lg max-[650px]:text-lg  max-[650px]:py-4'>
                            {(timeLeft.minutes ?? 0).toString().padStart(2, '0')} <span className='text-xs font-normal'>Minutes</span>
                        </div>
                    </div>
                    <span className=' max-[650px]:hidden'>:</span>
                    <div className='Gradientbg-clr-2 rounded-lg p-[2px] max-[950px]:w-full'>
                        <div className='flex flex-col text-7xl w-full max-w-[120px] bg-[#1E214E] p-4 rounded-lg max-[650px]:text-lg  max-[650px]:py-4'>
                            {(timeLeft.seconds ?? 0).toString().padStart(2, '0')} <span className='text-xs font-normal'>Seconds</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
