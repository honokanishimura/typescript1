// src/components/ParticlesBackground.tsx
import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';

// ✅ propsの型定義を追加
type Props = {
  className?: string;
};

const ParticlesBackground = ({ className = '' }: Props) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full h-full z-0 pointer-events-none ${className}`}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: {
            enable: true,
            zIndex: 0,
          },
          background: {
            color: '#fffefb',
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: 'repulse' },
              resize: true,
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
            },
          },
          particles: {
            number: {
              value: 45,
              density: { enable: true, area: 800 },
            },
            color: {
              value: ['#fce7d6', '#fcd5ce', '#fff1e6'],
            },
            links: {
              enable: true,
              color: '#fcd5ce',
              distance: 120,
              opacity: 0.3,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
              direction: 'none',
              outModes: { default: 'bounce' },
            },
            shape: { type: 'circle' },
            opacity: { value: 0.5 },
            size: { value: 3 },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default ParticlesBackground;
