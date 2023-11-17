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

// 그림자 추가
renderer.shadowMap.enabled = true // 렌더러 자체에 그림자 추가하겠다!



// 빛
// 1. AmbientLight
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight)
// ambientLight.castShadow = true; // 그림자 적용되지 않음..!


// 2. DirectionalLight
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(-0.5,1.5,-0.5) // 빛이 우측으로 이동
const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5, 0x0000ff)
// scene.add(dlHelper)
// scene.add(directionalLight)
// directionalLight.castShadow = true; // 그림자 O
// directionalLight.shadow.mapSize.width = 1024; // 그림자 해상도 높이기
// directionalLight.shadow.mapSize.height = 2048; // 그림자 해상도 높이기


// 3. HemisphereLight
const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 1)
// scene.add(hemisphereLight)


// 4. PointLight
const pointLight = new THREE.PointLight(0xffffff,1)
const plHelper = new THREE.PointLightHelper(pointLight, 0.5)
pointLight.position.set(-1,0.5,0.5)
// scene.add(pointLight)
// scene.add(plHelper)
// pointLight.castShadow = true; //그림자 O


// 5. RectAreaLight
const rectAreaLight = new THREE.RectAreaLight(0xffffff, 2, 1, 0.5)
// scene.add(rectAreaLight)
rectAreaLight.position.set(0.5,0.5,1)
rectAreaLight.lookAt(0,0,0) // 0,0,0을 향해 빛을 쏨
// rectAreaLight.castShadow = true; // 그림자 X


// 6. SpotLight
const spotLight = new THREE.SpotLight(0xffffff,0.5)
scene.add(spotLight)
spotLight.castShadow = true; // 그림자 O


// 도형 추가
const geometry = new THREE.SphereGeometry(0.5, 32, 16); 
// const geometry = new THREE.IcosahedronGeometry(0.5, 0); 
// const geometry = new THREE.ConeGeometry(0.4, 0.7, 6); 
const material = new THREE.MeshStandardMaterial({
    color: 0x79E5CB,
})
const cube = new THREE.Mesh(geometry, material)
cube.rotation.y = 0.5;
cube.position.y = 0.2;
scene.add(cube)

// castShadow
cube.castShadow = true;

// 바닥 추가
const planeGeoemtry = new THREE.PlaneGeometry(20,20,1,1);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff
});
const plane = new THREE.Mesh(planeGeoemtry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -0.5;
scene.add(plane)

// receiveShadow
plane.receiveShadow = true


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

