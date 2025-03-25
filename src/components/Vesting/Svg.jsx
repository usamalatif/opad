import React from 'react';
import { useTranslation } from '../../context/TranslationContext';

const Svg = ({ vestingData }) => {
    const { t } = useTranslation();

    console.log("vestingData", vestingData)
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('en-US', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
        return { month, day, year };
    };
    const { month: month1, day: day1, year: year1 } = formatDate(vestingData[0]?.start_date);
    const { month: month2, day: day2, year: year2 } = formatDate(vestingData[1]?.start_date);
    const { month: month3, day: day3, year: year3 } = formatDate(vestingData[2]?.start_date);
    const { month: month4, day: day4, year: year4 } = formatDate(vestingData[3]?.start_date);
    const { month: month5, day: day5, year: year5 } = formatDate(vestingData[4]?.start_date);

    return (
        <svg className='mt-14 h-fit' width="100%" height="315" viewBox="0 0 1283 315" fill="none" xmlns="http://www.w3.org/2000/svg">

            <text x="0" y="260" font-family="Verdana" font-size="18px" font-weight="700" fill="#00CBD9">{t('Vesting')} One</text>
            <text x="3" y="290" font-family="Verdana" font-size="14px" font-weight="700" fill="#C6CCFF">{t('Claim')} {vestingData[0]?.percentage} % on </text>
            <text x="3" y="310" font-family="Verdana" font-size="14px" font-weight="700" fill="#C6CCFF">{`${month1} ${day1} ${year1}`}</text>

            <text x="200" y="22" font-family="Verdana" font-size="18px" font-weight="700" fill="#00CBD9">{t('Vesting')} Two</text>
            <text x="202" y="50" font-family="Verdana" font-size="14px" font-weight="700" fill="#C6CCFF">{t('Claim')} {vestingData[1]?.percentage} % on </text>
            <text x="202" y="70" font-family="Verdana" font-size="14px" font-weight="700" fill="#C6CCFF">{`${month2} ${day2} ${year2}`}</text>


            <text x="490" y="200" font-family="Verdana" font-size="18px" font-weight="700" fill="#00CBD9">{t('Vesting')} Three</text>
            <text x="492" y="230" font-family="Verdana" font-size="14px" font-weight="700" fill="#C6CCFF">{t('Claim')} {vestingData[2]?.percentage} % on </text>
            <text x="492" y="250" font-family="Verdana" font-size="14px" font-weight="700" fill="#C6CCFF">{`${month3} ${day3} ${year3}`}</text>

            <text x="740" y="230" font-family="Verdana" font-size="18px" font-weight="700" fill="#00CBD9">{t('Vesting')} Four</text>
            <text x="742" y="260" font-family="Verdana" font-size="14px" font-weight="700" fill="#C6CCFF">{t('Claim')} {vestingData[3]?.percentage} % on </text>
            <text x="742" y="280" font-family="Verdana" font-size="14px" font-weight="700" fill="#C6CCFF">{`${month4} ${day4} ${year4}`}</text>

            <text x="1065" y="38" font-family="Verdana" font-size="18px" font-weight="700" fill="#00CBD9">{t('Vesting')} Five</text>
            <text x="1065" y="68" font-family="Verdana" font-size="14px" font-weight="700" fill="#C6CCFF">{t('Claim')} {vestingData[4]?.percentage} % on </text>
            <text x="1065" y="88" font-family="Verdana" font-size="14px" font-weight="700" fill="#C6CCFF">{`${month5} ${day5} ${year5}`}</text>

            {/* <text x="880" y="80" font-family="Verdana" font-size="18px" font-weight="700" fill="#00CBD9">{t('Vesting')} Five</text>
            <text x="880" y="110" font-family="Verdana" font-size="14px" font-weight="700" fill="#C6CCFF">{t('Claim_20')} </text>
            <text x="880" y="130" font-family="Verdana" font-size="14px" font-weight="700" fill="#C6CCFF">{`${month5} ${day5}${`th`} ${year5}`}</text> */}

            <path d="M12.6479 221.775C35.4554 198.242 86.2129 146.293 106.783 126.769C143.07 92.3271 203.969 66.6265 277.186 150.302C309.436 185.167 358.682 248.796 445.409 202.164C497.706 172.529 523.419 157.711 544.774 145.073C566.129 132.434 604.459 96.5659 679.004 164.684C716.5 198.948 763.722 210.009 804.953 154.225C819.771 134.177 855.943 68.3698 863.352 57.4745C870.761 46.5793 926.107 -38.291 991.916 30.89C1012.09 52.1003 1019.46 69.2922 1042.47 105.414C1060.68 134.002 1124.4 223.083 1266.04 99.7482" stroke="url(#paint0_linear_4349_902)" strokeWidth="7" />
            <path d="M1263.59 100.056L1248.76 95.6126L1278.9 88.0396L1266.26 117.529L1263.59 100.056Z" fill="#047EFB" />

            <circle cx="15.5" cy="224" r="11.9493" fill="#0B0620" stroke="#01D5E6" strokeWidth="6.10136" />
            <circle cx="210" cy="100" r="11.5" fill="#0B0620" stroke="#02BDEC" strokeWidth="7" />
            <circle cx="460" cy="195" r="11.5" fill="#0B0620" stroke="#03A1F2" strokeWidth="7" />
            <circle cx="720" cy="190" r="11.5" fill="#0B0620" stroke="#0389F8" strokeWidth="7" />
            {/* <circle cx="860" cy="65" r="11.5" fill="#0B0620" stroke="#0389F8" strokeWidth="7" /> */}
            <circle cx="1076.5" cy="144" r="11.5" fill="#0B0620" stroke="#0389F8" strokeWidth="7" />
            <defs>
                <linearGradient id="paint0_linear_4349_902" x1="12.6479" y1="118.249" x2="1266.04" y2="118.249" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#01D6E6" />
                    <stop offset="1" stopColor="#047DFB" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default Svg;
