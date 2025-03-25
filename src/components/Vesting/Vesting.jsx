import React, { useEffect, useState } from 'react'
import circle from '../../assets/images/Ellipse 41.png'
import Svg from './Svg'
import { userViewVestings } from '../../utils/Api';
import { useTranslation } from '../../context/TranslationContext';

const Vesting = () => {
    const { t } = useTranslation();
    const [vestings, setVestings] = useState([]);

    useEffect(() => {
        const fetchVestings = async () => {
            try {
                const response = await userViewVestings();
                console.log('Vesting data', response.data);
                if (response.status === 200) {
                    setVestings(response.data);
                }
            } catch (error) {
                console.error('Error fetching vestings', error);
            }
        };

        fetchVestings();
    }, []);


    return (
        <div className='pt-[80px] pb-[120px] px-2'>
            <div className='max-w-[1100px] mx-auto'>

                <div className='vestinghead relative flex justify-between max-[950px]:flex-col max-[950px]:justify-center max-[950px]:items-center'>
                    <img src={circle} alt="" className='absolute top-[-10px] left-[-20px] z-[-1]' />
                    <h2 className='text-[33px] font-bold max-[600px]:text-[20px]'>{t('vesting_period')}</h2>
                    <p className='text-[#C6CCFF] font-bold text-[18px] pr-[40px] max-[950px]:text-center max-[950px]:pr-[0px] max-[950px]:text-[13px]'>{t('Private_Presale')} <br />{t('Private_PresaleBreak')}</p>
                </div>
                <Svg vestingData={vestings} />

            </div>
        </div>
    )
}

export default Vesting