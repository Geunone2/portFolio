import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import type {RefObject} from "react";

/**
 * 씬 초기화 결과
 * from: src/utils/sceneSetup.ts
 */
export interface SceneSetup {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
}

/**
 * 씬 초기화 결과 (OrbitControls 포함)
 */
export interface SceneSetupResult {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls
}

/**
 * 애니메이션 설정
 * from: src/load/AnimationLoader.ts
 */
export interface AnimationSetup {
    mixer: THREE.AnimationMixer;
    actions: THREE.AnimationAction[];
}

/**
 * GLTF 모델 로드 결과
 * from: src/load/GLTFLoader.ts
 */
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