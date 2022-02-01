import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader'
import AudioManager from './audioManager';
import BasicCharacterControls from './playerMovement';
export const buildSolarSystem = () =>
{
    const out = document.querySelector('.WebGL_out')
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    // renderer.setClearColor(0xffffff, 1);
    out.appendChild( renderer.domElement );
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    //load all textures
    const loader = new THREE.TextureLoader();
    const bgTexture = loader.load('/textures/2k_stars_milky_way.jpg');
    const sunTexture = loader.load('/textures/2k_sun.jpg');
    const mercuryTexture = loader.load('/textures/2k_mercury.jpg');
    const venusTexture = loader.load('/textures/2k_venus_atmosphere.jpg');
    const earthTexture = loader.load('/textures/2k_earth_daymap.jpg');
    const marsTexture = loader.load('/textures/2k_mars.jpg');
    const jupiterTexture = loader.load('/textures/2k_jupiter.jpg');
    const saturnTexture = loader.load('/textures/2k_saturn.jpg');
    const uranusTexture = loader.load('/textures/2k_uranus.jpg');
    const neptuneTexture = loader.load('/textures/2k_neptune.jpg');
    

    
    const sunGeo  = new THREE.SphereGeometry();
    const sunMat = new THREE.MeshStandardMaterial( { map: sunTexture } );
    const sun = new THREE.Mesh( sunGeo, sunMat );
    scene.add( sun );

    scene.background = bgTexture;
    camera.position.z = 5;
    controls.update();
    const light = new THREE.AmbientLight(0xffffff,1);
    const earthGeo = new THREE.SphereGeometry(1);
    const earthMat = new THREE.MeshStandardMaterial({map: earthTexture});
    const earth = new THREE.Mesh(earthGeo, earthMat);
    scene.add(light);
    scene.add(earth);

    const createCelestial = (size, texture) => {
      const celestialGEO = new THREE.SphereGeometry(size);
      const celestialMAT = new THREE.MeshStandardMaterial({map: texture});
      return new THREE.Mesh(celestialGEO, celestialMAT);
    }
    const mercury = createCelestial(.5, mercuryTexture);
    const venus = createCelestial(0.94, venusTexture);
    const mars = createCelestial(0.94, marsTexture);
    const jupiter = createCelestial(0.94, jupiterTexture);
    const saturn = createCelestial(0.94, saturnTexture);
    const uranus = createCelestial(0.94, uranusTexture);
    const neptune = createCelestial(0.94, neptuneTexture);
    scene.add(mercury);
    scene.add(venus);
    scene.add(mars);
    scene.add(jupiter);
    scene.add(saturn);
    scene.add(uranus);
    scene.add(neptune);

    let t = 0, tMer = 0;
    const circularMovement = (celestial, rotationPeriod = 0.001, distance, t) => {
      celestial.rotation.y += rotationPeriod;
      celestial.position.x = distance * Math.cos(t) + 0;
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
        controls.update();
        //20 - 1AU = 150 mln km
        circularMovement(mercury, 0.00085, 7.8, t);
        circularMovement(venus, 0.00085, 14.4, t);
        circularMovement(earth, 0.001, 20, t);
        circularMovement(mars, 0.00085, 30.4, t);
        circularMovement(jupiter, 0.00085, 104, t);
        circularMovement(saturn, 0.00085, 190.6, t);
        circularMovement(uranus, 0.00085, 383.8, t);
        circularMovement(neptune, 0.00085, 600, t);
        renderer.render( scene, camera );
    };
    animate();

    const LoadModel = () => {
      const loader = new FBXLoader();
      loader.setPath('./textures/');
      loader.load('SciFi_Fighter_AK5.FBX', fbx =>{
        fbx.scale.setScalar(0.1);
        
        const params = {
          target: fbx,
          camera: camera
        }
        this._controls = new BasicCharacterControls(params)
        scene.add(fbx);
      });

    }
    LoadModel();
    window.addEventListener(
        'resize',
        function() {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize( window.innerWidth, window.innerHeight );
          renderer.render( scene, camera );
        },
        );
        const btn = document.querySelector('.audioBTN');
        const audioManager = new AudioManager('/sounds/ambient.mp3', '/sounds/impact.mp3');
        window.addEventListener('keydown', (e) =>
        {
          switch (e.key)
          {
            case 'a':
              camera.rotation.y += 5;
          }
        });
        out.addEventListener('mouseover', audioManager.playAmbient.bind(audioManager));
        btn.addEventListener('click', audioManager.playInteraction.bind(audioManager));


}
