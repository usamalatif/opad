import axios from "axios";
import { toast } from 'react-toastify';
import { useDisconnect } from "wagmi";
import SecureLS from 'secure-ls';
// Initialize SecureLS
const ls = new SecureLS({ encodingType: 'aes' });

export const handleSignUp = async (address, signature) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API}user/signup`, {
            wallet_address: address,
            signature: signature
        });
        ls.set('userToken', JSON.stringify(signature)); // Save as JSON string
        // toast.success('Wallet Connected', { autoClose: 1000 });
        console.log('Responseeeeeeeee:', response.data);
        return response.data;

    } catch (error) {
        console.error('Error posting wallet address:', error);
        toast.error('Failed to send wallet address.', { autoClose: 1000 });
    }
};


export const userViewPresales = async () => {
    try {
        // const token = localStorage.getItem('userToken');
        const response = await axios.get(`${process.env.REACT_APP_API}user/view-presales`
            // ,
            //      {
            //     headers: {

            //         'x-access-token': token
            //     }
            // }
        );
        return response.data;
    } catch (error) {
        toast.error('Unexpected Error: Unable to get data', { autoClose: 1000 });
        console.error('Unexpected Error: Unable to get data', error);
        throw error;
    }
};


export const userViewVestings = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API}user/view-vestings`, {
            headers: {
                'x-access-token': token
            }
        });
        console.log('userViewVestings', response.data)
        return response.data;
    } catch (error) {
        toast.error('Unexpected Error: Unable to get datas', { autoClose: 1000 });
        console.error('Unexpected Error: Unable to get datas', error);
        throw error;
    }
};


export const userViewData = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}user/view-data`,
        );
        return response.data;
    } catch (error) {
        toast.error('Unexpected Error: Unable to get data', { autoClose: 1000 });
        console.error('Unexpected Error: Unable to get data', error);
        throw error;
    }
};


export const countDown = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}admin/countdown`);
        console.log("countDown", response.data);
        return response.data;
    } catch (error) {
        toast.error('Unexpected Error: Unable to get data', { autoClose: 1000 });
        console.error('Unexpected Error: Unable to get data', error);
        throw error;
    }
};
