import './Menu.css';
import { promoItems } from '../data/DataMenu';
import { useState, useEffect } from 'react';

const Menu = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const autoSlideInterval = 5000; // Auto slide every 5 seconds

    // Auto slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % promoItems.length);
        },  autoSlideInterval);

        return () => clearInterval(interval);
    }, []);

    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + promoItems.length) % promoItems.length);
    };

    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % promoItems.length);
    };

    const handleIndicatorClick = (index: number) => {
        setCurrentSlide(index);
    };

    const currentPromo = promoItems[currentSlide];

    return (
        <section className="menu" id="Menu">
            <div className="menu-container">
                <h2 className="menu-title">Special Promotions</h2>
                <p className="menu-description">
                    Discover our exclusive deals and limited-time offers. Don't miss out on amazing discounts!
                </p>

                {/* Promo Carousel */}
                <div className="promo-carousel">
                    <button 
                        className="carousel-btn prev-btn"
                        onClick={handlePrevSlide}
                    >
                        ❮
                    </button>

                    <div className="promo-slide">
                        <img 
                            src={currentPromo.image} 
                            alt={currentPromo.title}
                            className="promo-image"
                        />
                        <div className="promo-content">
                            <span className="promo-discount-badge">{currentPromo.discount}</span>
                            <h3 className="promo-title">{currentPromo.title}</h3>
                            <p className="promo-description">{currentPromo.description}</p>
                            <div className="promo-pricing">
                                {currentPromo.originalPrice && (
                                    <span className="promo-original-price">{currentPromo.originalPrice}</span>
                                )}
                                {currentPromo.promoPrice && (
                                    <span className="promo-final-price">{currentPromo.promoPrice}</span>
                                )}
                            </div>
                            <button className="btn-order">Get This Promo</button>
                        </div>
                    </div>

                    <button 
                        className="carousel-btn next-btn"
                        onClick={handleNextSlide}
                    >
                        ❯
                    </button>
                </div>

                {/* Carousel Indicators */}
                <div className="carousel-indicators">
                    {promoItems.map((_, index) => (
                        <div
                            key={index}
                            className={`indicator ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => handleIndicatorClick(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Menu;