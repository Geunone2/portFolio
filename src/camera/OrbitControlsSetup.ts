import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

export default function createOrbitControls(
    camera: THREE.Camera,
    domElement: HTMLElement
): OrbitControls {
    const controls = new OrbitControls(camera, domElement);

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // 줌 비활성화 (휠 스크롤과 충돌 방지)
    controls.enableZoom = false;

    // 디바운싱 함수
    let timeoutId: number | null = null;

    function logCameraPosition() {
        console.log(`카메라 위치:`, {
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z
        });

        console.log('🎯 OrbitControls target:', {
            x: controls.target.x,
            y: controls.target.y,
            z: controls.target.z
        });
    }

    // change 이벤트에 디바운스 적용
    controls.addEventListener("change", () => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }

        timeoutId = window.setTimeout(() => {
            logCameraPosition();
            timeoutId = null;
        }, 500);
    })

    return controls;
}