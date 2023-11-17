import * as THREE from 'three';

// 장면
const scene = new THREE.Scene();
scene.background = new THREE.Color();

// 카메라
const fov = 120; // 시야각,화각
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,1,2)
camera.lookAt(new THREE.Vector3(0,0,0)); // 카메라가 위치가 어디든 해당 방향을 보고 있게 함.

// 렌더러
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);




// 빛
// 1. AmbientLight
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight)


// 2. DirectionalLight
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(1,1,1) // 빛이 우측으로 이동
const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5, 0x0000ff)
// scene.add(dlHelper)
// scene.add(directionalLight)


// 3. HemisphereLight
const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 1)
// scene.add(hemisphereLight)


// 4. PointLight
const pointLight = new THREE.PointLight(0xffffff,1)
const plHelper = new THREE.PointLightHelper(pointLight, 0.5)
pointLight.position.set(-1,0.5,0.5)
// scene.add(pointLight)
// scene.add(plHelper)


// 5. RectAreaLight
const rectAreaLight = new THREE.RectAreaLight(0xffffff, 2, 1, 0.5)
// scene.add(rectAreaLight)
rectAreaLight.position.set(0.5,0.5,1)
rectAreaLight.lookAt(0,0,0) // 0,0,0을 향해 빛을 쏨


// 6. SpotLight
const spotLight = new THREE.SpotLight(0xffffff,0.5)
scene.add(spotLight)


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

