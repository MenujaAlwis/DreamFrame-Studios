import { useEffect, useState } from 'react';
import './homepage.css';
import img1 from '../assets/homepage-img1.png';
import logo from '../assets/logonew.png';


const backgroundImages = [img1];

const HomePage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="homepage" style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})`, }}>
            <img className="logo" src={logo} alt="Logo" />
            
        </div>
    );
};

export default HomePage;