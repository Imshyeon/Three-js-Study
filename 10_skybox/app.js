import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 장면
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// 카메라
const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window. innerHeight,
    1,
    4000
)
camera.position.set(0,20,100)
camera.lookAt(0,0,0)

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

const skyMaterialArray = []
const texture_ft = new THREE.TextureLoader().load('../img/skybox/barren_ft.jpg')
const texture_bk = new THREE.TextureLoader().load('../img/skybox/barren_bk.jpg')
const texture_up = new THREE.TextureLoader().load('../img/skybox/barren_up.jpg')
const texture_dn = new THREE.TextureLoader().load('../img/skybox/barren_dn.jpg')
const texture_rt = new THREE.TextureLoader().load('../img/skybox/barren_rt.jpg')
const texture_lt = new THREE.TextureLoader().load('../img/skybox/barren_lf.jpg')

skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
        map: texture_ft,
    })
)
skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
        map: texture_bk,
    })
)
skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
        map: texture_up,
    })
)
skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
        map: texture_dn,
    })
)
skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
        map: texture_rt,
    })
)
skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
        map: texture_lt,
    })
)

//반복문
for (let i = 0; i < 6; i++){
    skyMaterialArray[i].side = THREE.BackSide
}

// 도형 추가
const skyGeometry = new THREE.BoxGeometry(2400, 2400, 2400);
// const skyMaterial = new THREE.MeshStandardMaterial({
//     color: 0x333333,
//     // map: texture
// })
// skyMaterial.side = THREE.BackSide
const sky = new THREE.Mesh(skyGeometry, skyMaterialArray)
scene.add(sky)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)


function animate() {
    requestAnimationFrame(animate);
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

