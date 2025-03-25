import React, { useContext, useEffect, useRef, useState } from 'react';
import { TranslationContext } from '../context/TranslationContext';
import './LanguageSelector.css';

import arrowUp from '../assets/icons/ep_arrow-down.png';
import arrowDown from '../assets/icons/ep_arrow-down (1).png';

// Import flag images
import enFlag from '../assets/icons/flags/usa.webp';
import frFlag from '../assets/icons/flags/france.webp';
import cnFlag from '../assets/icons/flags/chinies.png';
import krFlag from '../assets/icons/flags/korea.png';
import nlFlag from '../assets/icons/flags/dutch.png';
import ruFlag from '../assets/icons/flags/russia.png';
import jpFlag from '../assets/icons/flags/japan.png';
import ptFlag from '../assets/icons/flags/portugal.png';
import esFlag from '../assets/icons/flags/spain.png';
import deFlag from '../assets/icons/flags/german.png';
import trFlag from '../assets/icons/flags/turkey.png';
import viFlag from '../assets/icons/flags/vietnam.png';
import idFlag from '../assets/icons/flags/indonesia.png';

const LanguageSelector = () => {
    const { language, changeLanguage } = useContext(TranslationContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const languages = [
        { code: 'en', name: 'English', flag: enFlag },
        { code: 'fr', name: 'French', flag: frFlag },
        { code: 'cn', name: 'Chinese', flag: cnFlag },
        { code: 'kr', name: 'Korean', flag: krFlag },
        { code: 'nl', name: 'Dutch', flag: nlFlag },
        { code: 'ru', name: 'Russian', flag: ruFlag },
        { code: 'jp', name: 'Japanese', flag: jpFlag },
        { code: 'pt', name: 'Portuguese', flag: ptFlag },
        { code: 'es', name: 'Spanish', flag: esFlag },
        { code: 'de', name: 'German', flag: deFlag },
        { code: 'tr', name: 'Turkish', flag: trFlag },
        { code: 'vi', name: 'Vietnamese', flag: viFlag },
        { code: 'id', name: 'Indonesian', flag: idFlag },
    ];

    const handleLanguageChange = (code) => {
        changeLanguage(code);
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        console.log(`Language changed to: ${language}`);
    }, [language]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Find the currently selected language once to avoid repeated lookups
    const selectedLang = languages.find(lang => lang.code === language);

    return (
        <div className="language-selector" ref={dropdownRef}>
            <div className="dropdown-container">
                <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
                    <img src={selectedLang?.flag} alt="Selected flag" className="flag-icon" />
                    <span className="language-name">{selectedLang?.name}</span>
                    <img
                        src={isOpen ? arrowDown : arrowUp}
                        alt="Dropdown arrow"
                        className="dropdown-arrow"
                    />
                </div>
                {isOpen && (
                    <div className="dropdown-menu">
                        {languages.map((lang) => (
                            <div
                                key={lang.code}
                                className={`dropdown-item ${language === lang.code ? 'active' : ''}`}
                                onClick={() => handleLanguageChange(lang.code)}
                            >
                                <img src={lang.flag} alt={`${lang.name} flag`} className="flag-icon" />
                                <span className="language-name-drop pl-2">{lang.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LanguageSelector;
