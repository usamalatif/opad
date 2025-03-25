import React from 'react';
import { useTranslation } from '../../context/TranslationContext';
import AdminPanel from '../AdminPanel/AdminPanel';
import Popup from '../Popup/Popup';
// import heroImg from '../../assets/images/imgpsh_fullsize_anim-removebg-preview.png'

const Hero = () => {
    const { t } = useTranslation();

    return (
        <>
        <div className='text-center p-2'>
            {/* <img src={heroImg} alt="" className='mt-[150px] mb-[30px] mx-auto' /> */}
            {/* <img src="../../C4-removebg-preview.png" className='mt-[150px] mb-[30px] mx-auto' alt="" /> */}
            <h1 className='h1 large drop-shadow-lg max-[600px]:!text-[100px] pt-[100px]'>OPAD</h1>
            <p className='text-[#C6CCFF] text-[26px] font-semibold max-w-[1100px] mx-auto max-[600px]:!text-[18px]'>
                {t('HERO_TEXT')}
            </p>

        </div>
            <Popup/>
            {/* <AdminPanel/> */}
            </>
    );
}

export default Hero;
