import { useAccount, useReadContract } from "wagmi";
import functionAbi from '../Abi/abi.json';
import { presaleContractAddress } from "../services/config";

const contractAddress = presaleContractAddress;

export function useFetchTiers() {
    const { data: phase1Data } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'presalePhases',
        args: [1],
        watch: true,
    });

    const { data: phase2Data } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'presalePhases',
        args: [2],
        watch: true,
    });

    const { data: phase3Data } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'presalePhases',
        args: [3],
        watch: true,
    });

    const { data: phase4Data } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'presalePhases',
        args: [4],
        watch: true,
    });

    const { data: phase5Data } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'presalePhases',
        args: [5],
        watch: true,
    });

    // Combine the data into a single object
    // const PreSaleCombinedData = [
    //     phase1Data,
    //     phase2Data,
    //     phase3Data,
    //     phase4Data,
    //     phase5Data,
    // ];

    // console.log('new ne', PreSaleCombinedData)

    return {
        phase1Data,
        phase2Data,
        phase3Data,
        phase4Data,
        phase5Data,
    };
}



export function FetchOZ7() {

    // Separate useReadContract calls for each phase
    const { data: oz7Amount1 } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'presalePhases',
        args: [0],
        watch: true,
    });

    const { data: oz7Amount2 } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'presalePhases',
        args: [1],
        watch: true,
    });

    const { data: oz7Amount3 } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'presalePhases',
        args: [2],
        watch: true,
    });

    const { data: oz7Amount4 } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'presalePhases',
        args: [3],
        watch: true,
    });

    const { data: oz7Amount5 } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'presalePhases',
        args: [4],
        watch: true,
    });


    return {
        oz7Amount1,
        oz7Amount2,
        oz7Amount3,
        oz7Amount4,
        oz7Amount5,
    };
}


export function UserPurchase() {
    const { address } = useAccount();

    const { data: purchases1, refetch: refetchPurchases1 } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'purchases',
        args: [address, 1],
        watch: true,
    });

    const { data: purchases2, refetch: refetchPurchases2 } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'purchases',
        args: [address, 2],
        watch: true,
    });

    const { data: purchases3, refetch: refetchPurchases3 } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'purchases',
        args: [address, 3],
        watch: true,
    });

    const { data: purchases4, refetch: refetchPurchases4 } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'purchases',
        args: [address, 4],
        watch: true,
    });

    const { data: purchases5, refetch: refetchPurchases5 } = useReadContract({
        address: contractAddress,
        abi: functionAbi,
        functionName: 'purchases',
        args: [address, 5],
        watch: true,
    });


    return {
        purchases1,
        purchases2,
        purchases3,
        purchases4,
        purchases5,
        refetchPurchases1,
        refetchPurchases2,
        refetchPurchases3,
        refetchPurchases4,
        refetchPurchases5,
    };
}