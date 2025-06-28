"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface StartMenuProps {
  onAskQuestionClick: () => void;
  onResourcesClick: () => void;
}

const StartMenu = ({ onAskQuestionClick, onResourcesClick }: StartMenuProps) => {
  const [activeTab, setActiveTab] = useState('All');
  const router = useRouter();

  const handleHomeClick = () => {
    router.push('/experience');
  };

  return (
    <div className="start-menu fixed bottom-24 left-1/2 -translate-x-1/2 z-40 opacity-0 transform translate-y-full">
      <div className="w-[700px] min-h-[600px] bg-[#202124] rounded-xl border border-gray-700/50 p-6 flex flex-col items-center shadow-2xl">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Type here to search"
            className="w-full h-10 px-4 bg-[#1E1E1E]/[0.7] border border-white/[.07] rounded text-gray-200 placeholder:text-gray-400 focus:outline-none"
          />
           <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#60CDFF]"></div>
        </div>

        <div className="w-full mt-6 flex items-center space-x-6 text-gray-300">
          <div className="relative">
            <button 
              onClick={() => setActiveTab('All')}
              className={`pb-2 font-medium ${activeTab === 'All' ? 'text-white' : ''}`}
            >
              All
            </button>
            {activeTab === 'All' && (
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#60CDFF] rounded-full"></div>
            )}
          </div>
          <div className="relative">
            <button 
              onClick={() => setActiveTab('Links')}
              className={`pb-2 font-medium ${activeTab === 'Links' ? 'text-white' : ''}`}
            >
              Links
            </button>
            {activeTab === 'Links' && (
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#60CDFF] rounded-full"></div>
            )}
          </div>
        </div>

        <div className="w-full mt-8">
          <h3 className="text-white font-semibold text-base">Top apps</h3>
          <div className="mt-4 flex gap-[4px]">
            <button className="transition hover:brightness-110 cursor-pointer" onClick={handleHomeClick}>
              <Image src="/windows/menu-gohome.svg" width={120} height={64} alt="Go Back Home" />
            </button>
            <button onClick={onAskQuestionClick} className="transition hover:brightness-110 cursor-pointer">
              <Image src="/windows/menu-question.svg" width={120} height={64} alt="Ask Me A Question" />
            </button>
            <button onClick={onResourcesClick} className="transition hover:brightness-110 cursor-pointer">
              <Image src="/windows/menu-resources.svg" width={120} height={64} alt="Resources" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StartMenu; 