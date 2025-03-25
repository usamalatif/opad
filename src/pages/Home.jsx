import React, { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import Presale from '../components/Presale/Presale';
import Footer from '../components/Footer/Footer';
import DIstrubution from '../components/DIstrubution/DIstrubution';
import Claim from '../components/Claim/Claim';
import Vesting from '../components/Vesting/Vesting';

const Home = () => {
    return (
        <div className="relative overflow-hidden">
            <div className="bgset"></div>
            <Navbar />
            <Hero />
            <Presale />
            <Claim />
            <Vesting />
            <DIstrubution />
            <Footer />
        </div>
    );
}

export default Home;
