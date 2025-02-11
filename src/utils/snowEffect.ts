interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
}

export function initSnow(canvas: HTMLCanvasElement, layerIndex: number) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Set canvas size
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Create snowflakes with reduced numbers and opacity
  const snowflakes: Snowflake[] = [];
  const numberOfSnowflakes = 15 * (layerIndex + 1); // Reduced from 50 to 15
  const baseSpeed = 0.1 + (layerIndex * 0.05); // Reduced speed

  for (let i = 0; i < numberOfSnowflakes; i++) {
    snowflakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5, // Smaller radius
      speed: Math.random() * baseSpeed + baseSpeed,
      opacity: Math.random() * 0.2 + 0.05 // Reduced opacity
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFFFFF';

    snowflakes.forEach(flake => {
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      ctx.globalAlpha = flake.opacity;
      ctx.fill();

      // Update position with gentler movement
      flake.y += flake.speed;
      flake.x += Math.sin(flake.y / 50) * 0.3; // Gentler horizontal movement

      // Reset position if snowflake goes off screen
      if (flake.y > canvas.height) {
        flake.y = -5;
        flake.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(animate);
  }

  animate();

  return () => {
    window.removeEventListener('resize', resizeCanvas);
  };
}