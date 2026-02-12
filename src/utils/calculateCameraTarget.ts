import * as THREE from "three";
import type {CameraTarget} from "../types";
import {CAMERA_PRESETS} from "../camera/categoryCamera.ts";

export function calculateCameraTarget(
    object: THREE.Object3D,
    offsetDistance: number = 3,
): CameraTarget {
    const presetByType = CAMERA_PRESETS.find(
        p => p.id === object.userData.type
    );

    if (presetByType) {
        return {
            position: presetByType.position,
            lookAt: presetByType.lookAt
        };
    }

    const box = new THREE.Box3().setFromObject(object);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();

    box.getCenter(center);
    box.getSize(size);

    const maxSize = Math.max(size.x, size.y, size.z);
    const distance = Math.max(maxSize * 2, offsetDistance);

    const cameraPosition = new THREE.Vector3(
        center.x,
        center.y + distance * 0.3,
        center.z + distance
    );

    return {
        position: cameraPosition,
        lookAt: center
    };
}