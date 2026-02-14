export default function EventCard({ event }: { event: any }) {
  return (
    <div className="brutalist-card group transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] border-2 border-white p-4 bg-black relative shadow-[4px_4px_0px_0px_#FF00FF]">
      
      {/* 1. Header with Title and Price */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-black lowercase text-white">
          {event.title}
        </h3>
        <span className="bg-white text-black px-2 py-1 font-bold text-sm lowercase">
          £{event.price}
        </span>
      </div>
      
      {/* 2. Date Section */}
      <p className="text-gray-400 text-sm lowercase mb-6">
        {event.date} — doors at 10pm
      </p>

      {/* 3. The Working SumUp Link */}
      <a 
        href={event.payment_link || "#"} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full py-2 border-2 border-white text-center font-bold uppercase text-white hover:bg-natitude-pink hover:text-black transition-colors cursor-pointer"
      >
        get ticket
      </a>
    </div>
  );
}