import * as THREE from "three";
import type {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {gsap} from "gsap";

export interface CameraTarget {
    position: THREE.Vector3;
    lookAt: THREE.Vector3;
}

export function calculateCameraTarget(
    object: THREE.Object3D,
    offsetDistance: number = 3,
): CameraTarget {
    console.log('🔍 클릭된 오브젝트 이름:', object.name);

    if (object.name === "Me") {
        return {
            position: new THREE.Vector3(
                11.489084044300006,
                1.2282506993831697,
                0.016474571060953735
            ),
            lookAt: new THREE.Vector3(
                5.854919050906442,
                -0.31727391827163903,
                9.487720450166938
            )
        };
    }

    if (object.name === "NextFrame") {
        return {
            position: new THREE.Vector3(
                7.115209094120075,
                1.5,
                -0.582970877731686
            ),
            lookAt: new THREE.Vector3(
                7.1259060485523555,
                1.5,
                1.4394682512226535
            )
        }
    }

    if (object.name === "LowPoly") {
        return {
            position: new THREE.Vector3(
                2.8327164943923773,
                1.626808144636149,
                0.34069308349154404
            ),
            lookAt: new THREE.Vector3(
                2.8280663349343897,
                1.6146087990051134,
                -0.21796954343566555
            )
        }
    }

    if (object.name === "Contact") {
        return {
            position: new THREE.Vector3(
                -11.612719343140466,
                1.5291087271404913,
                0.1961828181404534
            ),
            lookAt: new THREE.Vector3(
                -19.553815088399745,
                1.4001713134199403,
                0.29087099825888435
            )
        }
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
    duration: number = 1.5
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
        ease: "power2.inOut",
    }, 0);

    if (controls) {
        timeline.to(controls.target, {
            x: target.lookAt.x,
            y: target.lookAt.y,
            z: target.lookAt.z,
            duration,
            ease: "power2.inOut",
            onUpdate: () => {
                camera.lookAt(controls.target);
            }
        }, 0);
    }

    return timeline;
}