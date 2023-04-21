import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

var clock = new THREE.Clock();
var mixer;
var character;

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xdddddd)
scene.add(new THREE.AxesHelper(5))

const light = new THREE.DirectionalLight(0xffffff, 5.0)
light.position.set(0.5, 1, 0.5)
scene.add(light)

scene.fog = new THREE.Fog( 0xdddddd, 25, 150);

const geo = new THREE.PlaneBufferGeometry(2000, 2000);
const mat = new THREE.MeshBasicMaterial({ color: 0x707070, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geo, mat);
plane.rotation.set(Math.PI/2, 0.0, 0.0)

const gridHelper = new THREE.GridHelper( 2000, 4000 );
//gridHelper.rotation.set(Math.PI/2, 0.0, 0.0)
scene.add(gridHelper)

scene.add(plane);

const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.set(3.0, 1.4, 3.0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.set(0, 1, 0)


const loader = new FBXLoader();
export async function loadFbx(fbxPath){
    document.getElementById('text_input').value = "";
    document.getElementById('button').disabled = true;
    if (character) {
        scene.remove(character);    
    }
    character = await loader.loadAsync(fbxPath);
    console.log(character);
    character.scale.set(0.01, 0.01, 0.01);
    scene.add(character);
    document.getElementById('button').disabled = false;

    const values = character.animations[0].tracks[1].values;
    const x0 = values[0];
    const y0 = 0; //values[1];
    const z0 = values[2];

    character.animations[0].tracks[1].values = values.map((value, index) => {
        if (index % 3 == 0) {return value - x0}
        if (index % 3 == 1) {return value - y0}
        if (index % 3 == 2) {return value - z0}
    })

    mixer = new THREE.AnimationMixer(character);
    const clips = character.animations;
    function update () {
	mixer.update( deltaSeconds );
    }
    clips.forEach( function ( clip ) {
	mixer.clipAction( clip ).play();
    } );

}
window.loadFbx = loadFbx;

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)
    controls.update()
    var delta = clock.getDelta();
    if ( mixer ) mixer.update( delta );
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()
