import React, { useState, useRef, useEffect } from 'react';
import './ChartWindow.css';

const ChartWindow = () => {
  const [size, setSize] = useState({ width: 500, height: 500 });
  const chartRef = useRef(null);

  useEffect(() => {
    // here you could draw or update your chart dynamically
  }, [size]);

  const startResize = (e) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = chartRef.current.offsetWidth;
    const startHeight = chartRef.current.offsetHeight;

    const onMouseMove = (e) => {
      setSize({
        width: Math.max(300, startWidth + e.clientX - startX),
        height: Math.max(300, startHeight + e.clientY - startY),
      });
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      className="chart-window"
      style={{ width: size.width, height: size.height }}
      ref={chartRef}
    >
      <canvas id="astroChart" width={size.width} height={size.height}></canvas>
      <div className="resize-handle" onMouseDown={startResize}></div>
    </div>
  );
};

export default ChartWindow;
