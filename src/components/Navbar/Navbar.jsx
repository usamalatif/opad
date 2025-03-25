import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Twitter from '../../assets/icons/Twitter.png';
import Telegram from '../../assets/icons/Telegram.png';
import Ellipsetop from '../../assets/images/Ellipsetop.png';
import BurgerIcon from '../../assets/icons/BurgerIcon.png';
import CloseIcon from '../../assets/icons/CrossIcon.svg';

import aboutus from '../../assets/icons/aboutus.svg';
import ROADMAP from '../../assets/icons/ROADMAP.svg';
import litepaper from '../../assets/icons/litepaper.svg';
import wiki from '../../assets/icons/wiki.svg';

import staking from '../../assets/icons/staking.svg';
import bridge from '../../assets/icons/bridge.png';
import wallet from '../../assets/icons/wallet.png';
import odex from '../../assets/icons/odex.png';

import { Link } from 'react-router-dom';
import LanguageSelector from '../LanguageSelector';
import { useTranslation } from '../../context/TranslationContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdown, setDropdown] = useState(null); // Dropdown state
    const { t } = useTranslation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    const handleMouseEnter = (menu) => {
        setDropdown(menu);
    };

    const handleMouseLeave = () => {
        setDropdown(null);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`navbar-window flex justify-between items-center px-6 py-4 ${scrolled ? 'scrolled' : ''}`}>
            <img className={`Ellipsetop ${scrolled ? 'scrolled' : ''}`} src={Ellipsetop} alt="" />
            <Link to="/" className='logo-window'>
                <img src="../../C4-removebg-preview.png" alt="" />
            </Link>
            <div className='lg:flex gap-3 hidden'>
                <Link to='https://opad.gitbook.io/opad' target='_blank'
                    className='Gradientbg relative'
                    onMouseEnter={() => handleMouseEnter('about')}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className='themeBtn cursor-pointer' style={{ background: '#000' }}>{t('ABOUT')}</div>
                    {/* {dropdown === 'about' && (
                        <div className="dropdown-content drop-grid">
                            <Link to='' className="dropdown-Link flex justify-start items-start text-left py-2 hover:bg-gray-700"><span className='bg-[#06B6D4] p-1 rounded-2xl flex justify-center items-center mr-2'><img src={aboutus} className='w-[20px]' alt="" /></span> About Us</Link>
                            <Link to='' className="dropdown-Link flex justify-start items-start text-left py-2 hover:bg-gray-700"><span className='bg-[#06B6D4] p-1 rounded-2xl flex justify-center items-center mr-2'><img src={ROADMAP} className='w-[20px]' alt="" /></span> RoadMap</Link>
                            <Link to='' className="dropdown-Link flex justify-start items-start text-left py-2 hover:bg-gray-700"><span className='bg-[#06B6D4] p-1 rounded-2xl flex justify-center items-center mr-2'><img src={litepaper} className='w-[20px]' alt="" /></span> LitePaper</Link>
                            <Link to='' className="dropdown-Link flex justify-start items-start text-left py-2 hover:bg-gray-700"><span className='bg-[#06B6D4] p-1 rounded-2xl flex justify-center items-center mr-2'><img src={wiki} className='w-[20px]' alt="" /></span> Wiki</Link>
                        </div>
                    )} */}
                </Link>

                <Link to='https://optimusz7.com/' target='_blank'
                    className='Gradientbg relative'
                    onMouseEnter={() => handleMouseEnter('use_optimus')}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className='themeBtn cursor-pointer' style={{ background: '#000' }}>{t('USE_OPTIMUS_Z7')}</div>
                    {/* {dropdown === 'use_optimus' && (
                        <div className="dropdown-content drop-grid">
                            <Link to='' className="dropdown-Link flex justify-start items-start text-left py-2 hover:bg-gray-700"><span className='bg-[#06B6D4] p-1 rounded-2xl flex justify-center items-center mr-2'><img src={staking} className='w-[20px]' alt="" /></span> Staking</Link>
                            <Link to='' className="dropdown-Link flex justify-start items-start text-left py-2 hover:bg-gray-700"><span className='bg-[#06B6D4] p-1 rounded-2xl flex justify-center items-center mr-2'><img src={bridge} className='w-[20px]' alt="" /></span> Bridge</Link>
                            <Link to='' className="dropdown-Link flex justify-start items-start text-left py-2 hover:bg-gray-700"><span className='bg-[#06B6D4] p-1 rounded-2xl flex justify-center items-center mr-2'><img src={wallet} className='w-[20px]' alt="" /></span> Wallet</Link>
                            <Link to='' className="dropdown-Link flex justify-start items-start text-left py-2 hover:bg-gray-700"><span className='bg-[#06B6D4] p-1 rounded-2xl flex justify-center items-center mr-2'><img src={odex} className='w-[20px]' alt="" /></span> ODEX</Link>
                        </div>
                    )} */}
                </Link>
                <Link to='https://pondowallet.app/' target='_blank'
                    className='Gradientbg relative'
                    onMouseEnter={() => handleMouseEnter('developers')}
                    onMouseLeave={handleMouseLeave}
                >
                    <div href="#" className='themeBtn cursor-pointer' style={{ background: '#000' }}>{t('DEVELOPERS')}</div>
                    {/* {dropdown === 'developers' && (
                        <div className="dropdown-content drop-grid">
                            <a href="#" className="text-left block px-4 py-2 hover:bg-gray-700">Explorer</a>
                            <a href="#" className="text-left block px-4 py-2 hover:bg-gray-700">faucet</a>
                            <a href="#" className="text-left block px-4 py-2 hover:bg-gray-700">docs</a>
                            <a href="#" className="text-left block px-4 py-2 hover:bg-gray-700">Validators</a>
                        </div>
                    )} */}
                </Link>

                <Link to='https://bridge.optimusz7.com/' target='_blank'
                    className='Gradientbg relative'
                    onMouseEnter={() => handleMouseEnter('presale')}
                    onMouseLeave={handleMouseLeave}
                >
                    <div href="" className='themeBtn cursor-pointer' style={{ background: '#000' }}>{t('PRESALE')}</div>
                </Link>
                <div className='flex items-center gap-3'>
                    <Link to='https://x.com/OpadFund' target='_blank' className='Gradientbg-shadow rounded-md'>
                        <img src={Twitter} alt="" className='cursor-pointer Gradientbg-shadow' />
                    </Link>
                    <Link to='https://t.me/OptimusZ7' target='_blank' className='Gradientbg-shadow rounded-md'>
                        <img src={Telegram} alt="" className='cursor-pointer Gradientbg-shadow' />
                    </Link>
                </div>
                <LanguageSelector />
            </div>
            <div className='lg:hidden flex items-center'>
                <img
                    src={BurgerIcon}
                    alt="Menu"
                    className='cursor-pointer'
                    onClick={toggleMenu}
                />
            </div>
            <div className={`fixed top-0 left-0 h-full w-64 bg-gray-800 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}>
                <div className='flex flex-col gap-4 items-start mt-20 p-2'>
                    <img src="../../logo.svg" className='absolute top-4 left-2 cursor-pointer w-[50px]' alt="" />
                    <img
                        src={CloseIcon}
                        alt="Close"
                        className='absolute top-4 right-4 cursor-pointer'
                        onClick={toggleMenu}
                    />
                    <Link to='https://optimusz7.gitbook.io/litepaper' target='_blank' className="Gradientbg"><div href="" className='themeBtn '>{t('ABOUT')}</div></Link>
                    <Link to='https://optimusz7.com/' target='_blank' className="Gradientbg"><div href="" className='themeBtn'>{t('USE_OPTIMUS_Z7')}</div></Link>
                    <Link to='https://pondowallet.app/' target='_blank' className="Gradientbg"><div href="" className='themeBtn'>{t('DEVELOPERS')}</div></Link>
                    <Link to='https://odex.pro/' target='_blank' className="Gradientbg"><div href="" className='themeBtn'>{t('PRESALE')}</div></Link>
                    <div className=' flex flex-col gap-2'>
                        <div className='flex items-center gap-3 mt-1'>
                            <Link to='https://x.com/OpadFund' className='Gradientbg-shadow'>
                                <img src={Twitter} alt="" className='cursor-pointer Gradientbg-shadow' />
                            </Link>
                            <Link to='' className='Gradientbg-shadow'>
                                <img src={Telegram} alt="" className='cursor-pointer Gradientbg-shadow' />
                            </Link>
                        </div>
                        <div className=''>
                            <LanguageSelector />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Navbar;
