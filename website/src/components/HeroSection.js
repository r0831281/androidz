import React from 'react';
import './HeroSection.css'; // Import the CSS file for styling
import ButtonComponent from './ButtonComponent';

const HeroSection = () => {
    return (
        <div className="hero-section text-center text-white pb-2">
            <img
                src="/group.jpg"
                alt="Hero"
                className="hero-image"
            />

            <div className="hero-text">
            <ButtonComponent text={"Stem Nu op ons voor de nieuwe lichting!"} url={"https://www.vrt.be/interactie/stem/De-Nieuwe-Lichting-2025/"}  />
            <br />
                <p className="lead">
                    ANDRO!DZ is een Belgische live drum 'n' bass band, bekend om hun energieke optredens en innovatieve sound. 
                    Als finalisten in “De Nieuwe Lichting 2025” met hun single “Forward” hebben ze hun plaats verstevigd als een 
                    van de veelbelovende live acts van België. Met hun unieke mix tussen live muziek en strakke studioproducties 
                    creëren ze hun eigen unieke wereld. Een reis waarop ze elke luisteraar willen meenemen.
                </p>
                <hr className="my-4" />
                <p>
                    Zoals Dansende Beren schreef: "ANDRO!DZ doet wel degelijk zijn eigen ding, met een net wat ander sound-design 
                    dat een tikkeltje gecompliceerder overkomt."
                </p>
            </div>
        </div>
    );
};

export default HeroSection;