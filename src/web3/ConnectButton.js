import React, { useState, useEffect } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';
import walletIcon from '../assets/icons/Group 810.png';
import { handleSignUp } from '../utils/Api';
import { useWallet } from '../context/WalletContext';
import { toast } from 'react-toastify';
import SecureLS from 'secure-ls';

// Initialize SecureLS
const ls = new SecureLS({ encodingType: 'aes' });

const ConnectButton = () => {
    const [token, setToken] = useState(null);
    const { open } = useWeb3Modal();
    const { isConnected, address } = useAccount();
    const [connectedAddress, setConnectedAddress] = useState('');

    const { checkSignature, setCheckSignature } = useWallet();
    const { disconnect } = useDisconnect();
    const { signMessageAsync } = useSignMessage();

    const handleDisconnect = () => {
        disconnect();
        ls.remove('userToken');
        toast.success('Wallet disconnected successfully');
    };

    const signMessage = async () => {
        try {
            if (token) {
                const handelCheckSign = await handleSignUp(address, token);
                if (handelCheckSign.status === 401) {
                    setCheckSignature(false);
                    ls.remove('userToken');
                } else {
                    setCheckSignature(true);
                }
            } else {
                const message = `Sign this message to verify your wallet: ${address}`;
                const signature = await signMessageAsync({ message });
                const handelCheckSign = await handleSignUp(address, signature);

                if (handelCheckSign.status === 401) {
                    setCheckSignature(false);
                    ls.remove('userToken');
                    setToken(null);
                } else {
                    setCheckSignature(true);
                }
            }
        } catch (error) {
            console.error('Error signing message:', error);
            setCheckSignature(false);
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
        if (isConnected && address) {
            signMessage();
            setConnectedAddress(address);
            setCheckSignature(true);
        } else if (!isConnected) {
            setConnectedAddress('');
            setCheckSignature(false);
            ls.remove('userToken');
        }
    }, [isConnected, address, token]);

    return (
        <div className='themeBtn-gradient-bg mx-auto mt-4 mb-6'>
            <button
                className='themeBtn-gradient flex items-center gap-2 text-[18px] text-[#232970] uppercase font-bold'
                onClick={() => (isConnected ? handleDisconnect() : open())}
            >
                <img className='w-[25px]' src={walletIcon} alt="" />
                {connectedAddress && checkSignature ? (
                    <span>{`${connectedAddress.slice(0, 6)}...${connectedAddress.slice(-4)}`}</span>
                ) : (
                    'connect CRYPTO WALLET'
                )}
            </button>
        </div>
    );
};

export default ConnectButton;
