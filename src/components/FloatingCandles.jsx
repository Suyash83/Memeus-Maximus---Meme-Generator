const NUM_CANDLES = 12;

const getRandom = (min, max) => Math.random() * (max - min) + min;

const FloatingCandles = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {Array.from({ length: NUM_CANDLES }).map((_, i) => {
        const left = getRandom(5, 95);
        const duration = getRandom(6, 14);
        const delay = getRandom(0, 8);
        const size = getRandom(18, 32);
        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${left}%`,
              animation: `candle-float ${duration}s linear ${delay}s infinite`,
              bottom: `-${size * 2}px`,
            }}
          >
            <div
              className="flex flex-col items-center"
              style={{ width: size, height: size * 2 }}
            >
              <div className="w-2 h-3 rounded-t-full bg-yellow-200 animate-candle-flame shadow-lg" />
              <div className="w-2 h-6 bg-yellow-100 rounded-b-md shadow-md" />
            </div>
          </div>
        );
      })}
      <style>{`
        @keyframes candle-float {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-90vh); opacity: 0; }
        }
        .animate-candle-flame {
          animation: candle-flame 1.2s infinite alternate;
        }
        @keyframes candle-flame {
          0% { opacity: 0.8; transform: scaleY(1) scaleX(1); }
          100% { opacity: 1; transform: scaleY(1.2) scaleX(0.8) rotate(-5deg); }
        }
      `}</style>
    </div>
  );
};

export default FloatingCandles; 