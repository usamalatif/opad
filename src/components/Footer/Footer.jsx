// src/components/Footer/Footer.js
import React, { useState } from 'react';
import footerlog from '../../assets/images/Frame 191.png';
import youtube from '../../assets/icons/YouTube.png';
import medium from '../../assets/icons/medium.png';
import Twitter from '../../assets/icons/Twitter.png';
import Telegram from '../../assets/icons/Telegram.png';
import gradientBgFooter from '../../assets/images/gradient-bg.png';
import { useTranslation } from '../../context/TranslationContext';
import LanguageSelector from '../LanguageSelector';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import DisclaimerContent from './DisclaimerContent';
import PrivacyPolicyContent from './PrivacyPolicyContent';

const Footer = () => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    return (
        <div className='py-20 px-8 max-[950px]:px-2 relative'>
            <img src={gradientBgFooter} className='absolute right-0 bottom-0 h-[50%] w-full z-[-1]' alt="" />
            <div className='max-w-[1140px] flex justify-between items-start gap-2 mx-auto max-[600px]:grid max-[600px]:grid-cols-1 max-[600px]:gap-5'>
                <div className='w-[45%] max-[600px]:w-full'>
                    <Link to="/">
                        <img src='../../C4-removebg-preview.png' alt="" className='w-[100px] max-[600px]:mx-auto' />
                    </Link>
                    <p className='text-[#C6CCFF] text-[12px] mt-2 max-[600px]:text-center'>
                        {t('Footer_para')}
                    </p>
                    <div className='flex items-center gap-3 mt-3 ml-1 mb-5 max-[600px]:justify-center'>
                        <Link to='https://medium.com/@OPAD.FUND' target='_blank'><img className='Gradientbg-shadow' src={medium} alt="" /> </Link>
                        <Link to='https://x.com/OpadFund' target='_blank'><img className='Gradientbg-shadow' src={Twitter} alt="" /></Link>
                        <Link to='https://t.me/OptimusZ7' target='_blank'><img className='Gradientbg-shadow' src={Telegram} alt="" /></Link>

                    </div>
                    <p className='text-[#C6CCFF] text-[12px] max-[600px]:text-center'>
                        {t('Right_reserved')}
                    </p>
                </div>

                <div className='w-[55%] mt-[63px] max-[600px]:w-full grid grid-cols-4 gap-5 max-[950px]:grid-cols-2 max-[600px]:grid-cols-1'>
                    <div className='flex flex-col max-[600px]:items-center'>
                        <h5 className='text-[14px] font-semibold mb-2 uppercase'>{t('About Us')}</h5>
                        <Link to='https://opad.gitbook.io/opad' target='_blank' className='texthoverchange text-[14px] text-[#C6CCFF] mb-[12px]'>{t('Whitepaper')}</Link>
                        <Link to='mailto:Contact@Opad.fund' target='_blank' className='texthoverchange text-[14px] text-[#C6CCFF] mb-[12px]'>{t('Contact')}</Link>
                    </div>
                    <div className='flex flex-col max-[600px]:items-center'>
                        <h5 className='text-[14px] font-semibold mb-2 uppercase'>{t('Partners')}</h5>
                        <Link to='https://optimusz7.com/' target='_blank' className='texthoverchange text-[14px] text-[#C6CCFF] mb-[12px]'>{t('OPTIMUSZ7')}</Link>
                        <Link to='https://odex.pro/' target='_blank' className='texthoverchange text-[14px] text-[#C6CCFF] mb-[12px]'>{t('ODex')}</Link>
                        <Link to='https://pondowallet.app/' target='_blank' className='texthoverchange text-[14px] text-[#C6CCFF] mb-[12px]'>{t('DEVELOPERS')}</Link>
                    </div>
                    <div className='flex flex-col max-[600px]:items-center'>
                        <h5 className='text-[14px] font-semibold mb-2 uppercase'>{t('More')}</h5>
                        <Link to="https://wm4el5u7u1v.typeform.com/to/y3Y2LWXw" target='_blank' className='texthoverchange cursor-pointer text-[14px] text-[#C6CCFF] mb-[12px]'>{t('Incubation')}</Link>
                        <div onClick={() => openModal(<PrivacyPolicyContent />)} className='texthoverchange cursor-pointer text-[14px] text-[#C6CCFF] mb-[12px]'>{t('Privacy_Policy')}</div>
                        <div onClick={() => openModal(<DisclaimerContent />)} className='texthoverchange cursor-pointer text-[14px] text-[#C6CCFF] mb-[12px]'>{t('Disclaimer')}</div>
                    </div>
                    <div className='flex flex-col max-[600px]:items-center'>
                        <LanguageSelector />
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} title={modalContent?.props?.title || ''}>
                {modalContent}
            </Modal>
        </div>
    );
};

export default Footer;
