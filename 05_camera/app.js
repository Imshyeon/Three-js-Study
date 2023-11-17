import * as THREE from 'three';

// 장면
const scene = new THREE.Scene();
scene.background = new THREE.Color();

// 카메라
const fov = 63; // 시야각,화각
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,0,2)
camera.lookAt(new THREE.Vector3(0,0,0)); // 카메라가 위치가 어디든 해당 방향을 보고 있게 함.

// 렌더러
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 빛
// const pointLight = new THREE.PointLight(0xffffff, 1) //color, 세기
// pointLight.position.set(0,2,12)
// scene.add(pointLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 0, 1);
scene.add(directionalLight);

// 도형 추가
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5); // x, y, z
const material = new THREE.MeshStandardMaterial({
    color: 0x79E5CB,
})
const cube = new THREE.Mesh(geometry, material)
cube.rotation.y = 0.5;
scene.add(cube)

// 바닥 추가
const planeGeoemtry = new THREE.PlaneGeometry(30,30,1,1);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xeeeeee
});
const plane = new THREE.Mesh(planeGeoemtry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -0.5;
scene.add(plane)


function render(time) {
    time *= 0.0005;  // convert time to seconds

    cube.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}
requestAnimationFrame(render);

// 반응형 처리
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight; // 종횡비 가변 처리
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

// renderer.render(scene, camera);

