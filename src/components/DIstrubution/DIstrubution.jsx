import React, { useEffect, useState } from 'react'
import metamaskImg from '../../assets/images/logo2.45aadcc7.png'
import pandaWallet from '../../assets/images/Group 930.png'
import newimg from '../../assets/images/image_2024_10_22T09_26_41_500Z.png'
import AuditBox from './AuditBox'
import DistrubutionBox from './DistrubutionBox'
import { useTranslation } from '../../context/TranslationContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const DIstrubution = () => {
    const { t } = useTranslation();
    const [addresses, setAddresses] = useState({
        audit_link: '',
        contract_address: '',
        vesting_address: ''
    });

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get(`${process.env.REACT_APP_API}admin/get-addresses`,
                //      {
                //     headers: {
                //         'x-access-token': token,
                //     },
                // }
            );
                console.log('get-addresses', response)

                if (response.status === 200) {
                    const { audit_link, contract_address, vesting_address } = response.data.data[0];
                    setAddresses({ audit_link, contract_address, vesting_address });
                }
            } catch (error) {
                console.error('Failed to fetch addresses:', error);
            }
        };

        fetchAddresses();
    }, []);

    return (
        <div className='px-2'>
            <div className='max-w-[1180px] mx-auto'>
                <div className='flex-column flex justify-between gap-4 max-[950px]:!flex-col max-[950px]:pb-8'>
                    <div className='flex flex-col gap-5 mb-10 w-full h-full'>
                        <AuditBox title={t('Audit')} address={addresses.audit_link} />
                        <AuditBox title={t('Contract_Address')} address={addresses.contract_address} />
                    </div>
                    <DistrubutionBox />
                </div>

                <div className='max-w-[1180px] mx-auto'>
                    <div className='grid grid-cols-2 gap-5 max-[950px]:grid-cols-1'>
                        <Link to='https://bridge.optimusz7.com/' target='_blank' className='Gradientbg-shadow-box flex justify-center items-center rounded-2xl overflow-hidden' style={{ background: 'linear-gradient(135deg, #0B0620 0%, #047bfb50 100%)' }}>
                            <img className='w-full' src={newimg} alt="" />
                        </Link>
                        <Link to='https://pondowallet.app/' target='_blank' className='Gradientbg-shadow-box flex justify-center items-center rounded-2xl'>
                            <img className='w-full' src={pandaWallet} alt="" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DIstrubution
