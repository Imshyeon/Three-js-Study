import * as THREE from 'three';

// 장면
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x004fff); // 컬러 바꾸기

// 카메라 (화각, 종횡비, 가까운 정도)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 캔버스
// const canvas = document.querySelector('#app');
// const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

// 렌더러
const renderer = new THREE.WebGLRenderer({
    alpha:true,
    antialias:true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 메쉬
const geometry01 = new THREE.BoxGeometry(1,1,1); // x, y, z
const material01 = new THREE.MeshStandardMaterial({
    color:0x999999
})
const obj01 = new THREE.Mesh(geometry01,material01)
obj01.position.x = -2;
scene.add(obj01)


const geometry02 = new THREE.ConeGeometry(0.5,1,8); // x, y, z
const material02 = new THREE.MeshStandardMaterial({
    color:0x999999
})
const obj02 = new THREE.Mesh(geometry02,material02)
scene.add(obj02)


const geometry03 = new THREE.IcosahedronGeometry(1,0); // x, y, z
const material03 = new THREE.MeshStandardMaterial({
    color:0x999999
})
const obj03 = new THREE.Mesh(geometry03,material03)
obj03.position.x = 2;
scene.add(obj03)

camera.position.z = 5;


function render(time) {
    time *= 0.0005;  // convert time to seconds
    
    obj01.rotation.x = time;
    obj01.rotation.y = time;
    obj02.rotation.x = time;
    obj02.rotation.y = time;
    obj03.rotation.x = time;
    obj03.rotation.y = time;
    
    renderer.render(scene, camera);
    
    requestAnimationFrame(render);
}
requestAnimationFrame(render);

// 반응형 처리
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight; // 종횡비 가변 처리
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

renderer.render(scene, camera);

