import * as THREE from 'three';

// 장면
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x004fff); // 컬러 바꾸기

// 카메라 (화각, 종횡비, 가까운 정도)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 렌더러
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// 방법 1
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

