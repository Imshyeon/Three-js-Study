import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const FogColor = 0x004fff;
const objColor = 0xffffff;
const FloorColor = 0x555555;

// 장면
const scene = new THREE.Scene();
scene.background = new THREE.Color(FogColor);
scene.fog = new THREE.Fog(FogColor, 1, 8)

// 카메라
const fov = 120; // 시야각,화각
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,2,1.8)
camera.lookAt(new THREE.Vector3(0,0,0)); // 카메라가 위치가 어디든 해당 방향을 보고 있게 함.

// 렌더러
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 2; // 마우스 휠로 조작 시 줌인 최소값
controls.maxDistance = 7; // 마우스 휠로 조작 시 줌아웃 최소값
controls.maxPolarAngle = Math.PI / 2; // 각도 제한 => 보기 적당한 위치에서 더이상 각도가 넘어지 않게 함.
controls.update()


// 그림자 추가
renderer.shadowMap.enabled = true // 렌더러 자체에 그림자 추가하겠다!

// 2. DirectionalLight
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(-1.5, 2 ,1) 
const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5, 0x0000ff)
scene.add(dlHelper)
scene.add(directionalLight)
directionalLight.castShadow = true; // 그림자 O
directionalLight.shadow.mapSize.width = 1024; // 그림자 해상도 높이기
directionalLight.shadow.mapSize.height = 2048; // 그림자 해상도 높이기
directionalLight.shadow.radius = 8; // 그림자에 블러 처리

// 도형 추가
const geometry = new THREE.TorusGeometry(0.7, 0.3, 12, 80); 
const material = new THREE.MeshStandardMaterial({
    color: objColor,
})
const obj = new THREE.Mesh(geometry, material)
obj.position.z = -1;
obj.position.y = 1;
scene.add(obj)

// castShadow
obj.castShadow = true;

// 바닥 추가
const planeGeoemtry = new THREE.PlaneGeometry(20,20,1,1);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: FloorColor
});
const plane = new THREE.Mesh(planeGeoemtry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -0.5;
scene.add(plane)

// receiveShadow
plane.receiveShadow = true


function animate() {
	requestAnimationFrame( animate );
    obj.rotation.y += 0.01;
	controls.update();
	renderer.render( scene, camera );
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

