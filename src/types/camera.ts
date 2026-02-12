import * as THREE from "three";
import type {RefObject} from "react";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

/**
 * 카메라 타겟 (위치 + 바라보는 방향)
 * from: src/camera/cameraAnimation.ts
 */
export interface CameraTarget {
    position: THREE.Vector3;
    lookAt: THREE.Vector3;
}

/**
 * 카메라 프리셋 (카테고리별 카메라 위치)
 * from: src/camera/categoryCamera.ts
 */
export interface CameraPreset {
    id: string;
    name: string;
    category: "default" | "intro" | "skills" | "project" | "contact";
    position: THREE.Vector3;
    lookAt: THREE.Vector3;
}

/**
 * 카테고리 타입
 * from: src/camera/categoryCamera.ts
 */
export type CategoryType = "default" | "intro" | "skills" | "project" | "contact";


/**
 * 카메라 제어 상태
 */
export interface CameraControlState {
    currentCategory: CategoryType;
    currentPresetIndex: number;
    showContent: boolean;
}

/**
 * 카메라 참조 객체
 */
export interface CameraRefs {
    camera: RefObject<THREE.Camera | null>;
    controls: RefObject<OrbitControls | null>;
    isAnimating: RefObject<boolean>;
    currentPresetIndex: RefObject<number>;
    animationId: RefObject<number | null>;
}

/**
 * 카메라 전환 핸들러
 */
export interface CameraHandlers {
    handleCategoryClick: (category: CategoryType) => void;
    handleObjectClick: (clickedObject: THREE.Object3D) => void;
}

export interface UseCameraControlProps {
    cameraRef: RefObject<THREE.Camera | null>;
    controlsRef: RefObject<OrbitControls | null>;
}