import React, { useState, useRef } from 'react';
import './ChartWindow.css';

const ChartWindow = () => {
  const [size, setSize] = useState({ width: 1750, height: 800 });
  const [locked, setLocked] = useState(false);
  const chartRef = useRef(null);

  const startResize = (e) => {
    if (locked) return;

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
      {!locked && <div className="resize-handle" onMouseDown={startResize}></div>}
      <button className="lock-btn" onClick={() => setLocked(!locked)}>
        {locked ? 'Unlock' : 'Lock'}
      </button>
    </div>
  );
};

export default ChartWindow;
