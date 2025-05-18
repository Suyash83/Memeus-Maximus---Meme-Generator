import { useEffect, useRef } from 'react';

const MemeDisplay = ({ image, topText, bottomText }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!image) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw image
      ctx.drawImage(img, 0, 0);
      
      // Draw watermark text (large, semi-transparent, centered)
      ctx.save();
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.font = `bold ${Math.floor(canvas.width / 7)}px Cinzel, serif`;
      if (topText) {
        ctx.fillText(topText, canvas.width / 2, canvas.height / 2.5);
      }
      if (bottomText) {
        ctx.fillText(bottomText, canvas.width / 2, canvas.height / 1.4);
      }
      ctx.restore();

      // Draw main meme text (smaller, outlined, on top)
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 4;
      ctx.textAlign = 'center';
      ctx.font = 'bold 48px "Cinzel", serif';
      if (topText) {
        ctx.strokeText(topText, canvas.width / 2, 60);
        ctx.fillText(topText, canvas.width / 2, 60);
      }
      if (bottomText) {
        ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
        ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
      }
    };
    
    img.src = image;
  }, [image, topText, bottomText]);

  if (!image) return null;

  return (
    <div className="relative group">
      <canvas
        ref={canvasRef}
        className="max-w-full rounded-lg shadow-xl transform transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
    </div>
  );
};

export default MemeDisplay; 