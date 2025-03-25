import React, { useEffect, useState } from 'react';
import { userViewData as fetchUserViewData } from '../../utils/Api'; // Import the correct function
import { useTranslation } from '../../context/TranslationContext';

const PreSalePurchaseBox = () => {
    const { t } = useTranslation();

    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchUserViewData();
                if (response.status === 200) {
                    setData(response.data[0]);
                } else {
                    console.error("Error:", response.message);
                }
            } catch (error) {
                console.error("Error fetching user presales data", error);
            }
        };
        fetchData();
    }, []);

    if (!data) return <p>Loading...</p>;

    const {
        minimum_purchase,
        maximum_purchase,
        presale_allocation,
        listing_price,
        tge_date
    } = data;

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

        // return { month, day, year };
        return { month, day, year, time: `${hours}:${minutes} ${ampm}` };
    };
    // const { month, day, year,time } = formatDate(tge_date);

    return (
        <div className='cardBoxPurchase rounded-xl flex flex-col gap-6 p-6 py-14'>
            <div className='preslaepurchangeinner flex justify-between items-center gap-1 max-[950px]:flex-col max-[950px]:items-start'>
                <span className='text-[#C6CCFF] font-bold w-[38%] max-[950px]:w-full'>{t('Minimum_Purchase')}: </span>
                <div className='h-[26px] Gradientbg-clr-2 rounded w-[calc(100%-38%)] p-[1px] text-[16px] font-bold font-["Mona-Sans"] max-[950px]:w-full'>
                    <div className='h-[24px] border bg-transparent rounded border-none pl-2 focus:outline-none bg-4 max-[950px]:w-full' ><span className='gradient-text flex items-start gap-1 overflow-hidden pr-3'><div>$</div> {minimum_purchase}</span></div>
                </div>
            </div>
            <div className='preslaepurchangeinner flex justify-center items-center gap-1 max-[950px]:flex-col max-[950px]:items-start'>
                <span className='text-[#C6CCFF] font-bold w-[38%] max-[950px]:w-full'>{t('Maximum_Purchase')}: </span>
                <div className='h-[26px] Gradientbg-clr-2 rounded w-[calc(100%-38%)] p-[1px] text-[16px] font-bold font-["Mona-Sans"] max-[950px]:w-full'>
                    <div className='h-[24px] flex items-center border bg-transparent rounded border-none pl-2 focus:outline-none bg-4 max-[950px]:w-full' ><div className='gradient-text flex items-start gap-1 overflow-hidden pr-3'><div>$</div> {maximum_purchase}</div></div>
                </div>
            </div>
            <div className='preslaepurchangeinner flex justify-center items-center gap-1 max-[950px]:flex-col max-[950px]:items-start'>
                <span className='text-[#C6CCFF] font-bold w-[38%] max-[950px]:w-full'>{t('Presale_Allocation')}: </span>
                <div className='h-[26px] Gradientbg-clr-2 rounded w-[calc(100%-38%)] p-[1px] text-[16px] font-bold font-["Mona-Sans"] max-[950px]:w-full'>
                    <div className='h-[24px] border bg-transparent rounded border-none pl-2 focus:outline-none bg-4 max-[950px]:w-full' ><span className='gradient-text flex items-start gap-1 overflow-hidden pr-3'>{presale_allocation}</span></div>
                </div>
            </div>
            <div className='preslaepurchangeinner flex justify-center items-center gap-1 max-[950px]:flex-col max-[950px]:items-start'>
                <span className='text-[#C6CCFF] font-bold w-[38%] max-[950px]:w-full'>{t('Listing_Price')}: </span>
                <div className='h-[26px] Gradientbg-clr-2 rounded w-[calc(100%-38%)] p-[1px] text-[16px] font-bold font-["Mona-Sans"] max-[950px]:w-full'>
                    <div className='h-[24px] border bg-transparent rounded border-none pl-2 focus:outline-none bg-4 max-[950px]:w-full' ><span className='gradient-text flex items-start gap-1 overflow-hidden pr-3'><div>$</div> {parseFloat(listing_price).toFixed(4)}</span></div>
                </div>
            </div>
            <div className='preslaepurchangeinner flex justify-center items-center gap-1 max-[950px]:flex-col max-[950px]:items-start'>
                <span className='text-[#C6CCFF] font-bold w-[38%] max-[950px]:w-full'>{t('TGE_Date')}: </span>
                <div className='h-[26px] Gradientbg-clr-2 rounded w-[calc(100%-38%)] p-[1px] text-[16px] font-bold font-["Mona-Sans"] max-[950px]:w-full'>
                    <div className='h-[24px] border bg-transparent rounded border-none pl-2 focus:outline-none bg-4 max-[950px]:w-full' ><span className='gradient-text flex items-start gap-1 overflow-hidden pr-3'>{tge_date}</span></div>
                    {/* <div className='border bg-transparent rounded border-none pl-2 focus:outline-none bg-4 max-[950px]:w-full' ><span className='gradient-text'>{month} {day}th {year} {time} UTC</span></div> */}
                </div>
            </div>
        </div>
    )
}

export default PreSalePurchaseBox
