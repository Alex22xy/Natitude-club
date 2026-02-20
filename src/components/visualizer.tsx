"use client";

export default function Visualizer() {
  // We create an array of 20 bars
  const bars = Array.from({ length: 20 });

  return (
    <div className="flex items-end justify-center gap-[2px] h-8 w-full transition-opacity duration-1000">
      {bars.map((_, i) => (
        <div
          key={i}
          className="w-[2px] bg-natitude-pink/40 rounded-full animate-visualizer"
          style={{
            height: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.05}s`,
            animationDuration: `${0.5 + Math.random() * 0.7}s`
          }}
        />
      ))}
    </div>
  );
}