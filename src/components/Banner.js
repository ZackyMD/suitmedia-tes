import React, { useEffect, useRef } from 'react';

export default function Banner() {
  const bannerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bannerRef.current) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        bannerRef.current.style.transform = `translateY(${scrollTop * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="parallax">
      <img
        ref={bannerRef}
        src="/images/logo/ideas.jpeg"
        alt="ideas img"
        className="banner"
      />
      <div className="parallax-text-container">
        <h1 className="ideas-title-banner">Ideas</h1>
        <h5 className="ideas-description-banner">Where all our great thinks begin</h5>
      </div>
    </div>
  );
}