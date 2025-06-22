import React from 'react';
import Particles from 'react-tsparticles';
import { loadBasic } from 'tsparticles-basic';

function ParticlesBackground() {
  const particlesInit = async (engine) => {
    await loadBasic(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "#000",
        },
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: {
            value: 0.5,
            random: false,
          },
          size: {
            value: { min: 1, max: 5 },
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            outModes: "out",
          },
        },
      }}
    />
  );
}

export default ParticlesBackground;
