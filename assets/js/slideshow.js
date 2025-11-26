document.addEventListener('DOMContentLoaded', function () {
  let currentFace = 0;
  const cube = document.getElementById('cube');
  const tiltWrapper = document.getElementById('tilt-wrapper');
  

  function updateCube() {
    const rotationY = -currentFace * 90;
    cube.style.transform = `rotateY(${rotationY}deg)`;
  }

  document.getElementById('arrow-left').addEventListener('click', () => {
    currentFace--;
    updateCube();
  });

  document.getElementById('arrow-right').addEventListener('click', () => {
    currentFace++;
    updateCube();
  });

  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    const tiltX = (y - 0.5) * 20; 
    const tiltY = (x - 0.5) * 20; 

    tiltWrapper.style.transform = `rotateX(${-tiltX}deg) rotateY(${tiltY}deg)`;
  });
  
  if(window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (event) => {
      if (!event.beta) return;
      const tiltX = Math.min(Math.max(event.beta - 45, -20), 20); 
      const tiltY = Math.min(Math.max(event.gamma, -20), 20);
      tiltWrapper.style.transform = `rotateX(${-tiltX}deg) rotateY(${tiltY}deg)`;
    });
  }
});
