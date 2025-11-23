document.addEventListener('DOMContentLoaded', function () {
  let currentFace = 0;
  let faces = 4;
  cube = document.getElementById('cube');


  function showFace(faceIndex) {
    currentFace = faceIndex;
    updateCube();
  }

  function nextFace() {
    console.log('Next face');
    currentFace = (currentFace + 1) % faces;
    updateCube();
  }


  function updateCube() {
    const rotationY = -currentFace * 90 - 12;
    cube.style.transform = `rotateY(${rotationY}deg)`;
  }
});

