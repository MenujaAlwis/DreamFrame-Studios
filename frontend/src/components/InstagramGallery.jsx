import './instagramGallery.css';

import img1 from '../assets/instagram_gallery/instagram1.png';
import img2 from '../assets/instagram_gallery/instagram2.png';
import img3 from '../assets/instagram_gallery/instagram3.png';
import img4 from '../assets/instagram_gallery/instagram4.png';
import img5 from '../assets/instagram_gallery/instagram5.png';

import { FaInstagram } from 'react-icons/fa';

const images = [img1, img2, img3, img4, img5];

const InstagramGallery = () => {
  return (
    <div className="instagram-gallery-container">
        <a
        href="https://instagram.com/yourusername"
        target="_blank"
        rel="noreferrer"
        className="instagram-gallery"
        >
        {images.map((image, index) => (
            <div className="gallery-item" key={index}>
            <img src={image} alt={`Instagram ${index + 1}`} />
            </div>
        ))}

        <div className="gallery-overlay">
            <FaInstagram className="instagram-icon" />
            <span>Follow Us</span>
        </div>
        </a>
    </div>
  );
};

export default InstagramGallery;