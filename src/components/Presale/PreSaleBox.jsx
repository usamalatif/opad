import React, { useEffect, useState } from 'react';
import IDOIMG from '../../assets/images/invented-img 1.png';
import Vector from '../../assets/icons/Vector.svg';
import { useTranslation } from '../../context/TranslationContext';

import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import functionAbi from '../../Abi/abi.json'
import tokenAbi from "../../Abi/abi2.json"
import { toast } from 'react-toastify';

import { http, createConfig, writeContract } from '@wagmi/core'
import { bscTestnet } from '@wagmi/core/chains'
import { formatUnits, parseUnits } from 'viem';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { useWallet } from '../../context/WalletContext';
import { presaleContractAddress } from '../../services/config';

const PreSaleBox = ({ index, USDIMG, LOGOIMG, IDO, data, contractData, contractRefetch, dataContract, filteredEndponitStatus, purchases, refetchPurchases }) => {
    const { writeContract } = useWriteContract()
    const { writeContractAsync } = useWriteContract()
    const [loading, setLoading] = useState(true);
    // console.log("writeData", writeData)
    //  console.log("contractData", contractData)

    //  console.log("purchases", purchases)

    const { fetchAfterBuy, setFetchAfterBuy } = useWallet();
    const { address } = useAccount();
    const { t } = useTranslation();
    const { checkSignature, setCheckSignature } = useWallet()

    const [preSaleData, setPreSaleData] = useState(data);
    // console.log("dataContract", dataContract)
    const [preSaleContractData, setPreSaleContractData] = useState(dataContract);
    const [ConvertCoinPrice, setConvertCoinPrice] = useState();
    const [usdValue, setUsdValue] = useState('');
    const [oz7Value, setOz7Value] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { isConnected } = useAccount();

    // console.log("preSaleDatadata", preSaleData)
    // console.log("preSaleData", preSaleData.percentage_sold.toString())

    // console.log("preSaleContractData", preSaleContractData)
    // console.log("dataContract", dataContract)
    const contractAddress = presaleContractAddress;
    // Check which Phase is Active 
    const { data: ActiveBox, refetch: refetchActiveBox } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'activePhase',
        watch: true,
    });
    // Check which PreSale Active Status (True or False) 
    const { data: PresaleActive, refetch: refetchPresaleActive } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'presaleActive',
        watch: true,
    });

    // const ActiveBox = preSaleContractData?.[5];
    // console.log("ActiveBox", ActiveBox)
    console.log("PresaleActive", PresaleActive)

    // const ActiveBox = contractData?.[5];
    // console.log("ActiveBox and PresaleActive", ActiveBox, PresaleActive)

    // const [totalToken, settotalToken] = useState(contractData?.[0])
    // Convert Wei to Ether
    // parseUnits('1', tokenDecimals)
    console.log("contractData", contractData)
    const totalToken = Number(contractData?.[0]) / 10 ** 18;
    const tokenPriceGet = (Number(contractData?.[1]) / 10 ** 18);
    // const tokenPrice = tokenPriceGet;
    const tokenPrice = 1 / tokenPriceGet;
    const soldAmount = Number(contractData?.[2]) / 10 ** 18;

    // console.log("totalToken", totalToken)
    // console.log("tokenPriceGet", tokenPriceGet)
    // console.log("tokenPrice", tokenPrice)
    // console.log("soldAmount", soldAmount)
    // const setProgress = ((contractData?.[2] / contractData?.[0]) * 100);

    const setProgress = (Number(contractData?.[2]) / Number(contractData?.[0])) * 100;


    const checkSold = totalToken - soldAmount;
    console.log("checkSold:", checkSold);
    console.log("totalToken:", totalToken);
    console.log("soldAmount:", soldAmount);

    // console.log("setProgress:", setProgress);



    const { data: tokenToUsdc, refetch: refetchTokenToUsdc } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'tokenToUSDC',
        args: ['1000000000000000000', index + 1],
        watch: true,
    });

    // console.log(`1ozf to usdc ${index + 1}`, Number(tokenToUsdc) / 10 ** 6);
    // console.log(`1ozf to usdc ${index + 1}`, ethers.utils.formatUnits(Allowance, decimals));

    // console.log("tokenToUsdc", tokenToUsdc)
    // USDC ADDRESS
    const { data: USDC, refetch: refetchUSDC } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'USDC',
        watch: true,
    });
    // console.log("USDC", USDC)

    // USDC decimals
    const { data: decimals, refetch: refetchDecimals } = useReadContract({
        address: USDC,
        abi: tokenAbi,
        functionName: 'decimals',
        watch: true,
    });


    // Token Address
    const { data: tokenAddress, refetch: refetchTokenAddress } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'token',
        watch: true,
    });

    const { data: tokenDecimals, refetch: refetchTokenDecimals } = useReadContract({
        address: tokenAddress,
        abi: tokenAbi,
        functionName: 'decimals',
        watch: true,
    });

    //  console.log("tokenAddress", tokenAddress)
    //  console.log("tokenDecimals", tokenDecimals)

    // console.log("decimals", decimals)
    // Check Allowance which is already approve
    const { data: Allowance, refetch: refetchAllowance } = useReadContract({
        address: USDC,
        abi: tokenAbi,
        functionName: 'allowance',
        args: [address, contractAddress],
        watch: true,
    });
    const formattedAllowance = Allowance ? ethers.utils.formatUnits(Allowance, decimals) : "0";
    // console.log("Allowance", Allowance)


    // Max purchase
    const { data: max_Purchase_amount, refetch: refetch_Max_Purchase_amount } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'MAX_PURCHASE_AMOUNT',
        watch: true,
    });
    console.log("max_Purchase_amount", max_Purchase_amount)
    // if (totalToken) {
    // const setProgress = parseUnits(totalToken === undefined ? 0 : totalToken, '18')
    // console.log("totalToken", setProgress)
    // }
    // else{
    // }

    // const [totalToken, settotalToken] = useState()
    // const [soldAmount, setsoldAmount] = useState()
    // settotalToken(contractData?[0])
    // setsoldAmount(contractData?[2])

    // const progress = totalToken / soldAmount * 100;
    // console.log("progress",progress)
    // const setProgress = formatUnits(progress, 18)
    // console.log("setProgress", setProgress)

    // Max handle change on the Input Field token to usdc
    const handleOZChange = (e) => {
        let value = e.target.value;
        console.log("value", value)
        // Allow only numbers and up to 4 decimal places
        const regex = /^\d*\.?\d{0,2}$/;
        if (!regex.test(value)) {
            return; // Ignore invalid input
        }

        const numericValue = parseFloat(value);
        console.log("numericValue", numericValue)
        if (isNaN(numericValue)) {
            setUsdValue('');
            setOz7Value('');
            setErrorMessage(t('ERROR_INVALID_INPUT_1'));
        } else if (numericValue < 1) {
            setUsdValue('');
            setOz7Value(value);
            setErrorMessage(t('ERROR_MIN_VALUE'));
        } else if (numericValue > checkSold) {
            setUsdValue('');
            setOz7Value(value);
            setErrorMessage(t('ERROR_MAX_VALUE'));
        } else {
            setOz7Value(value);

            if (filteredEndponitStatus) {
                const calculatedUsdValue = ((preSaleData.coin_price / 1) * numericValue).toFixed(2);
                setUsdValue(calculatedUsdValue);
                setErrorMessage('');
            } else {
                const calculatedUsdValue = ((tokenPrice / 1) * numericValue).toFixed(2);
                setUsdValue(calculatedUsdValue);
                setErrorMessage('');
            }
        }
    };

    // Max handle change on the Input Field usdc to token
    const handleUsdChange = (e) => {
        let value = e.target.value;

        // Allow only numbers and up to 4 decimal places
        const regex = /^\d*\.?\d{0,2}$/;
        if (!regex.test(value)) {
            return; // Ignore input that doesn't match the pattern
        }

        const numericValue = parseFloat(value);
        const MaxPurchaseUser = Number(max_Purchase_amount) / 10 ** 18;
        const purchase = Number(purchases?.[2]) / 10 ** 18;
        // const MaxPurchaseUser = Number(max_Purchase_amount) / 10 ** 6;
        // const purchase = Number(purchases?.[2]) / 10 ** 6;
        const remainingBlc = MaxPurchaseUser - purchase;

        if (isNaN(numericValue)) {
            setUsdValue('');
            setOz7Value('');
            setErrorMessage(t('ERROR_INVALID_INPUT_1'));
        } else if (numericValue < 1) {
            setUsdValue(value);
            setOz7Value('');
            setErrorMessage(t('ERROR_MIN_VALUE'));
        } else if (numericValue > remainingBlc) {
            setUsdValue(value);
            setOz7Value('');
            setErrorMessage(t('ERROR_MAX_VALUE'));
        } else {
            setUsdValue(value);
            if (filteredEndponitStatus) {
                const calculatedOz7Value = ((1 / preSaleData.coin_price) * numericValue).toFixed(2);
                setOz7Value(calculatedOz7Value);
                setErrorMessage('');
            } else {
                const calculatedOz7Value = (numericValue / tokenPrice).toFixed(2);
                setOz7Value(calculatedOz7Value);
                setErrorMessage('');
            }
        }
    };



    // const MaxPurchaseUser = Number(max_Purchase_amount) / 10 ** 6;
    // const purchase = Number(purchases?.[2]) / 10 ** 6;
    const MaxPurchaseUser = Number(max_Purchase_amount) / 10 ** 18;
    const purchase = Number(purchases?.[2]) / 10 ** 18;
    const remainingBlc = MaxPurchaseUser - purchase;



    // setUsdValue();
    const RemainingUSDCBLC = checkSold * tokenPrice
    // console.log("RemainingUSDCBLC", RemainingUSDCBLC)

    const sendUSDCMAX = RemainingUSDCBLC >= remainingBlc ? remainingBlc : RemainingUSDCBLC;
    // console.log("sendUSDCMAX", sendUSDCMAX);

    // Max limit for connect wallet
    const maxValueSet = () => {
        if (!isConnected && !checkSignature) {
            toast.error('Wallet is not Connected')
            return;
        }
        // 
        // const checkSoldUsdc = checkSold * tokenPrice;
        // console.log("checkSoldUsdc",checkSoldUsdc)
        // if (checkSold) {

        // }

        setUsdValue(sendUSDCMAX.toString());

        const TokenPricePass = filteredEndponitStatus === false ? tokenPrice : preSaleData.coin_price;

        const calculatedOz7Value = ((sendUSDCMAX / TokenPricePass))?.toFixed(2);
        //const calculatedOz7Value = (sendUSDCMAX / TokenPricePass)
        // const calculatedOz7Value = (remainingBlc / TokenPricePass);
        // const calculatedOz7Value = ((1 / TokenPricePass) * sendUSDCMAX);
        // const calculatedOz7Value = ((1 / TokenPricePass) * remainingBlc);
        // const calculatedOz7Value1 = 1 / TokenPricePass;
        setOz7Value(calculatedOz7Value);


        // soldAmount
        // totalToken


        // Call the logic twice
        // for (let i = 0; i < 2; i++) {
        //     const toSting = checkSold.toString()
        //     setUsdValue(toSting);

        //     const TokenPricePass = filteredEndponitStatus === false ? tokenPrice : preSaleData.coin_price

        //     const calculatedOz7Value = ((1 / TokenPricePass) * checkSold);
        //     const calculatedOz7Value1 = 1 / TokenPricePass;
        //     setOz7Value(calculatedOz7Value);
        //     console.log("oz7Valuevvv", calculatedOz7Value);
        //     console.log("oz7Value1", calculatedOz7Value1 * checkSold);
        //     console.log("oz7Value1 checkSold", toSting);
        // }

        // // Clear error message after the updates
        // setErrorMessage('');
    };
    // balanceOf
    const { data: balanceOf } = useReadContract({
        address: USDC,
        abi: tokenAbi,
        functionName: 'balanceOf',
        args: [address],
        watch: true,
    });
    // endDate of presale phase
    const { data: endDate, refetch: refetchEndDate } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'endDate',
        watch: true,
    });

    //console.log("balanceOf", balanceOf)
    console.log("endDate", endDate)





    const [isPast, setIsPast] = useState(false);
    const [formattedTime, setFormattedTime] = useState("");

    useEffect(() => {
        if (!endDate) return;

        const convertedDate = new Date(Number(endDate) * 1000);
        setFormattedTime(convertedDate.toLocaleString());
        console.log("convertedDate", convertedDate)

        // Get current time
        const currentTime = new Date();

        // Compare
        setIsPast(convertedDate < currentTime);
        console.log("isPast", isPast)
    }, [endDate, isPast]); // Add `endDate` to the dependency array



    // const RemainingUSDCBLC = checkSold * tokenPrice
    // console.log("RemainingUSDCBLC", RemainingUSDCBLC)

    // Buy function first run the approval call and then Buy call
    const handleBuy = async () => {
        const RemainingUSDCBLC = checkSold * tokenPrice
        //  console.log("RemainingUSDCBLC", RemainingUSDCBLC)

        if (!isConnected && !checkSignature) {
            toast.error('Wallet is not Connected')
            return;
        }
        // if (endDate === 0 || endDate === '0') {
        if (isPast) {
            toast.error('Phase Time Ended')
            return;
        }
        // else{
        //     toast.error('Phase Time Ended')
        //     return;
        // }

        // else if (RemainingUSDCBLC >= 10000) {
        //     toast.error('Wallet Limit Exceed')
        //     return;
        // }
        setLoading(false)
        const amountInWeiApprove = parseUnits(usdValue, decimals)
        const amountInWeiBuy = parseUnits(usdValue, decimals)
        //console.log("Presale Clicked", amountInWeiApprove, preSaleData.stage_number - 1)
        // console.log("Presale Clicked", amountInWeiBuy, preSaleData.stage_number - 1)
        try {
            setLoading(true)

            if (usdValue === checkSold) {
                toast.error('Maximum Amount Reach for this Phase', { autoClose: 3000 });
            }

            if (usdValue >= 1 && usdValue <= sendUSDCMAX) {
                // if (usdValue >= 1 && usdValue <= checkSold) {

                ////////////////////////////////////
                // const amountInWei = parseUnits(usdValue, 18);

                // Create an ethers provider
                const provider = new ethers.providers.Web3Provider(window.ethereum);

                const network = await provider.getNetwork();
                // console.log("network.chainId", network.chainId);
                // await provider.send('eth_requestAccounts',[]);
                const accounts = await provider.send('eth_accounts', []);
                // console.log("account Length", accounts)
                if (accounts.length === 0) {
                    await provider.send('eth_requestAccounts', []);
                }


                // Get the signer
                const signer = provider.getSigner();

                // Create contract instances
                // console.log("USDC Click", USDC)
                const approveContract = new ethers.Contract(USDC, tokenAbi, signer);
                // const approveContract = new ethers.Contract('0x5E1c50eEDF58d410B9402753855713A66e5F7003', tokenAbi, signer);
                const buyTierContract = new ethers.Contract(presaleContractAddress, functionAbi, signer);
                // const buyTierContract = new ethers.Contract('0xb1017d7E100599428531A944e28422089b019049', functionAbi, signer);




                // Show waiting toast

                // Approve tokens
                // console.log("new check", Allowance - amountInWeiApprove)

                // if (setProgress <= 50) {
                //     toast.error('Total Sold Has Been Reach', { autoClose: 3000 });
                // }


                if (balanceOf >= amountInWeiApprove && soldAmount < totalToken) {
                    setLoading(false)


                    if (Allowance >= amountInWeiApprove) {
                        // Buy tokens
                        const buyTierTx = await buyTierContract.buyTokensUSDC(amountInWeiApprove);
                        // const buyTierTx = await buyTierContract.buyTokensUSDC(amountInWei, preSaleData.stage_number - 1);
                        toast.info('Waiting for Transaction...', { autoClose: false });
                        await buyTierTx.wait(); // Wait for buyTokensUSDT to complete
                        toast.dismiss(); // Dismiss all toasts (or you can use toast.dismiss('waiting-toast-id') if you want to target a specific toast)
                        toast.success('Transaction successful!', { autoClose: 3000 });

                        setOz7Value('')
                        setUsdValue('')

                        setFetchAfterBuy(true)
                        // Re-fetch the contract data after successful transaction
                        contractRefetch();
                        setLoading(true)
                    }

                    else if (Allowance < amountInWeiApprove) {
                        const ValueSend = amountInWeiApprove + Allowance;
                        //  console.log('ValueSend', ValueSend)
                        const approveTx = await approveContract.approve(presaleContractAddress, ValueSend);
                        // const approveTx = await approveContract.approve("0xb1017d7E100599428531A944e28422089b019049", ValueSend);
                        toast.info('Waiting for approval...', { autoClose: false });
                        await approveTx.wait(); // Wait for approval to complete

                        toast.dismiss(); // Dismiss all toasts (or you can use toast.dismiss('waiting-toast-id') if you want to target a specific toast)
                        toast.success('Approval successful!', { autoClose: 3000 });

                        // Buy tokens
                        const buyTierTx = await buyTierContract.buyTokensUSDC(ValueSend);
                        // const buyTierTx = await buyTierContract.buyTokensUSDC(amountInWei, preSaleData.stage_number - 1);
                        toast.info('Waiting for Transaction...', { autoClose: false });
                        await buyTierTx.wait(); // Wait for buyTokensUSDT to complete
                        toast.dismiss(); // Dismiss all toasts (or you can use toast.dismiss('waiting-toast-id') if you want to target a specific toast)
                        toast.success('Transaction successful!', { autoClose: 3000 });

                        setOz7Value('')
                        setUsdValue('')

                        setFetchAfterBuy(true)
                        // Re-fetch the contract data after successful transaction
                        contractRefetch();
                        setLoading(true)
                    }

                } else {
                    setLoading(false); // Disable the button
                    setTimeout(() => setLoading(true), 3000);
                    toast.error('You Dont have Enough Balance', { autoClose: 3000 })
                }

            }
            refetchAllowance();
            refetchPurchases()
            refetch_Max_Purchase_amount()
        } catch (error) {
            toast.dismiss();
            setOz7Value('')
            setUsdValue('')
            // Dismiss any pending toasts
            //  console.log("errorerror", error)
            refetchAllowance();
            refetchPurchases()
            refetch_Max_Purchase_amount()
            if (error.code === 'ACTION_REJECTED') { // User denied transaction in MetaMask
                toast.error('Transaction cancelled by user.', { autoClose: 3000 });
                setLoading(true)
            } else {
                toast.error('An unexpected error occurred during purchase.', { autoClose: 3000 });
                setLoading(true)
            }
        }
    };

    // const handleKeyDown = (e) => {
    //     if (e.key === ',') {
    //         e.preventDefault();
    //     }
    // };
    const handleKeyDown = (event) => {
        if (event.key === '-' || event.key === '+') {
            event.preventDefault();
        }
    };
    useEffect(() => {
        setPreSaleContractData(dataContract)
    }, [contractData, oz7Value, usdValue, loading, purchases])
    // }, [preSaleContractData])

    const handleBuyIDO = null;





    return (
        <div className=
            {filteredEndponitStatus === false
                // ? `first ${ActiveBox === index + 1 && !PresaleActive ? 'overflow-hidden rounded-[60px]' : 'overflow-hidden'}`
                ? `first ${ActiveBox === index + 1 && PresaleActive ? 'overflow-hidden rounded-[60px]' : 'overflow-hidden'}`
                : `second ${preSaleData.status === true ? 'overflow-hidden rounded-[60px]' : 'overflow-hidden'}`
            }
        // {`${ActiveBox === true ? 'overflow-hidden rounded-[60px]' : 'overflow-hidden'}`}
        >
            <div className=
                {filteredEndponitStatus === false
                    // ? `h-full first ${ActiveBox === index + 1 && !PresaleActive ? 'box rounded-xl' : 'rounded-xl overflow-hidden'}`
                    ? `h-full first ${ActiveBox === index + 1 && PresaleActive ? 'box rounded-xl' : 'rounded-xl overflow-hidden'}`
                    : `h-full second ${preSaleData.status === true ? 'box rounded-xl' : 'rounded-xl overflow-hidden'}`
                }
            // {`h-full 
            // ${ActiveBox === true ? 'box rounded-xl' : 'rounded-xl overflow-hidden'}`
            // }
            >
                <div className=
                    {filteredEndponitStatus === false
                        // ? `h-full cardBox flex flex-col justify-between  ${ActiveBox === index + 1 && !PresaleActive ? 'rounded-[60px]' : ''}`
                        ? `h-full cardBox flex flex-col justify-between  ${ActiveBox === index + 1 && PresaleActive ? 'rounded-[60px]' : ''}`
                        : `h-full cardBox flex flex-col justify-between  ${preSaleData.status === true ? 'rounded-[60px]' : ''}`
                    }
                // {`h-full cardBox flex flex-col justify-between ${ActiveBox === true ? 'rounded-[60px]' : ''}`}
                >
                    <div class="h-full box-inner p-6 flex flex-col justify-between gap-2">


                        <div className=''>
                            {!IDO ? (
                                <>
                                    <span className='Gradientbg-clr rounded p-1 text-[#0E0538] text-[10px] font-bold uppercase'>
                                        {t(`STAGE ${preSaleData.stage_number}`)} {/* Translation for stage */}
                                    </span>
                                    <h4 className='text-[#ffffff] text-[22px] font-bold py-1 uppercase'>{t('PRESALE_TITLE')}</h4>
                                </>
                            ) : (
                                <>
                                    <h3 className='gradient-text font-["Inter"] font-bold text-[30px]'>{t('HERO_TITLE')}</h3>
                                </>
                            )}
                            {!IDO && (
                                // <div className='progress-box pt-[5px] pb-[15px] px-[15px] mb-3'>
                                //     <div className='relative z-[10]'>
                                //         <label htmlFor="" className='text-[12px]'>{t('PROGRESS_LABEL')} ({preSaleData.percentage_sold}%)</label>
                                //         <div className={`progress-bar relative after:w-[${preSaleData.percentage_sold.toString()}%]`} />
                                //     </div>
                                // </div>
                                <div className='progress-box pt-[5px] pb-[15px] px-[15px] mb-3'>
                                    <div className='relative z-[10]'>
                                        <label htmlFor="" className='text-[12px]'>{t('PROGRESS_LABEL')}
                                            ({setProgress.toFixed(2)}%)
                                            {/* ({preSaleData.percentage_sold === 0 ? setProgress : preSaleData.percentage_sold}%) */}
                                        </label>
                                        <div
                                            className='progress-bar relative'
                                            style={{ '--progress-width': setProgress.toString() + '%' }}
                                        // style={{ '--progress-width': preSaleData.percentage_sold.toString() + '%' }}
                                        // style={{
                                        //     '--progress-width': preSaleData.percentage_sold === 0
                                        //         ? preSaleData.percentage_sold.toString() + '%'
                                        //         : setProgress.toString() + '%'
                                        // }}
                                        />
                                    </div>
                                </div>

                            )}

                            <div>
                                <h5 className='text-[13px] font-["Inter"] font-semibold'>Coin Name: <span className='primary-txt-clr'>{preSaleData.coin_name}</span></h5>
                                <h5 className='text-[13px] font-["Inter"] font-semibold'>Coin Price:
                                    <span className='primary-txt-clr'>
                                        {/* <> 1 OZ7 = ${preSaleData.coin_price}</> */}
                                        {filteredEndponitStatus === false && !IDO
                                            ? <> 1 OZ7 = ${tokenPrice.toFixed(4)}</>
                                            // ? <> 1 OZ7 = ${tokenPrice.toFixed(3)}</>
                                            : <> 1 OZ7 = ${preSaleData.coin_price}</>
                                        }
                                    </span>
                                </h5>

                                {IDO ?
                                    <h5 className='text-[13px] font-["Inter"] font-semibold'>Public Sale: <span className='primary-txt-clr'>BEP 20 Blockchain</span></h5>
                                    :
                                    <h5 className='text-[13px] font-["Inter"] font-semibold'>Presale: <span className='primary-txt-clr'>BEP 20 Blockchain</span></h5>
                                }
                                {!IDO &&
                                    <h5 className='text-[13px] font-["Inter"] font-semibold'>Total Allocation: <span className='primary-txt-clr'>{totalToken}</span></h5>
                                }
                            </div>
                            {IDO && (
                                <div className='flex justify-center mt-5'>
                                    <img src={IDOIMG} alt="" />
                                </div>
                            )}
                            {!IDO && (
                                <>
                                    <div className='grid grid-cols-2 gap-3 items-end mt-[18px]'>
                                        <div>
                                            <div className='flex justify-between items-end text-wrap'>
                                                <label htmlFor="" className='text-[10px] font-semibold text-wrap'>{t('USD_LABEL')}</label>
                                                <span className='text-[8px] font-semibold cursor-pointer' onClick={() => maxValueSet()}>{t('MAX_LABEL')}</span>
                                            </div>
                                            <div className='Gradientbg-clr-2 Gradientbg-shadow-box rounded-lg mt-[3px]'>
                                                <div className='flex justify-between items-center border-1 bg-[#311E72] rounded-lg p-1'>
                                                    <input
                                                        type="number"
                                                        inputMode="decimal"
                                                        value={usdValue}
                                                        onChange={handleUsdChange}
                                                        onKeyDown={handleKeyDown}
                                                        min="1"
                                                        max="100000"
                                                        className='bg-transparent focus:outline-none'
                                                        style={{ width: 'calc(100% - 30px)' }}
                                                    />
                                                    <img src={USDIMG} className='flex w-[30px] h-[30px]' alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='flex justify-between items-center'>
                                                <label htmlFor="" className='text-[10px] font-semibold'>{t('OZ7_LABEL')}</label>
                                            </div>
                                            <div className='Gradientbg-clr-2 Gradientbg-shadow-box rounded-lg mt-[3px]'>
                                                <div className='flex justify-between items-center border-1 bg-[#311E72] rounded-lg p-1'>
                                                    <input
                                                        type="number"
                                                        inputMode="decimal"
                                                        value={oz7Value}
                                                        onChange={handleOZChange}
                                                        onKeyDown={handleKeyDown}  // Prevent comma input
                                                        className='bg-transparent focus:outline-none'
                                                        style={{ width: 'calc(100% - 30px)' }}
                                                    />
                                                    <img src={LOGOIMG} className='flex w-[30px] h-[30px]' alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {errorMessage && (
                                        <p className='text-red-500 text-xs mt-1 mb-[10px] focus:text-red-500'>{errorMessage}</p>
                                    )}
                                </>
                            )}
                        </div>

                        {IDO ? (
                            <Link to="https://optimusz7.gitbook.io/litepaper/presale/ido" target='_blank' className={`themeBtn-secondary uppercase ${!preSaleData.status ? 'cursor-not-allowed !bg-gray-700' : ''}`} >IDO LAUNCH PAD</Link>
                        ) : (
                            <button
                                className={filteredEndponitStatus === false
                                    ? `themeBtn-secondary uppercase ${(ActiveBox !== index + 1 || !PresaleActive) || !loading === true || isPast ? 'cursor-not-allowed !bg-gray-700' : ''}`
                                    : `themeBtn-secondary uppercase ${!preSaleData.status === true ? 'cursor-not-allowed !bg-gray-700' : ''}`
                                }
                                // className={`themeBtn-secondary uppercase ${ActiveBox !== index + 1 ? 'cursor-not-allowed !bg-gray-700' : ''}`}
                                // disabled={(ActiveBox !== index + 1 || !PresaleActive) || !loading || setProgress >= 100 || endDate === 0 || endDate === '0'} onClick={!IDO ? handleBuy : handleBuyIDO}>
                                disabled={(ActiveBox !== index + 1 || !PresaleActive) || !loading || setProgress >= 100 || isPast} onClick={!IDO ? handleBuy : handleBuyIDO}>
                                {/* {!loading ? `Buying...` : `BUY OZ7 COIN`} */}

                                {setProgress == 100 ? 'All Tokens Sold' : 'BUY OZ7 COIN'}
                            </button>
                        )
                        }
                    </div>
                </div>
            </div >
        </div>
    );
};

export default PreSaleBox;