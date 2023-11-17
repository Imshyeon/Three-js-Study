import * as THREE from 'three';

// 장면
const scene = new THREE.Scene();
scene.background = new THREE.Color(); 

// 카메라 (화각, 종횡비, 가까운 정도)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z=4

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

// 텍스처 추가
const textureLoader = new THREE.TextureLoader();
const textureBaseColor = textureLoader.load('../img/Rock_047_BaseColor.jpg')
const textureHeightMap = textureLoader.load('../img/Rock_047_Height.png')
const textureNormalMap = textureLoader.load('../img/Rock_047_Normal.jpg')
const textureRoughnessMap = textureLoader.load('../img/Rock_047_Roughness.jpg')




// 도형 추가
const geometry = new THREE.SphereGeometry( 0.3, 32, 16 ); // x, y, z
const material01 = new THREE.MeshStandardMaterial({
    map: textureBaseColor
})
const obj01 = new THREE.Mesh(geometry,material01)
obj01.position.x = -2;
scene.add(obj01)


const material02 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap : textureNormalMap
})
const obj02 = new THREE.Mesh(geometry,material02)
obj02.position.x = -1;
scene.add(obj02)


const material03 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap : textureNormalMap,
    displacementMap : textureHeightMap,
    displacementScale: 0.05,
})
const obj03 = new THREE.Mesh(geometry,material03)
obj03.position.x = 0;
scene.add(obj03)

const material04 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap : textureNormalMap,
    displacementMap : textureHeightMap,
    displacementScale: 0.05,
    roughnessMap : textureRoughnessMap,
    rouchness:0.8
})
const obj04 = new THREE.Mesh(geometry,material04)
obj04.position.x = 1;
scene.add(obj04)


function render(time) {
    time *= 0.0005;  // convert time to seconds
    
    obj01.rotation.y = time;
    obj02.rotation.y = time;
    obj03.rotation.y = time;
    obj04.rotation.y = time;
    
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

