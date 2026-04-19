import * as THREE from "three";
import type { RefObject } from "react";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export interface CameraTarget {
    position: THREE.Vector3;
    lookAt: THREE.Vector3;
}

export interface CameraPreset {
    id: string;
    name: string;
    category: "default" | "intro" | "skills" | "project" | "contact";
    position: THREE.Vector3;
    lookAt: THREE.Vector3;
}

export type CategoryType = "default" | "intro" | "skills" | "project" | "contact";

export interface CameraControlState {
    currentCategory: CategoryType;
    currentPresetIndex: number;
    showContent: boolean;
}

export interface CameraRefs {
    camera: RefObject<THREE.Camera | null>;
    controls: RefObject<OrbitControls | null>;
    isAnimating: RefObject<boolean>;
    currentPresetIndex: RefObject<number>;
    animationId: RefObject<number | null>;
}

export interface CameraHandlers {
    handleCategoryClick: (category: CategoryType) => void;
    handleObjectClick: (clickedObject: THREE.Object3D) => void;
}

export interface UseCameraControlProps {
    cameraRef: RefObject<THREE.Camera | null>;
    controlsRef: RefObject<OrbitControls | null>;
}
