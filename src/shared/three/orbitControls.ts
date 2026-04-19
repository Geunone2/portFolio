import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default function createOrbitControls(
    camera: THREE.Camera,
    domElement: HTMLElement
): OrbitControls {
    const controls = new OrbitControls(camera, domElement);

    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enableRotate = false;
    controls.enablePan = false;

    let timeoutId: number | null = null;

    controls.addEventListener("change", () => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
        timeoutId = window.setTimeout(() => {
            timeoutId = null;
        }, 500);
    });

    return controls;
}
