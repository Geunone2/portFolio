import * as THREE from "three";
import type {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {gsap} from "gsap";
import {CAMERA_PRESETS} from "./categoryCamera.ts";

export interface CameraTarget {
    position: THREE.Vector3;
    lookAt: THREE.Vector3;
}

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

export function animateCameraTo(
    camera: THREE.Camera,
    target: CameraTarget,
    controls?: OrbitControls,
    duration: number = 2
): gsap.core.Timeline {
    if (controls) {
        controls.enabled = false;
    }

    const timeline = gsap.timeline({
        onComplete: () => {
            if (controls) {
                controls.enabled = true;
                controls.update();
            }
        }
    })

    timeline.to(camera.position, {
        x: target.position.x,
        y: target.position.y,
        z: target.position.z,
        duration,
        ease: "power1.inOut",
    }, 0);

    if (controls) {
        timeline.to(controls.target, {
            x: target.lookAt.x,
            y: target.lookAt.y,
            z: target.lookAt.z,
            duration,
            ease: "power1.inOut",
            onUpdate: () => {
                camera.lookAt(controls.target);
            }
        }, 0);
    }

    return timeline;
}