import { supabase } from "@/lib/supabase";
// note the capital 'N' — react needs this to recognize it as a component
import NatitudeButton from "../components/ui/button";
import EventCard from "../components/eventcard";

export default async function home() {
  // 1. fetch data from the 'events' table in supabase
  // we use 'await' because fetching data takes a second
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  // if there's a problem with the database, we'll see it in your terminal
  if (error) {
    console.error('database error:', error.message);
  }

  return (
    <main className="min-h-screen bg-natitude-black text-white p-6 md:p-12">
      {/* magazine header - the 'hook' */}
      <header className="border-b-3 border-white pb-8 mb-12">
        <h1 className="text-6xl md:text-9xl font-black lowercase tracking-tighter">
          natitude <span className="text-natitude-pink italic">club</span>
        </h1>
        <p className="text-xl md:text-2xl mt-4 max-w-2xl font-light lowercase">
          a high-end experience vandalised by digital chaos. 
          established 2026. london.
        </p>
      </header>

      {/* hero section - the 'vibe' */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div className="space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold leading-none lowercase">
            the night <br /> 
            is ours to <br /> 
            <span className="bg-natitude-pink text-black px-2">reclaim</span>
          </h2>
          {/* using the capital N NatitudeButton component */}
          <NatitudeButton>book a table</NatitudeButton>
        </div>

        {/* placeholder for imagery / video */}
        <div className="aspect-[4/5] bg-natitude-gray border-3 border-white relative overflow-hidden group">
           <div className="absolute inset-0 flex items-center justify-center text-natitude-gray group-hover:text-natitude-pink transition-colors">
              <span className="text-8xl font-black lowercase">[video]</span>
           </div>
        </div>
      </section>

      {/* event feed - the 'utility' */}
      <section>
        <h2 className="text-3xl font-black lowercase mb-8 border-l-4 border-natitude-pink pl-4">
          upcoming nights
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* loop through the events array we got from supabase */}
          {events && events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}

          {/* this shows up if your database table is empty */}
          {(!events || events.length === 0) && (
            <p className="lowercase text-gray-500 italic">
              no events scheduled yet. check back soon.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}