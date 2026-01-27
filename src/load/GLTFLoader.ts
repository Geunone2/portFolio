import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {TEXTURE_MAPPING, type TextureMappingKey} from "./textureConfig.ts";

export interface ModelLoadResult {
    model: THREE.Group;
    animations: THREE.AnimationClip[];
}

function loadHighQualityTexture(textureLoader: THREE.TextureLoader, path: string): THREE.Texture {
    const texture = textureLoader.load(path);

    texture.colorSpace = THREE.SRGBColorSpace;

    texture.anisotropy = 16;

    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;

    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    return texture;
}

export function loadGLTFModel(modelPath: string): Promise<ModelLoadResult> {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader();

        loader.load(
            modelPath,
            (gltf) => {
                const model = gltf.scene;

                model.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        if (child.name.startsWith('Circle001')) {
                            child.removeFromParent();
                            return;
                        }

                        const config = TEXTURE_MAPPING[child.name as TextureMappingKey];

                        if (config) {
                            if (config.texturePath) {
                                const material = config.needsClone
                                    ? (child.material as THREE.MeshStandardMaterial).clone()
                                    : (child.material as THREE.MeshStandardMaterial)

                                const newTexture = loadHighQualityTexture(textureLoader, config.texturePath);
                                material.map = newTexture;
                                material.needsUpdate = true;

                                if (config.needsClone) {
                                    child.material = material;
                                }
                            }

                            child.name = config.newName;
                            child.userData.clickable = true;
                            child.userData.type = config.type;
                            child.userData.id = config.newName;
                        }
                    }
                });

                resolve({
                    model,
                    animations: gltf.animations,
                });
            },
            undefined,
            (error) => {
                reject(error);
            }
        );
    });
}