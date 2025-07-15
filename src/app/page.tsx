"use client";
import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import Image from "next/image";
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';

const Loader = () => {
  const logoRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(logoRef.current, { rotation: 0 }, {
      rotation: 360,
      duration: 4,
      ease: 'none',
      repeat: -1,
    });
  }, []);

  return (
    <div ref={containerRef} className="loader-container fixed inset-0 z-10 w-screen h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 opacity-70 filter blur-[100px] gradient-background">
        <div className="absolute w-[200%] h-[200%] top-[-100%] left-[-100%] animate-float-1">
          <Image src="/loading-screen/Ellipse 1.svg" layout="fill" objectFit="cover" alt="Ellipse 1" />
        </div>
        <div className="absolute w-[200%] h-[200%] top-[-100%] right-[-100%] animate-float-2">
          <Image src="/loading-screen/Ellipse 2.svg" layout="fill" objectFit="cover" alt="Ellipse 2" />
        </div>
        <div className="absolute w-[200%] h-[200%] bottom-[-100%] left-[-100%] animate-float-3">
          <Image src="/loading-screen/Ellipse 3.svg" layout="fill" objectFit="cover" alt="Ellipse 3" />
        </div>
        <div className="absolute w-[200%] h-[200%] bottom-[-100%] right-[-100%] animate-float-4">
          <Image src="/loading-screen/Ellipse 4.svg" layout="fill" objectFit="cover" alt="Ellipse 4" />
        </div>
      </div>
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div ref={logoRef}>
          <Image src="/loading-screen/logo.svg" width={280} height={105} alt="Coordinated Living Logo" />
        </div>
      </div>
    </div>
  );
};

const WelcomeScreen = ({ onEnterClick }: { onEnterClick: () => void }) => {
  const logoRef = useRef(null);

  useLayoutEffect(() => {
    gsap.to(logoRef.current, {
      rotation: 360,
      duration: 20,
      ease: 'none',
      repeat: -1,
    });
  }, []);

  return (
    <div className="welcome-container opacity-0 relative w-screen h-screen overflow-hidden bg-black text-white flex justify-center items-center text-center p-8 sm:p-20">
      <div className="absolute inset-0 z-0 opacity-70 filter blur-[100px] gradient-background">
        <div className="absolute w-[200%] h-[200%] top-[-100%] left-[-100%] animate-float-1">
          <Image src="/loading-screen/Ellipse 1.svg" layout="fill" objectFit="cover" alt="Ellipse 1" />
        </div>
        <div className="absolute w-[200%] h-[200%] top-[-100%] right-[-100%] animate-float-2">
          <Image src="/loading-screen/Ellipse 2.svg" layout="fill" objectFit="cover" alt="Ellipse 2" />
        </div>
        <div className="absolute w-[200%] h-[200%] bottom-[-100%] left-[-100%] animate-float-3">
          <Image src="/loading-screen/Ellipse 3.svg" layout="fill" objectFit="cover" alt="Ellipse 3" />
        </div>
        <div className="absolute w-[200%] h-[200%] bottom-[-100%] right-[-100%] animate-float-4">
          <Image src="/loading-screen/Ellipse 4.svg" layout="fill" objectFit="cover" alt="Ellipse 4" />
        </div>
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <div ref={logoRef} className="w-24 h-auto welcome-logo">
          <Image src="/loading-screen/logo.svg" width={96} height={36} alt="Logo" />
        </div>
        <div className="max-w-3xl mx-auto welcome-text" style={{ marginTop: '137px' }}>
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
            Where His grace abounds through the changing scenes of life.
          </h1>
        </div>
        <div className="welcome-button" style={{ marginTop: '137px' }}>
          <button
            onClick={onEnterClick}
            className="bg-white text-black px-8 py-4 rounded-full font-bold text-base tracking-wider transition-shadow duration-300 ease-in-out hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] cursor-pointer"
          >
            ENTER EXPERIENCE
          </button>
        </div>
      </div>
    </div>
  );
};

// Commented out video animation for demo
// const VideoAnimation = ({ videoRef, onVideoEnd }: { videoRef: React.RefObject<HTMLVideoElement | null>, onVideoEnd: () => void }) => {
//   return (
//     <div className="video-animation-container fixed inset-0 z-5 w-screen h-screen opacity-0 pointer-events-none bg-black">
//       <video
//         ref={videoRef}
//         className="w-full h-full object-cover"
//         preload="auto"
//         muted
//         playsInline
//         onEnded={onVideoEnd}
//       >
//         <source src="/door.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   );
// };

const Page = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [experienceVisible, setExperienceVisible] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleEnterClick = () => {
    if (!pageRef.current) return;
    const tl = gsap.timeline();

    // First, animate the button and text as before
    tl.to('.welcome-button', {
      scale: 1.1,
      duration: 0.2,
      ease: 'power2.out'
    })
    .to('.welcome-button', {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    })
    .to('.welcome-text', {
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.inOut'
    }, "-=0.4")
    .to('.welcome-logo', {
      opacity: 0,
      duration: 0.6,
      ease: 'power3.inOut'
    }, "<")
    // Make experience page visible just before curtain slides up
    .add(() => {
      setExperienceVisible(true);
    })
    // Now slide the entire curtain (main page) up to reveal experience
    .to(curtainRef.current, {
      y: '-100%',
      duration: 1.2,
      ease: 'power3.inOut'
    }, "-=0.2")
    .add(() => {
      setShowExperience(true);
    });
  };

  // Commented out video handling for demo
  // const handleVideoEnd = () => {
  //   setIsVideoEnded(true);
  // };

  // useEffect(() => {
  //   if (isVideoEnded) {
  //     gsap.timeline()
  //       .to('.video-animation-container', {
  //         opacity: 0,
  //         duration: 1.5,
  //         ease: 'power2.inOut'
  //       })
  //       .to('body', {
  //         backgroundColor: '#000',
  //         duration: 0.3,
  //         ease: 'power2.inOut'
  //       }, "-=0.3")
  //       .add(() => {
  //         // Smooth transition to experience page
  //         setTimeout(() => {
  //           window.location.href = '/experience';
  //         }, 200);
  //       }, "-=0.2");
  //   }
  // }, [isVideoEnded]);

  useLayoutEffect(() => {
    if (isLoaded && pageRef.current) {
      const loader = pageRef.current.querySelector('.loader-container');
      const welcome = pageRef.current.querySelector('.welcome-container');

      if (loader && welcome) {
        gsap.timeline({
          onComplete: () => {
            if (loader instanceof HTMLElement) loader.style.display = 'none';
          }
        })
        .to(loader, { opacity: 0, duration: 1.5, ease: 'power2.inOut' })
        .to(welcome, { opacity: 1, duration: 1.5, ease: 'power2.inOut' }, "-=1.0");
      }
    }
  }, [isLoaded]);

  return (
    <div ref={pageRef} className="relative w-screen h-screen overflow-hidden">
      {/* Experience page hidden behind */}
      {experienceVisible && (
        <div 
          ref={experienceRef}
          className="fixed inset-0 w-screen h-screen bg-black"
          style={{ zIndex: 1 }}
        >
          <Image
            src="/coordinated.webp"
            fill
            sizes="100vw"
            alt="Experience Background"
            priority
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAADsAD+JaQAA3AAAAAA"
            style={{ 
              objectFit: 'cover',
              objectPosition: 'center top'
            }}
          />
        </div>
      )}

      {/* Curtain (main page) that slides up */}
      <div 
        ref={curtainRef}
        className="fixed inset-0 w-screen h-screen"
        style={{ zIndex: 10 }}
      >
        <Loader />
        <WelcomeScreen onEnterClick={handleEnterClick} />
      </div>
    </div>
  );
};

export default Page;
