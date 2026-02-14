import React from 'react';

export default function NatitudeButton({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="bg-natitude-pink text-black font-black uppercase px-8 py-4 
                 border-2 border-white hover:translate-x-1 hover:translate-y-1 
                 transition-all active:shadow-none shadow-[4px_4px_0px_0px_white]"
    >
      <span className="lowercase">{children}</span>
    </button>
  );
}