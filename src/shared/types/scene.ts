import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import type { RefObject } from "react";

export interface SceneSetup {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
}

export interface SceneSetupResult {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
}

export interface AnimationSetup {
    mixer: THREE.AnimationMixer;
    actions: THREE.AnimationAction[];
}

export interface ModelLoadResult {
    model: THREE.Group;
    animations: THREE.AnimationClip[];
}

export interface UseSceneSetupResult {
    canvasRef: RefObject<HTMLCanvasElement | null>;
    cameraRef: RefObject<THREE.PerspectiveCamera | null>;
    controlsRef: RefObject<OrbitControls | null>;
    sceneRef: RefObject<THREE.Scene | null>;
    loadingProgress: number;
    isLoadingComplete: boolean;
}
