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
  const [experienceVisible, setExperienceVisible] = useState(false);
  const [laptopZoomed, setLaptopZoomed] = useState(false);
  const [showLesleyLetter, setShowLesleyLetter] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Add escape key handler for zoom out
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log('Key pressed:', e.key, 'laptopZoomed:', laptopZoomed);
      if (e.key === 'Escape' && laptopZoomed) {
        console.log('ESC key detected, zooming out...');
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        // Force focus back to the main document
        document.body.focus();
        
        gsap.to(experienceRef.current, {
          scale: 1,
          x: '0%',
          y: '0%',
          duration: 1.5,
          ease: 'power2.inOut',
          zIndex: 1,
        });
        setLaptopZoomed(false);
      }
    };

    // Add listeners with capture phase for better coverage
    window.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('keydown', handleKeyDown, true);
    document.body.addEventListener('keydown', handleKeyDown, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('keydown', handleKeyDown, true);
      document.body.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [laptopZoomed]);

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
        // Experience is now visible
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
          {/* Laptop iframe overlay */}
          <div
            ref={laptopRef}
            className="absolute cursor-pointer"
            style={{
              left: '50.5%',
              top: '70%',
              width: '24%',
              height: '24%',
              transform: 'translate(-50%, -50%)',
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              zIndex: 2,
            }}
            onClick={(e) => {
              // Don't zoom if clicking on the iframe content
              if (e.target !== e.currentTarget) {
                return;
              }

              if (!laptopZoomed) {
                // Camera zoom in - scale and move the entire experience view toward laptop
                gsap.to(experienceRef.current, {
                  scale: 3,
                  x: '0%',
                  y: '-45%',
                  duration: 1.5,
                  ease: 'power2.inOut',
                  zIndex: 20,
                  onComplete: () => {
                    setLaptopZoomed(true);
                  }
                });
              } else {
                // Camera zoom out - return to original view
                gsap.to(experienceRef.current, {
                  scale: 1,
                  x: '0%',
                  y: '0%',
                  duration: 1.5,
                  ease: 'power2.inOut',
                  zIndex: 1,
                });
                setLaptopZoomed(false);
              }
            }}
          >
            <iframe
              src="/windows"
              style={{
                width: '300%',
                height: '300%',
                border: 'none',
                borderRadius: '0',
                backgroundColor: 'transparent',
                transform: 'scale(0.3)',
                transformOrigin: 'center center',
                position: 'absolute',
                top: '-100%',
                left: '-100%',
                pointerEvents: laptopZoomed ? 'auto' : 'none',
              }}
              onLoad={() => {
                // Ensure iframe doesn't capture keyboard events when zoomed
                if (laptopZoomed) {
                  const iframe = document.querySelector('iframe');
                  if (iframe && iframe.contentWindow) {
                    try {
                      iframe.contentWindow.focus();
                    } catch (e) {
                      console.log('Could not focus iframe:', e);
                    }
                  }
                }
              }}
              onKeyDown={(e) => {
                // Prevent iframe from capturing ESC key
                if (e.key === 'Escape') {
                  e.preventDefault();
                  e.stopPropagation();
                  document.body.focus();
                }
              }}
            />
          </div>

          {/* Letter clip-path overlay */}
          <div
            className="absolute cursor-pointer letter-glow"
            style={{
              left: '75%',
              top: '92%',
              transform: 'translate(-50%, -50%) rotate(-95deg) skewY(-57deg) ',
              zIndex: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              width: ' 129px',
              height: '310px',
              background: 'transparent',
              clipPath: 'polygon(12% 30%, 85% 22%, 95% 82%, 22% 90%)',
              position: 'relative',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
            }}
            onClick={() => {
              console.log('Letter clicked!');
              setShowLesleyLetter(true);
            }}
          />
          {/* cup- clippath */}
          <div
            className="absolute group"
            style={{ right: '280px', bottom: '190px', width: '20px', height: '20px', zIndex: 2 }}
          >
            <div
              className="cursor-pointer cup-glow heartbeat cup-float cup-hover-glow w-full h-full"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                clipPath: 'circle(50% at 50% 50%)',
                borderRadius: '50%',
                filter: 'blur(2px)',
              }}
              onClick={() => console.log('Cup clicked!')}
            />


          </div>
          {/* phone- clippath */}
          <div
            className="absolute group"
            style={{ left: '250px', bottom: '1px', width: '290px', height:'360px', zIndex: 2 }}
          >
            <div
              className="cursor-pointer phone-glow w-full h-full"
              style={{
                clipPath: 'polygon(18% 65%, 43% 60%, 70% 84%, 39% 90%)',
                borderRadius: '50% 50% 0 0',
              }}
              onClick={() => {
                console.log('Phone clicked!');
                setShowVideos(true);
              }}
            />

            {/* Tooltip */}
            {/* <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-white bg-black bg-opacity-70 px-2 py-1 rounded">
             Buy me a coffee ☕
            </div> */}
          </div>

          <style jsx>{`
              .letter-glow {
                animation: letterPulse 2s ease-in-out infinite;
              }
              
              @keyframes letterPulse {
                0% {
                  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2);
                }
                50% {
                  box-shadow: 0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.1);
                }
                100% {
                  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2);
                }
              }
              
              .cup-glow {
                animation: cupPulse 2.5s ease-in-out infinite;
              }
              
              @keyframes cupPulse {
                0% {
                  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2), 0 0 30px rgba(255, 255, 255, 0.1);
                }
                50% {
                  box-shadow: 0 0 25px rgba(255, 255, 255, 0.4), 0 0 50px rgba(255, 255, 255, 0.2), 0 0 70px rgba(255, 255, 255, 0.1);
                }
                100% {
                  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2), 0 0 30px rgba(255, 255, 255, 0.1);
                }
              }
              
              .heartbeat {
                -webkit-animation: heartbeat 1.5s ease-in-out infinite both;
                animation: heartbeat 1.5s ease-in-out infinite both;
              }
              
              @keyframes heartbeat {
                0% {
                  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2);
                }
                14% {
                  box-shadow: 0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 165, 0, 0.4), 0 0 80px rgba(255, 69, 0, 0.2);
                }
                28% {
                  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2);
                }
                42% {
                  box-shadow: 0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 165, 0, 0.4), 0 0 80px rgba(255, 69, 0, 0.2);
                }
                70% {
                  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2);
                }
              }
              
              .cup-float {
                animation: float 3s ease-in-out infinite;
              }
              
              @keyframes float {
                0%, 100% {
                  transform: translateY(0px) scale(1);
                }
                50% {
                  transform: translateY(-10px) scale(1);
                }
              }
              
              .return-desk-glow {
                animation: returnDeskGlow 3s ease-in-out infinite;
              }
              
              @keyframes returnDeskGlow {
                0%, 100% {
                  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.1);
                }
                50% {
                  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.2), 0 0 40px rgba(255, 255, 255, 0.1);
                }
              }
              
              .cup-hover-glow:hover {
                transform: scale(1.2);
                filter: blur(3px);
                box-shadow: 0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.4), 0 0 90px rgba(255, 255, 255, 0.2), 0 0 120px rgba(255, 255, 255, 0.1);
                transition: all 0.3s ease-in-out;
              }
              
              .phone-glow {
                animation: phoneGlow 3s ease-in-out infinite;
              }
              
              @keyframes phoneGlow {
                0%, 100% {
                  box-shadow: 0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.2), 0 0 80px rgba(255, 255, 255, 0.1);
                }
                50% {
                  box-shadow: 0 0 40px rgba(255, 255, 255, 0.6), 0 0 80px rgba(255, 255, 255, 0.4), 0 0 120px rgba(255, 255, 255, 0.3), 0 0 160px rgba(255, 255, 255, 0.1);
                }
              }
            `}</style>

          {/* ESC key indicator when zoomed */}
          {laptopZoomed && (
            <div
              className="absolute z-30 text-white px-1.5 py-0.5 text-xs font-bold"
              style={{
                pointerEvents: 'none',
                left: '40%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '34px',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)'
              }}
            >
              Press ESC to zoom out
            </div>
          )}

          {/* Lesley Letter Overlay */}
          {showLesleyLetter && (
            <div className="fixed inset-0 z-50">
              {/* Glass background blur - more transparent */}
              <div 
                className="absolute inset-0"
                style={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.15)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)'
                }}
                onClick={() => setShowLesleyLetter(false)}
              />
              
              {/* Return to Desk button - top left */}
              <button
                onClick={() => setShowLesleyLetter(false)}
                className="absolute top-6 left-6 z-20 bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-opacity-100 transition-all shadow-lg cursor-pointer return-desk-glow"
              >
                Return to Desk
              </button>
              
              {/* Letter content - centered */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative z-10 bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-2xl max-w-2xl w-full">
                  {/* SVG Letter */}
                  <div className="w-full flex justify-center">
                    <Image
                      src="/lesley.svg"
                      alt="Lesley's Letter"
                      width={600}
                      height={450}
                      className="w-full h-auto object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Videos Overlay */}
          {showVideos && (
            <div className="fixed inset-0 z-50">
              {/* Glass background blur */}
              <div 
                className="absolute inset-0"
                style={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.15)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)'
                }}
                onClick={() => setShowVideos(false)}
              />
              
              {/* Return to Desk button - top left */}
              <button
                onClick={() => setShowVideos(false)}
                className="absolute top-6 left-6 z-20 bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-opacity-100 transition-all shadow-lg cursor-pointer return-desk-glow"
              >
                Return to Desk
              </button>
              
              {/* Videos content - left side */}
              <div className="absolute inset-0 flex items-center justify-between p-16">
                <div className="relative z-10 max-w-2xl">
                  {/* Title */}
                  <h1 className="text-7xl font-serif text-white mb-8 leading-tight">
                    Deep Dive &<br />Exclusive Teachings
                  </h1>
                  
                  {/* Description */}
                  <p className="text-xl text-white mb-12 leading-relaxed opacity-90">
                    Explore profound biblical insights and exclusive teachings that will deepen your understanding of God&apos;s Word. Join us for in-depth discussions, spiritual guidance, and transformative lessons that will enrich your faith journey and strengthen your relationship with Christ.
                  </p>
                  
                  {/* Join Channel Button */}
                  <div className="flex">
                    <Image
                      src="/join-channel-new.svg"
                      alt="Join Channel"
                      width={200}
                      height={60}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => console.log('Join Channel clicked!')}
                    />
                  </div>
                </div>
                
                {/* Phone on the right side */}
                <div className="relative z-10 flex items-end justify-end h-full">
                  <Image
                    src="/passs.png"
                    alt="Phone"
                    width={6000}
                    height={12000}
                    className="object-contain"
                    style={{ transform: 'translateY(20%)' }}
                  />
                </div>
              </div>
            </div>
          )}
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
