import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import type {Dispatch, RefObject, SetStateAction} from "react";
import type {CategoryType} from "./camera.ts";

/**
 * 휠 스크롤 옵션
 * from: src/utils/wheelScroll.ts
 */
export interface WheelScrollOptions {
    onScrollUp: () => void;
    onScrollDown: () => void;
    debounceTime?: number;
}

export interface UseCanvasEventsProps {
    canvasRef: RefObject<HTMLCanvasElement | null>;
    cameraRef: RefObject<THREE.Camera | null>;
    controlsRef: RefObject<OrbitControls | null>;
    sceneRef: RefObject<THREE.Scene | null>;
    isAnimatingRef: RefObject<boolean>;
    currentPresetIndexRef: RefObject<number>;
    setCurrentCategory: (category: CategoryType) => void;
    setCurrentPresetIndex: Dispatch<SetStateAction<number>>
    setShowContent: (show: boolean) => void;
}