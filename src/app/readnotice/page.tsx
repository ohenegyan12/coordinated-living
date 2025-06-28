"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import Link from 'next/link';

const ReadNoticePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade in the page on load
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: 'power2.inOut' }
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen opacity-0"
    >
      <Image
        src="/notice-background.svg"
        alt="Notice background"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div className="relative z-10 flex flex-col justify-center h-full items-center">
        <div className="absolute top-10 left-10 flex flex-col items-center">
            <Link href="/experience">
              <Image src="/go-back.svg" alt="Return to Desk" width={120} height={120} />
            </Link>
        </div>

        <div className="flex items-center justify-center w-full px-20">
            <button className="bg-white/50 rounded-full p-2 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <div className="w-1/2 p-16 bg-[#F3EFEA] rounded-lg shadow-2xl text-center mx-8 relative">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full"></div>
              <p className="text-3xl leading-loose text-gray-800 font-serif">
                I welcome you to this space, a place where we seek 'the coordinated
                living' – aligning our lives with God's Word and His purpose. Our
                goal is to be the sheep of His pasture, finding guidance,
                nourishment, and belonging within His fold.
              </p>
              <p className="mt-10 text-2xl text-right text-gray-700 font-serif">
                - the Coordinated Living
              </p>
            </div>

            <button className="bg-white/50 rounded-full p-2 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
      </div>
    </div>
  );
};

export default ReadNoticePage;
