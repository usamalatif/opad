import React, { useEffect, useState } from 'react';
import ClaimBox from './ClaimBox';
import ConnectButton from '../../web3/ConnectButton';
import { userViewVestings } from '../../utils/Api';
import { useTranslation } from '../../context/TranslationContext';
import { presaleContractAddress } from '../../services/config';
import { useAccount, useReadContract } from 'wagmi';
import functionAbi from '../../Abi/abi.json'
import ConnectButton2 from '../../web3/ConnectButton2';

const Claim = () => {
    const { t } = useTranslation();
    const { address } = useAccount();
    const [vestings, setVestings] = useState([]);

    useEffect(() => {
        const fetchVestings = async () => {
            try {
                const response = await userViewVestings();
                console.log('Vesting data in Claim', response.data);
                if (response.status === 200) {
                    setVestings(response.data);
                }
            } catch (error) {
                console.error('Error fetching vestings', error);
            }
        };

        fetchVestings();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const month = date.toLocaleString('en-US', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();

        let time = date.getTime()
        console.log("time", time)
        let hours = date.getHours(); // Get local hours
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight (0 hours)

        // Directly pass these values as obtained
        return { month, day, year, time: `${hours}:${minutes} ${ampm}` };
    };

    //Check claim is active
    const { data: claimActiveVal } = useReadContract({
        address: presaleContractAddress,
        abi: functionAbi,
        functionName: 'claimActive',
        // args: [1],
        // watch: true,
    });
    console.log("claimActiveVal", claimActiveVal)
    const claimStaticArray = [true, false, false, false, false];

    ////////////////// hasClaimed ////////////////////////
    //Check is claim is done or not
    const { data: hasClaimed1, refetch: refetchHasClaimed1 } = useReadContract({
        address: presaleContractAddress,
        abi: functionAbi,
        functionName: 'hasClaimed',
        args: [address, 0],
        watch: true,
    });
    const { data: hasClaimed2, refetch: refetchHasClaimed2 } = useReadContract({
        address: presaleContractAddress,
        abi: functionAbi,
        functionName: 'hasClaimed',
        args: [address, 1],
        watch: true,
    });
    const { data: hasClaimed3, refetch: refetchHasClaimed3 } = useReadContract({
        address: presaleContractAddress,
        abi: functionAbi,
        functionName: 'hasClaimed',
        args: [address, 2],
        watch: true,
    });
    const { data: hasClaimed4, refetch: refetchHasClaimed4 } = useReadContract({
        address: presaleContractAddress,
        abi: functionAbi,
        functionName: 'hasClaimed',
        args: [address, 3],
        watch: true,
    });
    const { data: hasClaimed5, refetch: refetchHasClaimed5 } = useReadContract({
        address: presaleContractAddress,
        abi: functionAbi,
        functionName: 'hasClaimed',
        args: [address, 4],
        watch: true,
    });

    console.log("hasClaimesssss", hasClaimed1, hasClaimed2, hasClaimed3, hasClaimed4, hasClaimed5)
    ////////////////// hasClaimed ////////////////////////

    return (
        <div className='pb-4 px-2'>
            <div className='max-w-[1180px] mx-auto'>
                <h2 className='text-white font-bold text-4xl text-center pt-16 uppercase'>{t('Claim')}</h2>
                <ConnectButton />
                {/* <ConnectButton2 /> */}

                <div className='claim-containter grid grid-cols-5 gap-2'>
                    {vestings.map((vesting, index) => {
                        console.log("vesting", vesting);
                        const { month, day, year, time } = formatDate(vesting.start_date);
                        return (
                            <ClaimBox
                                key={vesting._id}
                                number={["one", "two", "three", "four", "five", "six"][vesting.vesting_number - 1]}
                                vestingNumber={vesting.vesting_number - 1}
                                month={month}
                                day={day}
                                year={year}
                                time={time}
                                status={vesting.status}
                                percentage={vesting.percentage}
                                start_date={vesting.start_date}
                                default_values={vesting.default_values}
                                // claimActiveVal={!claimActiveVal ? claimStaticArray[index] : claimActiveVal}
                                claimActiveVal={claimActiveVal}
                                hasClaimed={
                                    index == 0
                                        ? hasClaimed1
                                        : index == 1
                                            ? hasClaimed2
                                            : index == 2
                                                ? hasClaimed3
                                                : index == 3
                                                    ? hasClaimed4
                                                    : index == 4
                                                        ? hasClaimed5
                                                        : null
                                }
                                refetchHasClaimed={
                                    index == 0
                                        ? refetchHasClaimed1
                                        : index == 1
                                            ? refetchHasClaimed2
                                            : index == 2
                                                ? refetchHasClaimed3
                                                : index == 3
                                                    ? refetchHasClaimed4
                                                    : index == 4
                                                        ? refetchHasClaimed5
                                                        : null
                                }
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Claim;
