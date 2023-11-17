import * as THREE from 'three';

// 장면
const scene = new THREE.Scene();
scene.background = new THREE.Color(); 

// 카메라 (화각, 종횡비, 가까운 정도)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 렌더러
const renderer = new THREE.WebGLRenderer({
    alpha:true,
    antialias:true
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
const geometry = new THREE.TorusGeometry(0.3, 0.15, 16, 40); // x, y, z
const material01 = new THREE.MeshBasicMaterial({
    color: 0x79E5CB
})
const obj01 = new THREE.Mesh(geometry,material01)
obj01.position.x = -2;
scene.add(obj01)


const material02 = new THREE.MeshStandardMaterial({
    color: 0x79E5CB,
    metalness: 0.6,
    roughness: 0.4,
    // wireframe: true,
    // transparent : true,
    // opacity : 0.5,
})
material02.wireframe=true
const obj02 = new THREE.Mesh(geometry,material02)
obj02.position.x = -1;
scene.add(obj02)


const material03 = new THREE.MeshPhysicalMaterial({
    color: 0x79E5CB,
    clearcoat: 1,
})
const obj03 = new THREE.Mesh(geometry,material03)
obj03.position.x = 0;
scene.add(obj03)

const material04 = new THREE.MeshLambertMaterial({
    color: 0x79E5CB
})
const obj04 = new THREE.Mesh(geometry,material04)
obj04.position.x = 1;
scene.add(obj04)

const material05 = new THREE.MeshPhongMaterial({
    color: 0x79E5CB,
    shininess: 200,
    specular : 0x004fff,
})
const obj05 = new THREE.Mesh(geometry,material05)
obj05.position.x = 2;
scene.add(obj05)

camera.position.z=6

function render(time) {
    time *= 0.0005;  // convert time to seconds
    
    obj01.rotation.y = time;
    obj02.rotation.y = time;
    obj03.rotation.y = time;
    obj04.rotation.y = time;
    obj05.rotation.y = time;
    
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

// renderer.render(scene, camera);

