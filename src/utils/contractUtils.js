// import { ethers } from 'ethers';
// import contractABI from '../Abi/abi.json';

// const contractAddress = '0x76399c8A5027fD58A1D1b07500ccC8a223BEE0c3';
// console.log("ethersssss",ethers.utils);

// export async function buyTokensUSDC(amount, phase, provider) {
//     // if (!provider) {
//     //     console.error('No provider found');
//     //     return;
//     // }

//     try {
//         const signer = provider.getSigner();
//         const contract = new ethers.Contract(contractAddress, contractABI, signer);

//         const amountInWei = ethers.utils.parseUnits(amount.toString(), 18); // Ensure 'ethers.utils' is correct
//         const tx = await contract.buyTokensUSDC(amountInWei, phase);
//         await tx.wait();

//         console.log('Transaction successful:', tx);
//     } catch (error) {
//         console.error('Error buying tokens:', error);
//     }
// }
