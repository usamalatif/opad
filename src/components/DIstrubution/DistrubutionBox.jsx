import React from 'react'
import PolarAreaChart from './PolarAreaChart'
import { useTranslation } from '../../context/TranslationContext';
import chartImg from '../../assets/images/crypto template design for twitter (8).png'

const DistrubutionBox = () => {
    const { t } = useTranslation();

    return (
        <div className='distributionbox overflow-hidden flex flex-col items-center  p-[50px] py-[20px] w-full h-[480px] rounded-xl max-[600px]:p-[10px] max-[960px]:h-[100%]'>
            <div>
                <h3 className='text-center font-bold text-[43px] max-[600px]:text-[16px]'>{t('Presale_Distribution')}</h3>
                <h4 className='text-center font-bold text-[30px] max-[600px]:text-[16px]'>190 000 000 OZ7</h4>
            </div>
            {/* <PolarAreaChart /> */}
            <div className='w-full h-[300px] object-cover max-[960px]:h-[100%] '>
                <img src={chartImg} className='w-full h-full' alt="" />
            </div>
        </div>
    )
}

export default DistrubutionBox