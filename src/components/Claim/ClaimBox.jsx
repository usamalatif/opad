import React, { useEffect, useState } from 'react';
import { useTranslation } from '../../context/TranslationContext';
import { useAccount, useWriteContract } from 'wagmi';
import functionAbi from '../../Abi/abi.json';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import { useWallet } from '../../context/WalletContext';
import { presaleContractAddress } from '../../services/config';

const ClaimBox = ({ number, month, day, year, time, status, percentage, vestingNumber, start_date, default_values, claimActiveVal, hasClaimed, refetchHasClaimed }) => {
    console.log("default_values", default_values)
    console.log("hasClaimed", hasClaimed)
    console.log("claimActiveVal", claimActiveVal)

    const { t } = useTranslation();
    const { isConnected, address } = useAccount();
    const { checkSignature, setCheckSignature } = useWallet();
    const { data: claimData, hash, isPending, error, writeContractAsync } = useWriteContract();

    const [isClaimable, setIsClaimable] = useState(false);

    //Claim Function
    /**
 * Handles the token claim process for the user.
 * 
 * - Checks if the wallet is connected and if the signature is verified.
 * - Initializes the Ethereum provider and checks for connected accounts.
 * - Requests account access if no accounts are found.
 * - Retrieves the signer and initializes the presale contract.
 * - Calls the `claimTokens` function with the selected vesting number.
 * - Displays a toast notification while waiting for the transaction confirmation.
 * - Once confirmed, it updates the claim status and shows a success message.
 * - Handles errors, including user transaction rejection and other possible failures.
 */
    const handleClaim = async () => {

        if (!isConnected && !checkSignature) {
            toast.error('Wallet is not Connected')
            // alert('Wallet is not Connected')
            console.log('Wallet is not Connected')
            return;
        }
        try {
            console.log("vestingNumber To Claim", vestingNumber);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.send('eth_accounts', []);
            if (accounts.length === 0) {
                await provider.send('eth_requestAccounts', []);
            }
            const signer = provider.getSigner();
            // const ClaimContract = new ethers.Contract('0xb1017d7E100599428531A944e28422089b019049', functionAbi, signer);
            const ClaimContract = new ethers.Contract(presaleContractAddress, functionAbi, signer);
            const ClaimTx = await ClaimContract.claimTokens(vestingNumber);
            toast.info('Waiting for Claim...', { autoClose: false });
            await ClaimTx.wait();
            toast.dismiss();
            refetchHasClaimed()
            toast.success('Claim successful!', { autoClose: 2000 });
        } catch (error) {
            toast.dismiss();
            // Dismiss any pending toasts
            if (error.code === 'ACTION_REJECTED') { // User denied transaction in MetaMask
                toast.error('Transaction cancelled by user.', { autoClose: 2000 });
            } else {
                toast.error(error?.response?.data?.message, { autoClose: 2000 });
            }
            // toast.error('An error occurred during the Claim');
            console.error('An error occurred during the Claim', error);

            // if (error) { // User denied transaction in MetaMask
            //     toast.error('Claim cancelled by user.', { autoClose: 3000 });
            // } else {
            //     toast.error('An error occurred during the Claim.', { autoClose: 3000 });
            // }
        }
    };

    useEffect(() => {
        // Convert the API date and time to a Date object
        const vestingDate = new Date(start_date);
        const currentDate = new Date();
        console.log("currentDate,vestingDate", currentDate, "", start_date)
        // console.log("vestingDate", vestingDate)

        // Compare current date with vesting date
        if (currentDate >= vestingDate) {
            console.log("Claim is allowed: true");
            setIsClaimable(true);
        } else {
            console.log("Claim is allowed: false");
            setIsClaimable(false);
        }
    }, [month, day, year, time]);

    return (
        <div className={`${status ? 'overflow-hidden rounded-[35px]' : 'overflow-hidden'}`}>
            <div className={`bg-[#05063B] text-center p-[10px] rounded-xl ${status ? 'box rounded-[35px]' : 'rounded-xl overflow-hidden'}`}>
                <div className={`box-inner ${status ? 'bg-[#05063B] p-[10px] rounded-[35px]' : ''}`} style={{ position: 'relative', zIndex: '999' }}>
                    <h5 className='text-[20px] font-bold font-["Inter"] pb-3 uppercase'>{t('VESTING')} {number}</h5>

                    <div className='Gradientbg-clr-2 overflow-hidden rounded-lg w-fit p-[1px] text-[20px] font-bold font-["Mona-Sans"] mx-auto'>
                        <div className='bg-4 rounded-lg p-1 text-[14px] font-bold font-["Mona-Sans"]'>
                            <strong className='gradient-text font-bold'>{t('Start_date')}:</strong> {month} {day}, {year} {time}
                        </div>
                    </div>

                    <h6 className='gradient-text text-[18px] font-bold leading-6 py-3'>{t('Claim')} {percentage} {t('Claim_allocation')}</h6>
                    {/* {default_values ? */}
                    {/* // {!default_values ? */}
                    {/* // <button
                        //     onClick={handleClaim}
                        //     disabled={hasClaimed}
                        //     className={`themeBtnWhite-secondary uppercase ${!hasClaimed ? 'cursor-pointer' : '!bg-gray-500 cursor-not-allowed'}`}
                        // >
                        //     {t('claim_coin')}
                        // </button> */}
                    <button
                        onClick={handleClaim}
                        disabled={!claimActiveVal || hasClaimed}
                        className={`themeBtnWhite-secondary uppercase ${(claimActiveVal && hasClaimed == false) ? 'cursor-pointer' : '!bg-gray-500 cursor-not-allowed'}`}
                    >
                        {t('claim_coin')}
                    </button>
                    {/* :
                        <button
                            onClick={handleClaim}
                            disabled={!isClaimable}
                            className={`themeBtnWhite-secondary uppercase ${isClaimable ? 'cursor-pointer' : '!bg-gray-500 cursor-not-allowed'}`}
                        >
                            {t('claim_coin')}
                        </button> */}
                    {/* // } */}
                </div>
            </div>
        </div>
    );
};

export default ClaimBox;
