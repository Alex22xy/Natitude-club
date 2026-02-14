// src/components/eventcard.tsx
export default function EventCard({ event }: { event: any }) {
  return (
    <div className="group border border-white/10 p-6 bg-black/40 backdrop-blur-sm transition-all duration-300 hover:border-natitude-pink/50">
      
      {/* Header: Title and Price */}
      <div className="flex justify-between items-baseline mb-6">
        <h3 className="text-xl font-bold uppercase tracking-[0.2em] text-white">
          {event.title}
        </h3>
        <span className="text-natitude-pink font-mono text-sm">
          £{event.price}
        </span>
      </div>
      
      {/* Date: Minimalist layout */}
      <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mb-10">
        {event.date} — 22:00 til late
      </p>

      {/* Button: Clean outlined style */}
      <a 
        href={event.payment_link || "#"} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full py-3 border border-white/40 text-center text-[10px] uppercase tracking-[0.4em] text-white hover:bg-white hover:text-black transition-all duration-500"
      >
        get ticket
      </a>
    </div>
  );
}