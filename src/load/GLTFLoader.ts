import * as THREE from "three";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";

export interface ModelLoadResult {
    model: THREE.Group;
    animations: THREE.AnimationClip[];
}

export default function loadGLTFModel(modelPath: string): Promise<ModelLoadResult> {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();

        loader.load(
            modelPath,
            (gltf) => {
                const model = gltf.scene;

                model.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        if (child.name.startsWith('Circle001')) {
                            child.removeFromParent();
                        }
                    }
                })

                resolve({
                    model: gltf.scene,
                    animations: gltf.animations,
                });
            },
            undefined,
            (error) => {
                reject(error);
            }
        )
    })
}