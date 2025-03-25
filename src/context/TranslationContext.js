import React, { createContext, useState, useContext } from 'react';
import en from '../locales/en.json';
import fr from '../locales/fr.json';
import cn from '../locales/cn.json';
import kr from '../locales/kr.json';
import nl from '../locales/nl.json';
import ru from '../locales/ru.json';
import jp from '../locales/jp.json';
import pt from '../locales/pt.json';
import es from '../locales/es.json';
import de from '../locales/de.json';
import tr from '../locales/tr.json';
import vi from '../locales/vi.json';
import id from '../locales/id.json';
// Import other language files...

const translations = {
    en,
    fr,
    cn,
    kr,
    nl,
    ru,
    jp,
    pt,
    es,
    de,
    tr,
    vi,
    id
    // Add other languages...
};

export const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    const t = (key) => {
        return translations[language][key] || key;
    };

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    return (
        <TranslationContext.Provider value={{ t, language, changeLanguage }}>
            {children}
        </TranslationContext.Provider>
    );
};

// Define and export the useTranslation hook
export const useTranslation = () => {
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    return context;
};
