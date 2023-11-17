# Three.js
- 이 레파지토리는 유튜버 '디자인베이스'님의 강좌를 보면서 작성했습니다


## 1. 01_start : setting 
 - docs의 [설치](https://threejs.org/docs/index.html#manual/ko/introduction/Installation) 참고
 - npm i three


## 2. 02_basic : 기본 구조 이해하기
   ![img](https://threejs.org/manual/resources/images/threejs-structure.svg)

   1. Renderer : 카메라에 담긴 장면을 웹사이트에 구현해주는 렌더러
   2. Scene : 배경색, 안개 등의 요소 포함. 여러개의 3D 오브젝트와 빛들이 모인 장면.
   3. Camera : 장면을 화면에 담기 위한 카메라. 시야각, 종횡비, 카메라 시작 끝 지점, 카메라 위치 등 설정

    - 장면만들기 결과
     ![img](02_basic/image1.png)

    - mesh 결과
     ![Alt text](image.png)


## 3. 03_material : 도형에 재질 추가하기
  - 