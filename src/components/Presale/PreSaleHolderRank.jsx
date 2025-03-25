import React, { useEffect, useState } from 'react'
import rank2Img from '../../assets/images/crab.png'
import bgRank from '../../assets/images/Group 956.png'
import { useAccount, useDisconnect, useReadContract } from 'wagmi';
import { userViewVestings } from '../../utils/Api';
import { userViewData as fetchUserViewData } from '../../utils/Api'; // Import the correct function
import { FetchOZ7 } from '../../web3/ContractRead';
import { ethers } from 'ethers';
//////////////////Images Import//////////////////////////////
import shrimpImg from '../../assets/icons/Shrimp.png';
import crabImg from '../../assets/icons/Crab.png';
import octopusImg from '../../assets/icons/Octopus.png';
import fishImg from '../../assets/icons/Fish.png';
import dolphinImg from '../../assets/icons/Dolphin.png';
import orqueImg from '../../assets/icons/orque.png';
import whaleImg from '../../assets/icons/Whale.png';
import microImg from '../../assets/icons/microImg.png';

import { useTranslation } from '../../context/TranslationContext';
import { presaleContractAddress } from '../../services/config';
import { useWallet } from '../../context/WalletContext';

import functionAbi from '../../Abi/abi.json';

//////////////////Images Import//////////////////////////////

const PreSaleHolderRank = () => {
    const { isConnected, address } = useAccount();
    const [vestings, setVestings] = useState([]);
    const { t } = useTranslation();
    const contractAddress = presaleContractAddress;
    const { fetchAfterBuy, setFetchAfterBuy } = useWallet();

    useEffect(() => {
        const fetchVestings = async () => {
            try {
                const response = await userViewVestings();
                console.log('Vesting data in SaleHolderRank:', response.data);
                if (response.status === 200) {
                    setVestings(response.data);
                }
            } catch (error) {
                console.error('Error fetching vestings', error);
            }
        };

        fetchVestings();
    }, []);


    // Separate useReadContract calls for each phase
    //Read Data of total_purchase from contract
    const { data: Total_PurchasedOZ7, refetch: refetchTotalPurchasedOZ7 } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'totalPurchased',
        args: [address],
        watch: true,
    });
    console.log("Total_PurchasedOZ7", Total_PurchasedOZ7)

    useEffect(() => {
        // refetchTotalPurchasedOZ7()
        console.log('fetchAfterBuy', fetchAfterBuy)
    }, [fetchAfterBuy])

    if (fetchAfterBuy) {
        refetchTotalPurchasedOZ7()
    }


    // const [data, setData] = useState(null);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetchUserViewData();
    //             if (response.status === 200) {
    //                 setData(response.data[0]);
    //             } else {
    //                 console.error("Error:", response.message);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching user presales data", error);
    //         }
    //     };
    //     fetchData();
    // }, []);

    // console.log("data Rank",data)


    const { oz7Amount1, oz7Amount2, oz7Amount3, oz7Amount4, oz7Amount5 } = FetchOZ7();
    console.log("oz7Amount1", oz7Amount1)
    // Convert values to Ether using ethers.js
    const ethAmount1 = oz7Amount1 ? ethers.utils.formatEther(oz7Amount1[2]) : 0;
    const ethAmount2 = oz7Amount2 ? ethers.utils.formatEther(oz7Amount2[2]) : 0;
    const ethAmount3 = oz7Amount3 ? ethers.utils.formatEther(oz7Amount3[2]) : 0;
    const ethAmount4 = oz7Amount4 ? ethers.utils.formatEther(oz7Amount4[2]) : 0;
    const ethAmount5 = oz7Amount5 ? ethers.utils.formatEther(oz7Amount5[2]) : 0;

    // Add all Ether values
    // const totalEth = parseFloat(ethAmount1) + parseFloat(ethAmount2) + parseFloat(ethAmount3) + parseFloat(ethAmount4) + parseFloat(ethAmount5);
    // const totalEth = 1;

    const totalEth = Number(Total_PurchasedOZ7) / 10 ** 18;

    console.log("oz7Amount in ETH:", ethAmount1, ethAmount2, ethAmount3, ethAmount4, ethAmount5);
    console.log("Total ETH:", totalEth);

    ///////////////////////////////////////IMG LOGIX/////////////////////////////////////
    //Logic for Rank Change according to the below Numbers 

    let rank = '';
    let rankImg = '';

    // Conditional logic for rank and image selection
    if (totalEth === 0) {
        rank = 'Micro';
        rankImg = microImg;
        // return nul
        // rank = 'zero';
        // rankImg = shrimpImg;
    }
    else if (totalEth >= 1 && totalEth < 10000) {
        rank = 'Shrimp';
        rankImg = shrimpImg;
    }
    else if (totalEth >= 10000 && totalEth < 50000) {
        rank = 'Crab';
        rankImg = crabImg;
    } else if (totalEth >= 50000 && totalEth < 300000) {
        rank = 'Octopus';
        rankImg = octopusImg;
    } else if (totalEth >= 300000 && totalEth < 1000000) {
        rank = 'Fish';
        rankImg = fishImg;
    } else if (totalEth >= 1000000 && totalEth < 3000000) {
        rank = 'Dolphin';
        rankImg = dolphinImg;
    } else if (totalEth >= 3000000 && totalEth < 10000000) {
        rank = 'Orque';
        rankImg = orqueImg;
    } else if (totalEth >= 10000000) {
        rank = 'Whale';
        rankImg = whaleImg;
    }
    ///////////////////////////////////////IMG LOGIX/////////////////////////////////////

    return (
        <div
            className='Gradientbg-shadow-box2 max-w-[1140px] mx-auto mb-6 flex justify-center rounded-lg overflow-hidden max-[600px]:flex-col'
            style={{
                background: `url("${bgRank}") no-repeat`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* <div className='w-[20%] flex flex-col items-center justify-center gap-3 p-5 max-[600px]:w-full'>
                <div className='w-[170px] p-5 checkone rounded-[50%] '>
                    <img className='w-full' src={rank2Img} alt="" />
                </div>
                <h5 className='font-semibold uppercase  text-2xl'>crab</h5>
            </div> */}
            {totalEth >= 0 && (
                <div className='w-[20%] flex flex-col items-center justify-center gap-3 p-5 max-[600px]:w-full'>
                    <div className='w-[170px] p-5 checkone rounded-[50%]'>
                        <img className='w-full' src={rankImg} alt={rank} />
                    </div>
                    <h5 className='font-semibold uppercase text-2xl'>{rank}</h5>
                </div>
            )}

            <div className='w-[80%] p-5 max-[600px]:w-full'>

                <div className='flex gap-3 max-[950px]:flex-col'>
                    {totalEth >= 0 ?
                        <div className='flex items-center gap-2 w-full'>
                            <h5 className='gradient-text font-semibold flex-nowrap text-nowrap'>{t('Total_Purchased')}</h5>
                            <div className='Gradientbg-clr-2 rounded w-full max-w-[200px] p-[1px] text-[16px] font-bold font-["Mona-Sans"] max-[950px]:max-w-full'>
                                <div className='border bg-transparent rounded border-none pl-2 focus:outline-none bg-4 max-[950px]:max-w-full' ><span className='gradient-text'>{totalEth === 0 ? totalEth : totalEth.toFixed(2)} OZ7</span></div>
                            </div>
                        </div>
                        : <></>}

                    <div className='flex items-center gap-2 w-full'>
                        {address ?
                            <>
                                <h5 className='gradient-text font-semibold whitespace-nowrap'>{t('Wallet_Address')}: </h5>
                                <div className='Gradientbg-clr-2 rounded overflow-hidden w-full p-[1px] text-[16px] font-bold font-["Mona-Sans"] max-[950px]:w-full'>
                                    <div className='border bg-transparent rounded border-none pl-2 focus:outline-none bg-4 max-[950px]:w-full' ><span className='gradient-text'>{address}</span></div>
                                </div>
                            </>
                            :
                            <>
                                <h5 className='gradient-text font-semibold'>Wallet is not connected </h5>
                            </>
                        }

                    </div>
                </div>

                <div className='pt-8'>
                    <h4 className='gradient-text font-semibold'>{t('Your_claim')}</h4>

                    <div className='grid grid-cols-5 gap-2 max-[950px]:gap-2 max-[950px]:grid-cols-3 max-[600px]:grid-cols-1 max-[600px]:gap-0'>
                        {vestings.map((vesting, index) => (
                            <div key={index} className='Gradientbg-shadow-box mt-3 bg-[#0b0b3486] p-2 rounded-xl'>
                                <h5 className='gradient-text font-semibold uppercase text-center'>Vesting {index + 1}</h5>
                                <div
                                    className={`flex justify-center items-center uppercase mt-2 text-[#0E0538] font-bold rounded-3xl px-1 py-6 max-[950px]:text-sm max-[600px]:p-2 
        ${vesting.status === "unavailable"
                                            ? "bg-gray-500"
                                            : vesting.status === "available"
                                                ? "bg-[#FFFFFF]"
                                                : vesting.status === "completed"
                                                    ? "bg-[#BBE333]"
                                                    : ""
                                        }`}
                                >
                                    {vesting.status}
                                </div>
                            </div>
                        ))}
                    </div>


                </div>

            </div>

        </div>
    )
}

export default PreSaleHolderRank