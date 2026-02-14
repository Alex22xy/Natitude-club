// src/components/eventcard.tsx
export default function eventcard({ event }: { event: any }) {
  return (
    <div className="brutalist-card group cursor-pointer transition-all hover:translate-x-[-4px] hover:translate-y-[-4px]">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-black lowercase">{event.title}</h3>
        <span className="bg-white text-black px-2 py-1 font-bold text-sm lowercase">
          £{event.price}
        </span>
      </div>
      
      <p className="text-gray-400 lowercase mb-6">
        {new Date(event.date).toLocaleDateString()} — doors at 10pm
      </p>

      {/* this button doesn't do anything yet, just looks good */}
      <div className="w-full py-2 border-2 border-white text-center font-bold uppercase group-hover:bg-natitude-pink group-hover:text-black transition-colors">
        get ticket
      </div>
    </div>
  );
}