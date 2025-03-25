import React from 'react'
import BNDIMG from '../../assets/images/Ellipse 42.png'
import USDCIMG from '../../assets/images/Ellipse 45.png'
// import USDTIMG from '../../../logo.svg'
import { useTranslation } from '../../context/TranslationContext'
import { Link } from 'react-router-dom'


const PreLargeBox = () => {
    const { t } = useTranslation();

    return (
        <div className='cardBoxlarge rounded-xl px-6 py-4'>
            <h2 className='text-[36px] font-bold mb-2 font-["Mona-Sans"] max-[600px]:text-[26px]'>{t('How_to_join')} <br />{t('the_OZ7_Presale')}</h2>
            <span className='text-[20px] text-[#0E0538] font-bold bg-[#B5E61D] px-3 py-1 rounded-lg'>{t('Buy')}</span>
            <div className='py-4'>
                <div className='flex gap-3 items-start mb-3'>
                    <span className='Gradientbg-clr-2 flex items-center justify-center w-[22px] h-[19px] rounded-2xl text-[14px] text-[#0E0538] font-["Inter"] font-bold'>1</span>
                    <h6 className='text-[#C6CCFF] text-[14px] w-[calc(100%+2rem)]'><strong className='text-[#13E2E5]'>{t('Connect_wallet')}:</strong> {t('Connect_wallet_text')}</h6>
                </div>
                <div className='flex gap-3 items-start mb-3'>
                    <span className='Gradientbg-clr-2 flex items-center justify-center w-[22px] h-[19px] rounded-2xl text-[14px] text-[#0E0538] font-["Inter"] font-bold'>2</span>
                    <h6 className='text-[#C6CCFF] text-[14px] w-[calc(100%+2rem)] '><strong className='text-[#13E2E5]'>{t('Select_amount')}:</strong> {t('Select_amount_text')}</h6>
                </div>
                <div className='flex gap-3 items-start mb-3'>
                    <span className='Gradientbg-clr-2 flex items-center justify-center w-[22px] h-[19px] rounded-2xl text-[14px] text-[#0E0538] font-["Inter"] font-bold'>3</span>
                    <h6 className='text-[#C6CCFF] text-[14px] w-[calc(100%+2rem)] '><strong className='text-[#13E2E5]'>{t('Ensure_USDC')}:</strong> {t('Ensure_USDC_text')}</h6>
                </div>
                <div className='flex gap-3 items-start'>
                    <span className='Gradientbg-clr-2 flex items-center justify-center w-[22px] h-[19px] rounded-2xl text-[14px] text-[#0E0538] font-["Inter"] font-bold'>4</span>
                    <h6 className='text-[#C6CCFF] text-[14px] w-[calc(100%+2rem)] '><strong className='text-[#13E2E5]'>{t('Click_Buy')}:</strong> {t('Click_Buy_text')}</h6>
                </div>
            </div>

            <div className='flex justify-start items-center flex-wrap gap-2 pb-10 max-[600px]:justify-start'>
                <div className='flex justify-between items-center gap-2 px-4 py-1.5 border rounded-xl'>
                    <img src={BNDIMG} alt="" />
                    <span className='text-white font-bold font-["Inter"] text-[19px]'>BNB</span>
                </div>
                 <div className='flex justify-between items-center gap-2 px-4 py-1.5 border rounded-xl'>
                    <img src={USDCIMG} alt="" />
                    <span className='text-white font-bold font-["Inter"] text-[20px]'>USDC</span>
                </div>
                {/* 
                <div className='flex justify-between items-center gap-2 px-4 py-1.5 border rounded-xl'>
                    <img src={USDTIMG} alt="" />
                    <span className='text-white font-bold font-["Inter"] text-[20px]'>USDT</span>
                </div> */}
            </div>

            <span className='Gradientbg-clr-2 text-[20px] text-[#0E0538] font-bold bg-[#B5E61D] px-3 py-1 mb-2 rounded-lg'>{t('Claim')}</span>
            <div className='py-4'>
                <div className='flex gap-3 items-start mb-3'>
                    <span className='Gradientbg-clr-2 flex items-center justify-center w-[22px] h-[19px] rounded-2xl text-[14px] text-[#0E0538] font-["Inter"] font-bold'>1</span>
                    <h6 className='text-[#C6CCFF] text-[14px] w-[calc(100%+2rem)] '><strong className='text-[#13E2E5]'>{t('Connect_wallet_2')}:</strong> {t('Connect_wallet_2_txt')}</h6>
                </div>
                <div className='flex gap-3 items-start mb-3'>
                    <span className='Gradientbg-clr-2 flex items-center justify-center w-[22px] h-[19px] rounded-2xl text-[14px] text-[#0E0538] font-["Inter"] font-bold'>2</span>
                    <h6 className='text-[#C6CCFF] text-[14px] w-[calc(100%+2rem)] '><strong className='text-[#13E2E5]'>{t('Access_Claim')}:</strong> {t('Access_Claim_txt')}</h6>
                </div>
                <div className='flex gap-3 items-start mb-3'>
                    <span className='Gradientbg-clr-2 flex items-center justify-center w-[22px] h-[19px] rounded-2xl text-[14px] text-[#0E0538] font-["Inter"] font-bold'>3</span>
                    <h6 className='text-[#C6CCFF] text-[14px] w-[calc(100%+2rem)] '><strong className='text-[#13E2E5]'>{t('Click_Claim')}:</strong> {t('Click_Claim_txt')}</h6>
                </div>
                <div className='flex gap-3 items-start'>
                    <span className='Gradientbg-clr-2 flex items-center justify-center w-[22px] h-[19px] rounded-2xl text-[14px] text-[#0E0538] font-["Inter"] font-bold mb-5'>4</span>
                    <h6 className='text-[#C6CCFF] text-[14px] w-[calc(100%+2rem)] '><strong className='text-[#13E2E5]'>{t('Approve')}:</strong> {t('Approve_txt')}</h6>
                </div>
                <div className='flex gap-3 items-start'>
                    <span className='Gradientbg-clr-2 flex items-center justify-center w-[22px] h-[19px] rounded-2xl text-[14px] text-[#0E0538] font-["Inter"] font-bold mb-5'>5</span>
                    <h6 className='text-[#C6CCFF] text-[14px] w-[calc(100%+2rem)] '><strong className='text-[#13E2E5]'>{t('Swap_Coins')}:</strong> {t('Swap_Coins_txt')} <Link to='https://bridge.optimusz7.com/' target='_blank' className='underline'>OptimusZ7 Bridge platform</Link></h6>
                </div>
                <div className='flex gap-3 items-start'>
                    <span className='Gradientbg-clr-2 flex items-center justify-center w-[22px] h-[19px] rounded-2xl text-[14px] text-[#0E0538] font-["Inter"] font-bold'>6</span>
                    <h6 className='text-[#C6CCFF] text-[14px] w-[calc(100%+2rem)] '><strong className='text-[#13E2E5]'>{t('Bridge_for_Real_OZ7')}:</strong> {t('Bridge_for_Real_OZ7_txt')}</h6>
                </div>
            </div>

        </div>
    )
}

export default PreLargeBox
