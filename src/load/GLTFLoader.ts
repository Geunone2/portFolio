import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {TEXTURE_MAPPING, type TextureMappingKey} from "./textureConfig.ts";
import type {ModelLoadResult} from "../types";
import {loadHighQualityTexture} from "../utils/loadHightQualityTexture.ts";

export function loadGLTFModel(
    modelPath: string,
    onProgress?: (progress: number) => void)
    : Promise<ModelLoadResult> {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader();

        loader.load(
            modelPath,
            async (gltf) => {
                const model = gltf.scene;

                // GLTF 로딩 완료 시 50%
                if (onProgress) {
                    onProgress(50);
                }

                const textureLoadPromises: Promise<void>[] = [];
                const meshesWithTextures: Array<{
                    mesh: THREE.Mesh;
                    material: THREE.MeshStandardMaterial;
                    texture: THREE.Texture;
                }> = [];

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
                                    : (child.material as THREE.MeshStandardMaterial);

                                // 🔑 loadHighQualityTexture 함수 사용
                                const texturePromise = loadHighQualityTexture(textureLoader, config.texturePath)
                                    .then((newTexture) => {
                                        meshesWithTextures.push({
                                            mesh: child,
                                            material,
                                            texture: newTexture
                                        });
                                    });

                                textureLoadPromises.push(texturePromise);
                            }

                            child.name = config.newName;
                            child.userData.clickable = true;
                            child.userData.type = config.type;
                            child.userData.id = config.newName;
                        }
                    }
                });

                try {
                    let loadedCount = 0;
                    const totalTextures = textureLoadPromises.length;

                    // 각 텍스처 로딩마다 진행률 업데이트 (50% ~ 100%)
                    await Promise.all(
                        textureLoadPromises.map(async (promise) => {
                            await promise;
                            loadedCount++;
                            const textureProgress = 50 + (loadedCount / totalTextures) * 50;
                            if (onProgress) {
                                onProgress(textureProgress);
                            }
                        })
                    );

                    // 텍스처를 머티리얼에 적용
                    meshesWithTextures.forEach(({mesh, material, texture}) => {
                        material.map = texture;
                        material.needsUpdate = true;

                        const config = Object.values(TEXTURE_MAPPING).find(
                            cfg => cfg.newName === mesh.name
                        );

                        if (config?.needsClone) {
                            mesh.material = material;
                        }
                    });

                    resolve({
                        model,
                        animations: gltf.animations,
                    });
                } catch (error) {
                    reject(error);
                }
            },
            (xhr) => {
                // GLTF 로딩은 0~50%
                const percentComplete = (xhr.loaded / xhr.total) * 50;
                if (onProgress) {
                    onProgress(percentComplete);
                }
            },
            reject
        );
    });
}