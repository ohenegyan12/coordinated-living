"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

interface AskAQuestionProps {
  onClose: () => void;
}

const AskAQuestion = ({ onClose }: AskAQuestionProps) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [userEmail, setUserEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleCardClick = (newSubject: string, newMessage: string) => {
    setSubject(newSubject);
    setMessage(newMessage);
  };

  const handleSend = () => {
    if (!userEmail || !subject || !message) {
      alert('Please fill in all fields');
      return;
    }

    // Create mailto link with all the information
    const mailtoLink = `mailto:thecoordinatedliving@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${userEmail}\n\n${message}`)}`;
    
    // Open the default email client
    window.open(mailtoLink);
  };

  useEffect(() => {
    gsap.fromTo(
      windowRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
    );
  }, []);

  const handleClose = () => {
    gsap.to(windowRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: onClose,
    });
  };

  return (
    <div ref={windowRef} className="absolute inset-x-0 top-0 bottom-16 bg-black/30 flex items-center justify-center z-50 opacity-0">
      <div className="w-[80vw] h-[90vh] max-w-[1400px] bg-white rounded-lg shadow-2xl flex flex-col">
        {/* Browser Chrome */}
        <div className="bg-[#F1F3F4] rounded-t-lg">
            <div className="flex items-center justify-between pl-2 pt-1">
                <div className="flex-1">
                    <Image src="/broswer/Tabs.svg" width={250} height={32} alt="Browser tabs" />
                </div>
                {/* Window Controls */}
                <div className="flex items-center space-x-4 px-4">
                     <Image src="/broswer/maximize.svg" width={14} height={14} alt="Maximize" className="cursor-pointer" />
                     <Image src="/broswer/minimize.svg" width={14} height={14} alt="Minimize" className="cursor-pointer" />
              
                      <button onClick={handleClose}>
                          <Image src="/broswer/close.svg" width={14} height={14} alt="Close" className="cursor-pointer" />
                      </button>
                </div>
            </div>
            <div className="bg-white p-2">
                <Image src="/broswer/address-bar.svg" width={1200} height={32} alt="Address bar" className="w-full h-auto" />
            </div>
        </div>

        {/* Gmail UI - Page Content */}
        <div className="flex-1 flex overflow-hidden rounded-b-lg bg-[#F8FAFD]">
          {/* Far Left Navigation */}
          <div className="w-20 pt-4 flex flex-col items-center space-y-4">
              <button className="p-2 rounded-full hover:bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
              </button>
              <button className="w-16 h-14 flex flex-col items-center justify-center rounded-xl">
                  <div className="px-3 py-2 bg-[#5C3262] rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                  </div>
                  <span className="text-xs font-bold text-[#5C3262] mt-2">Mail</span>
              </button>
              <button className="w-16 h-14 flex flex-col items-center justify-center rounded-xl hover:bg-gray-200">
                  <Image src="/broswer/chat.svg" width={32} height={32} alt="Chat" />
                  <span className="text-xs text-gray-600">Chat</span>
              </button>
              <button className="w-16 h-14 flex flex-col items-center justify-center rounded-xl hover:bg-gray-200">
                  <Image src="/broswer/meet.svg" width={32} height={32} alt="Meet" />
                  <span className="text-xs text-gray-600">Meet</span>
              </button>
          </div>

          {/* Main App Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Gmail Banner */}
            <div className="px-4 py-2">
              <Image src="/broswer/gmail-banner.svg" width={1150} height={48} alt="Gmail banner" className="w-full h-auto" />
            </div>
            
            {/* Scrollable Content Area */}
            <div className="flex-1 flex">
              {/* Left Sidebar */}
              <div className="w-64 bg-white p-4">
                 <Image src="/broswer/gmail-navigation-side.svg" width={230} height={350} alt="Gmail Navigation" />
              </div>

              {/* Main Content */}
              <div className="flex-1 bg-white p-4">
                <div className="h-96 w-full flex flex-col rounded-lg shadow-lg border border-gray-200">
                    {/* Header */}
                    <div className="bg-[#F2F6FC] px-4 py-2 flex justify-between items-center rounded-t-lg">
                        <p className="text-sm font-medium text-black">New Message</p>
                        <div className="flex items-center space-x-3">
                            <button>
                                <Image src="/broswer/minimize-message.svg" width={10} height={10} alt="Minimize" />
                            </button>
                            <button>
                                <Image src="/broswer/pop-out.svg" width={10} height={10} alt="Pop-out" />
                            </button>
                            <button>
                                <Image src="/broswer/close-message.svg" width={10} height={10} alt="Close" />
                            </button>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="flex-1 flex flex-col px-4 bg-white">
                        <div className="border-b border-gray-300 py-2">
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                className="w-full text-sm text-black placeholder-gray-500 focus:outline-none bg-transparent"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                        </div>
                        <div className="border-b border-gray-300 py-2">
                            <input 
                                type="text" 
                                placeholder="Subject" 
                                className="w-full text-sm text-black placeholder-gray-900 focus:outline-none bg-transparent"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>
                        <textarea 
                            className="flex-1 w-full py-2 text-sm resize-none text-black focus:outline-none bg-transparent placeholder-gray-900"
                            aria-label="Message body"
                            placeholder="Enter message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                    </div>
                    
                    {/* Footer */}
                    <div className="px-4 py-3 bg-white rounded-b-lg">
                        <button 
                            onClick={handleSend}
                            className="bg-[#5C3262] hover:bg-[#4A2A50] text-white font-bold py-2 px-5 rounded-full flex items-center text-sm transition-all duration-200 hover:scale-105 cursor-pointer"
                        >
                            Send
                            <span className="ml-2 border-l border-white/30 pl-2 text-xs">▼</span>
                        </button>
                    </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="w-72 bg-white p-4 border-l border-gray-200">
                <div className="relative w-full h-full">
                  {/* Base Gemini SVG */}
                  <Image 
                    src="/broswer/Gemini.svg" 
                    width={250} 
                    height={550} 
                    alt="Gemini Section" 
                  />
                  
                  {/* Card 1 - Positioned on top */}
                  <div 
                    onClick={() => handleCardClick('keep it simple and direct', 'What is the context of the parable of the [specific parable]?')} 
                    className="cursor-pointer transition-transform hover:scale-[1.02] absolute"
                    style={{ top: '65px', left: '12px' }}
                  >
                    <Image src="/broswer/keep-it-simple.svg" width={226} height={80} alt="Keep it simple and direct" />
                  </div>

                  {/* Card 2 - Positioned on top */}
                  <div 
                    onClick={() => handleCardClick('be honest and open', "I have this feeling, and I don't know if it's from God.")} 
                    className="cursor-pointer transition-transform hover:scale-[1.02] absolute"
                    style={{ top: '155px', left: '12px' }}
                  >
                    <Image src="/broswer/be-honest.svg" width={226} height={80} alt="Be honest and open" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AskAQuestion; 