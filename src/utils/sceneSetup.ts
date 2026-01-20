import * as THREE from "three";

export interface SceneSetup {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
}

export default function initialSetup(canvas: HTMLCanvasElement): SceneSetup {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(16.025, 1, -0.692);

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    return {scene, camera, renderer}
}