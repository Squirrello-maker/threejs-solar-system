import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {FirstPersonControls} from 'three/examples/jsm/controls/FirstPersonControls.js';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader'
import AudioManager from './audioManager';
export const buildSolarSystem = () =>
{
    const out = document.querySelector('.WebGL_out')
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    out.appendChild( renderer.domElement );
    const controls = new OrbitControls(camera, renderer.domElement);
    // const FPPContrls = new FirstPersonControls(camera,renderer.domElement);
    const clock = new THREE.Clock();
    // FPPContrls.movementSpeed = 20;
    // FPPContrls.lookSpeed = .2;
    //load all textures
    const loader = new THREE.TextureLoader();
    const sunTexture = loader.load('/textures/2k_sun.jpg');
    const mercuryTexture = loader.load('/textures/2k_mercury.jpg');
    const venusTexture = loader.load('/textures/2k_venus_atmosphere.jpg');
    const earthTexture = loader.load('/textures/2k_earth_daymap.jpg');
    const marsTexture = loader.load('/textures/2k_mars.jpg');
    const jupiterTexture = loader.load('/textures/2k_jupiter.jpg');
    const saturnTexture = loader.load('/textures/2k_saturn.jpg');
    const uranusTexture = loader.load('/textures/2k_uranus.jpg');
    const neptuneTexture = loader.load('/textures/2k_neptune.jpg');
    

    
    const sunGeo  = new THREE.SphereGeometry(100);
    const sunMat = new THREE.MeshStandardMaterial( { map: sunTexture } );
    const sun = new THREE.Mesh( sunGeo, sunMat );
    sun.position.x = -30;
    scene.add( sun );

    const cubeLoader = new THREE.CubeTextureLoader();
    const bgTexture = cubeLoader.load([
      '/textures/2k_stars_milky_way_Right.bmp',
      '/textures/2k_stars_milky_way_Left.bmp',
      '/textures/2k_stars_milky_way_Top.bmp',
      '/textures/2k_stars_milky_way_Bottom.bmp',
      '/textures/2k_stars_milky_way_Front.bmp',
      '/textures/2k_stars_milky_way_Back.bmp',
    ]);

    scene.background = bgTexture;
    camera.position.z = 5;
    // FPPContrls.update(clock.getDelta());
    const light = new THREE.AmbientLight(0xffffff,1);
    scene.add(light);
    scene.add(earth);

    const createCelestial = (size, texture) => {
      const celestialGEO = new THREE.SphereGeometry(size);
      const celestialMAT = new THREE.MeshStandardMaterial({map: texture});
      return new THREE.Mesh(celestialGEO, celestialMAT);
    }
    const mercury = createCelestial(1.5, mercuryTexture);
    const venus = createCelestial(2.82, venusTexture);
    const earth = createCelestial(3, earthTexture)
    const mars = createCelestial(1.6, marsTexture);
    const jupiter = createCelestial(33, jupiterTexture);
    const saturn = createCelestial(27, saturnTexture);
    const uranus = createCelestial(12, uranusTexture);
    const neptune = createCelestial(9, neptuneTexture);
    scene.add(mercury);
    scene.add(venus);
    scene.add(earth)
    scene.add(mars);
    scene.add(jupiter);
    scene.add(saturn);
    scene.add(uranus);
    scene.add(neptune);

    let t = 0, tMer = 0;
    const circularMovement = (celestial, rotationPeriod = 0.001, distance, t) => {
      celestial.rotation.y += rotationPeriod;
      celestial.position.x = distance * Math.cos(t)  + 0;
      celestial.position.z = distance * Math.sin(t) + 0;
    }
    const animate = function () {
      requestAnimationFrame( animate );
      if(t >= 6.28)
      {
        t = 0;
      }
      t +=0.00024; //1 day
      tMer+=0.001;
        sun.rotation.y += 0.001;
        // FPPContrls.update(clock.getDelta());
        controls.update();
        circularMovement(mercury, 0.00085, 150, t);
        circularMovement(venus, 0.00085, 108, t);
        circularMovement(earth, 0.001, 150, t);
        circularMovement(mars, 0.00085, 228, t);
        circularMovement(jupiter, 0.00085, 778, t);
        circularMovement(saturn, 0.00085, 1426, t);
        circularMovement(uranus, 0.00085, 2780, t);
        circularMovement(neptune, 0.00085, 4500, t);
        renderer.render( scene, camera );
    };
    animate();
    window.addEventListener(
        'resize',
        function() {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize( window.innerWidth, window.innerHeight );
          renderer.render( scene, camera );
          FPPContrls.handleResize();
        },
        );
    window.addEventListener('keydown', e =>
    {
      switch (e.key)
      {
        case 'Shift':
          FPPContrls.movementSpeed = 50;
          break;
      }
    });
    window.addEventListener('keyup', e =>
    {
      switch (e.key)
      {
        case 'Shift':
          FPPContrls.movementSpeed = 20;
          break;
      }
    });
        const btn = document.querySelector('.audioBTN');
        const audioManager = new AudioManager('/sounds/ambient.mp3', '/sounds/impact.mp3');
        out.addEventListener('mouseover', audioManager.playAmbient.bind(audioManager));
        btn.addEventListener('click', audioManager.playInteraction.bind(audioManager));


}
