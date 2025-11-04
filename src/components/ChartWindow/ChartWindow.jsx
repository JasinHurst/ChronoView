import React, { useState, useRef, useEffect } from 'react';
import './ChartWindow.css';



const ChartWindow = () => {
  const [size, setSize] = useState({ width: 1750, height: 800 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [locked, setLocked] = useState(true);
  const chartRef = useRef(null);
  const initialized = useRef(false);

  // ✅ Center only once on mount
  useEffect(() => {
    if (initialized.current) return;
    const centerX = (window.innerWidth - size.width) / 2;
    const centerY = (window.innerHeight - size.height) / 2 + 50; // adjust offset manually
    setPosition({ x: centerX, y: centerY });
    initialized.current = true;
  }, [size.width, size.height]);

  // ----- Dragging -----
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const startDrag = (e) => {
    if (locked) return;
    isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', stopDrag);
  };

  const onDrag = (e) => {
    if (!isDragging.current) return;
    setPosition({
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y,
    });
  };

  const stopDrag = () => {
    isDragging.current = false;
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', stopDrag);
  };

  // ----- Resizing -----
  const startResize = (e) => {
    if (locked) return;
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = chartRef.current.offsetWidth;
    const startHeight = chartRef.current.offsetHeight;

    const onMouseMove = (e) => {
      setSize({
        width: Math.max(600, startWidth + e.clientX - startX),
        height: Math.max(400, startHeight + e.clientY - startY),
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
      ref={chartRef}
      style={{
        width: size.width,
        height: size.height,
        position: 'fixed',
        top: `${position.y}px`,
        left: `${position.x}px`,
        cursor: locked ? 'default' : 'move',
      }}
      onMouseDown={startDrag}
    >
      <canvas id="astroChart" width={size.width} height={size.height}></canvas>

      {!locked && <div className="resize-handle" onMouseDown={startResize}></div>}

      <div className="button-group">
        <button className="detach-btn" onClick={() => setLocked(false)}>
          Detach
        </button>
        <button className="lock-btn" onClick={() => setLocked(true)}>
          Lock
        </button>
      </div>
    </div>
  );
};

export default ChartWindow;
