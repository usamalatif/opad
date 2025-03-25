import React, { useState, useEffect } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';
import { useWallet } from '../context/WalletContext';
import { handleSignUp } from '../utils/Api';
import { toast } from 'react-toastify';
import SecureLS from 'secure-ls';
import walletIcon from '../assets/icons/Group 810.png';

const ls = new SecureLS({ encodingType: 'aes' });

const ConnectButton2 = () => {
    const [token, setToken] = useState(null);
    const [isSigningMessage, setIsSigningMessage] = useState(false);
    const [signatureError, setSignatureError] = useState(false);

    const { open } = useWeb3Modal();
    const { isConnected, address } = useAccount();
    const { disconnect } = useDisconnect();
    const { signMessageAsync } = useSignMessage();
    const { checkSignature, setCheckSignature } = useWallet();

    const handleDisconnect = (showToast) => {
        disconnect()
        ls.remove('userToken');
        setToken(null);
        setSignatureError(false);
        setCheckSignature(false);
        if (showToast) {
            toast.success('Wallet disconnected successfully');
        }
    };
    const signMessage = async () => {
        if (!isConnected || !address) return;
        if (isSigningMessage) return; // Prevent multiple signing attempts
        setIsSigningMessage(true);
        setSignatureError(false);

        try {
            const message = `Sign this message to verify your wallet: ${address}`;
            const signature = await signMessageAsync({ message });
            
            const response = await handleSignUp(address, signature);
            if (response.status === 401) {
                disconnect();
                setSignatureError(true);
                setCheckSignature(false);
                ls.remove('userToken');
                setToken(null);
                // toast.error('Signature verification failed. Please try connecting again.');
            } else {
                setCheckSignature(true);
                setIsSigningMessage(false);
                ls.set('userToken', JSON.stringify(signature));
                setToken(signature);
                // toast.success('Wallet connected and verified successfully');
            }
        } catch (error) {

            console.error('Error during signature process:', error);
            // setSignatureError(true);
            // setCheckSignature(false);
            handleDisconnect(false)
            setCheckSignature(false);
            setIsSigningMessage(false);


            // toast.error('Failed to verify wallet. Please try again.');
        } finally {
            setCheckSignature(false);
            setIsSigningMessage(false);
        }
    };

    useEffect(() => {
        try {
            const storedToken = ls.get('userToken');
            setToken(storedToken ? JSON.parse(storedToken) : null);
        } catch (error) {
            console.error('Error retrieving token:', error);
            setToken(null);
        }
    }, []);

    useEffect(() => {

        console.log("sare maslay hals")
        if (isConnected && address && !isSigningMessage) {
            setIsSigningMessage(true);
            signMessage();
        }
    }, [isConnected, address]);

    console.log("isconnetec", isConnected, isSigningMessage)

    const handleClick = async () => {
        if (isConnected) {
            handleDisconnect(true);
        } else {
            try {
                //  setIsSigningMessage(true);

                await open();

            } catch (error) {
                setIsSigningMessage(false);
                console.error('Error opening wallet modal:', error);
                toast.error('Failed to open wallet connection. Please try again.');
            }
        }
    };

    const getButtonText = () => {
        if (isSigningMessage) return 'Verifying...';

        if (isConnected && checkSignature && address) {
            return `${address.slice(0, 6)}...${address.slice(-4)}`;
        }
        if (signatureError) return 'Retry';
        if (isConnected && !checkSignature) return "Disconnect and retry"
        return 'Connect Crypto Wallet';
    };

    return (
        <div className='themeBtn-gradient-bg mx-auto mt-4 mb-6'>
            <button
                className='themeBtn-gradient flex items-center gap-2 text-[18px] text-[#232970] uppercase font-bold'
                onClick={handleClick}
                disabled={isSigningMessage}
            >
                <img className='w-[25px]' src={walletIcon} alt="wallet icon" />
                {getButtonText()}
            </button>
        </div>
    );
};

export default ConnectButton2;
