import * as THREE from "three";
import type { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { gsap } from "gsap";
import type { CameraTarget } from '../../../shared/types';

export function cameraAnimation(
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
    });

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
