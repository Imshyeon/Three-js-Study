import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 장면
const scene = new THREE.Scene();
scene.background = new THREE.Color();

// 카메라
const fov = 120; // 시야각,화각
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0)
camera.lookAt(new THREE.Vector3(0, 0, 0)); // 카메라가 위치가 어디든 해당 방향을 보고 있게 함.

// 렌더러
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 20; // 마우스 휠로 조작 시 줌인 최소값
controls.maxDistance = 800; // 마우스 휠로 조작 시 줌아웃 최소값
controls.maxPolarAngle = Math.PI / 2; // 각도 제한 => 보기 적당한 위치에서 더이상 각도가 넘어지 않게 함.
controls.update()

const texture = new THREE.TextureLoader().load('../img/skybox/barren_rt.jpg')

// 도형 추가
const skyGeometry = new THREE.BoxGeometry(400, 400, 400);
const skyMaterial = new THREE.MeshStandardMaterial({
    // color: 0x333333,
    map: texture
})
skyMaterial.side = THREE.BackSide
const sky = new THREE.Mesh(skyGeometry, skyMaterial)
scene.add(sky)

// 2. DirectionalLight
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)


function animate() {
    requestAnimationFrame(animate);
    controls.update()
    renderer.render(scene, camera);
}
animate();

// 반응형 처리
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight; // 종횡비 가변 처리
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

// renderer.render(scene, camera);

