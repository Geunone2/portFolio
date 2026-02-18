import * as THREE from 'three';

export function createRaycaster(): THREE.Raycaster {
    return new THREE.Raycaster();
}

export function getMousePosition(
    event: MouseEvent,
    canvas: HTMLCanvasElement
): THREE.Vector2 {
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    return new THREE.Vector2(x, y);
}

export function getIntersectedObjects(
    raycaster: THREE.Raycaster,
    mouse: THREE.Vector2,
    camera: THREE.Camera,
    objects: THREE.Object3D[]
): THREE.Intersection[] {
    raycaster.setFromCamera(mouse, camera);
    return raycaster.intersectObjects(objects, true);
}

export function getClickableObject(
    intersects: THREE.Intersection[]
): THREE.Object3D | null {
    // 🔑 모든 intersects를 순회하면서 클릭 가능한 오브젝트 찾기
    for (const intersect of intersects) {
        let object = intersect.object;

        while (object) {
            if (object.userData.clickable) {
                return object;
            }
            object = object.parent as THREE.Object3D;
        }
    }

    return null;
}