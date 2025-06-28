"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

interface AboutMeWindowProps {
  onClose: () => void;
}

const AboutMeWindow = ({ onClose }: AboutMeWindowProps) => {
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      windowRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: 'power3.out' }
    );
  }, []);

  const handleClose = () => {
    gsap.to(windowRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.2,
      ease: 'power3.in',
      onComplete: onClose,
    });
  };

  return (
    <div ref={windowRef} className="absolute inset-0 flex items-center justify-center z-50">
      <div className="relative">
        <Image src="/windows/about-me-window.svg" width={800} height={600} alt="About Me Window" />
        <button 
          onClick={handleClose} 
          className="absolute top-5 right-5 w-8 h-8 bg-transparent cursor-pointer"
          aria-label="Close"
        />
      </div>
    </div>
  );
};

export default AboutMeWindow; 