import { useEffect, useState } from 'react';
import './homepage.css';

import img1 from '../assets/homepage-img11.png';
import img2 from '../assets/homepage-img2.png';
import img3 from '../assets/homepage-img3.png';
import img4 from '../assets/homepage-img4.png';

const backgroundImages = [img1, img2, img3, img4];

const taglines = ["Forever Begins Here", "Proud Moments Forever", "Cherish Every Moment", "Joy In Frames"];

const HomePage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true);
            setTimeout(() => {
                setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
                setFade(false);
            }, 300);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="homepage" style={{backgroundImage: `url(${backgroundImages[currentImageIndex]})`,}}>
            <div className="hero-content">
                <h1 className={`hero-title ${fade ? "fade" : ""}`}>{taglines[currentImageIndex]}</h1>
                <p className="hero-subtitle">Capture your timeless moments with us</p>
            </div>
        </div>
    );
};

export default HomePage;