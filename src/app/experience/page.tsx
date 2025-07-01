"use client";
import { useRef, useEffect, useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';

const ExperiencePage = () => {
  const pcRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const noticeBoardRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isPhoneViewOpen, setIsPhoneViewOpen] = useState(false);
  const [isPhoneAnimating, setIsPhoneAnimating] = useState(false);
  const letterModalRef = useRef<HTMLDivElement>(null);
  const phoneModalRef = useRef<HTMLDivElement>(null);

  // Smooth fade-in effect when page loads
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 0.8, 
          ease: 'power2.inOut' 
        }
      );
    }
  }, []);

  const handlePCClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('PC clicked! Starting screen zoom...');
    
    if (!pcRef.current) {
      console.error('PC ref not found!');
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        console.log('Screen zoom complete! Navigating to /windows...');
        router.push('/windows');
      }
    });

    // A single, smooth zoom-out that fades to black
    tl.to(containerRef.current, {
      scale: 2.5,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.in'
    });
  };

  const handleNoticeBoardClick = () => {
    if (!containerRef.current) return;

    gsap.timeline({
      onComplete: () => {
        router.push('/readnotice');
      }
    })
    .to(containerRef.current, {
      scale: 1.8,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.in',
      transformOrigin: 'center 25%'
    });
  };

  const handleEnvelopeClick = () => {
    setIsLetterOpen(true);
  };

  const handlePhoneClick = () => {
    if (isPhoneAnimating) return; // Prevent multiple clicks during animation
    
    setIsPhoneAnimating(true);
    
    // Create timeline for phone animation
    const tl = gsap.timeline({
      onComplete: () => {
        setIsPhoneViewOpen(true);
        setIsPhoneAnimating(false);
      }
    });

    // Step 1: Phone rises up and zooms to center
    tl.to(phoneRef.current, {
      y: '-50vh', // Move up to center of screen
      x: '0', // Center horizontally
      scale: 2.5, // Zoom in
      rotation: 0, // Ensure it's straight
      duration: 1.2,
      ease: 'power2.out',
      transformOrigin: 'center center'
    })
    // Step 2: Continue zooming to "face" level
    .to(phoneRef.current, {
      scale: 4,
      y: '-60vh', // Move slightly higher
      duration: 0.8,
      ease: 'power2.in'
    })
    // Step 3: Fade out phone and fade in modal
    .to(phoneRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    });
  };

  useEffect(() => {
    if (isLetterOpen && letterModalRef.current) {
      gsap.fromTo(letterModalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.inOut' });
    }
  }, [isLetterOpen]);

  useEffect(() => {
    if (isPhoneViewOpen && phoneModalRef.current) {
      gsap.fromTo(phoneModalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.inOut' });
    }
  }, [isPhoneViewOpen]);

  return (
    <div 
      ref={containerRef}
      className="experience-container fixed inset-0 z-0 w-screen h-screen bg-black opacity-0"
      style={{ transformOrigin: 'center 80%' }}
    >
      <Image
        src="/experience.png"
        layout="fill"
        objectFit="cover"
        alt="Experience Background"
      />
      {/* Notice Board on the wall */}
      <div 
        ref={noticeBoardRef}
        className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer notice-board-container"
        onClick={handleNoticeBoardClick}
      >
        <Image
          src="/Notice-board.svg"
          width={1000}
          height={750}
          alt="Notice Board"
          className="drop-shadow-lg"
        />
      </div>
      {/* Windows PC positioned on the table */}
      <div 
        ref={pcRef}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer pc-container"
        onClick={handlePCClick}
        style={{ 
          pointerEvents: 'auto',
          width: '400px',
          height: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div 
          className="w-full h-full flex items-center justify-center"
          style={{ pointerEvents: 'auto' }}
        >
          <Image
            src="/Windows-pc.svg"
            width={400}
            height={300}
            alt="Windows PC"
            className="drop-shadow-2xl windows-pc transition-transform hover:scale-105"
            style={{ pointerEvents: 'none' }}
          />
        </div>
      </div>

      {/* Phone on the table */}
      <div
        ref={phoneRef}
        className="absolute bottom-16 left-1/2 transform translate-x-[273px] z-10 cursor-pointer phone-container"
        onClick={handlePhoneClick}
        style={{ 
          pointerEvents: isPhoneAnimating ? 'none' : 'auto'
        }}
      >
        <Image
          src="/phone.svg"
          width={150}
          height={225}
          alt="A phone on the desk"
          className="drop-shadow-lg"
        />
      </div>

      {/* Envelope on the table */}
      <div
        ref={envelopeRef}
        className="absolute bottom-16 left-[300px] z-10 cursor-pointer envelope-container"
        onClick={handleEnvelopeClick}
      >
        <Image
          src="/letter.svg"
          width={180}
          height={120}
          alt="Envelope"
          className="drop-shadow-lg envelope-glow"
        />
      </div>

      {isLetterOpen && (
        <div 
          ref={letterModalRef}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md opacity-0"
        >
          <div className="relative">
            <Image
              src="/lesley.svg"
              alt="A letter from Lesley"
              width={600}
              height={760}
            />
          </div>
          <button
            onClick={() => setIsLetterOpen(false)}
            className="mt-2 px-6 py-2 bg-white text-black rounded-lg shadow-lg cursor-pointer"
          >
            Return to Desk
          </button>
        </div>
      )}

      {isPhoneViewOpen && (
        <div
          ref={phoneModalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg opacity-0"
        >
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-20">
            {/* Left Content */}
            <div className="text-white max-w-lg">
              <button 
                onClick={() => setIsPhoneViewOpen(false)}
                className="mb-12 px-5 py-2 bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm cursor-pointer"
              >
                Return to Desk
              </button>
              <h1 className="text-7xl font-serif font-bold leading-tight">
                Deep Dive & Exclusive Teachings
              </h1>
              <p className="mt-6 text-lg text-white/80">
                Are you longing for an in-depth exploration of God&apos;s Word and its application to the complexities of life? Our videos, delivered through an exclusive paid WhatsApp channel, provide detailed teaching and deeper insights. Join our community to journey further into understanding how His grace abounds even in the most profound changing scenes of life and cultivate an intimate relationship with the Lord
              </p>
              <button className="mt-8 cursor-pointer">
                <Image 
                  src="/join-channel.svg"
                  alt="Join Channel"
                  width={200}
                  height={60}
                />
              </button>
            </div>

            {/* Right Content - Phone */}
            <div>
              <Image 
                src="/phone-in-view.svg"
                alt="Phone"
                width={400}
                height={800}
              />
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .pc-container {
          animation: shimmer 3s ease-in-out infinite;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .pc-container:hover {
          animation: shimmer 1.5s ease-in-out infinite;
          cursor: pointer;
          filter: drop-shadow(0 0 15px rgba(53, 178, 194, 0.4));
        }
        
        .pc-container * {
          cursor: pointer;
        }
        
        @keyframes shimmer {
          0% {
            filter: drop-shadow(0 0 15px rgba(53, 178, 194, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 25px rgba(53, 178, 194, 0.6)) drop-shadow(0 0 40px rgba(53, 178, 194, 0.3));
          }
          100% {
            filter: drop-shadow(0 0 15px rgba(53, 178, 194, 0.3));
          }
        }

        .notice-board-container {
          animation: notice-shimmer 3s ease-in-out infinite;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .notice-board-container:hover {
            filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.35));
        }

        @keyframes notice-shimmer {
          0% {
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.15));
          }
          50% {
            filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3));
          }
          100% {
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.15));
          }
        }

        .envelope-container {
          /* Removed bounce animation */
        }
        .envelope-glow {
          filter: drop-shadow(0 0 24px rgba(60,180,255,0.5)) drop-shadow(0 2px 8px rgba(0,0,0,0.15));
          transition: filter 0.2s;
        }

        .phone-container {
          animation: phone-shimmer 3s ease-in-out infinite;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .phone-container:hover {
          animation: phone-shimmer 1.5s ease-in-out infinite;
          cursor: pointer;
          filter: drop-shadow(0 0 15px rgba(255, 165, 0, 0.4));
        }
        
        .phone-container * {
          cursor: pointer;
        }
        
        @keyframes phone-shimmer {
          0% {
            filter: drop-shadow(0 0 15px rgba(255, 165, 0, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 25px rgba(255, 165, 0, 0.6)) drop-shadow(0 0 40px rgba(255, 165, 0, 0.3));
          }
          100% {
            filter: drop-shadow(0 0 15px rgba(255, 165, 0, 0.3));
          }
        }
      `}</style>
    </div>
  );
};

export default ExperiencePage;