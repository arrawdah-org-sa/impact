import React, { useEffect, useRef } from 'react';
import { initSnow } from '../../utils/snowEffect';

export function SnowCanvas() {
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  useEffect(() => {
    canvasRefs.current.forEach((canvas, index) => {
      if (canvas) {
        initSnow(canvas, index);
      }
    });
  }, []);

  return (
    <div className="snow-container">
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <canvas
          key={num}
          ref={(el) => (canvasRefs.current[num - 1] = el)}
          id={`snow-canvas-${num}`}
          className="snow-canvas"
        />
      ))}
      <div className="clouds-bg" />
    </div>
  );
}