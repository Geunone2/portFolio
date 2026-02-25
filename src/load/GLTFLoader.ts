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

        let maxProgress = 0;
        const startTime = Date.now();
        console.log('🚀 [GLTF] Loading started at:', startTime);

        loader.load(
            modelPath,
            async (gltf) => {
                const onLoadTime = Date.now();
                console.log('✅ [GLTF] onLoad triggered at:', onLoadTime, `(+${onLoadTime - startTime}ms)`);
                console.log('📊 [GLTF] maxProgress before textures:', maxProgress);

                const model = gltf.scene;

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

                console.log(`🖼️ [TEXTURE] Found ${textureLoadPromises.length} textures to load`);

                try {
                    let loadedCount = 0;
                    const totalTextures = textureLoadPromises.length;

                    // 각 텍스처 로딩마다 진행률 업데이트 (50% ~ 100%)
                    await Promise.all(
                        textureLoadPromises.map(async (promise) => {
                            const textureStartTime = Date.now();
                            await promise;
                            const textureEndTime = Date.now();
                            loadedCount++;
                            const textureProgress = 50 + (loadedCount / totalTextures) * 50;

                            if (textureProgress > maxProgress) {
                                maxProgress = textureProgress;
                                console.log(`📊 [TEXTURE ${loadedCount}/${totalTextures}] Progress: ${textureProgress.toFixed(1)}% (took ${textureEndTime - textureStartTime}ms)`);

                                if (onProgress) {
                                    onProgress(textureProgress)
                                } else {
                                    console.warn(`⚠️ [TEXTURE ${loadedCount}/${totalTextures}] Progress IGNORED: ${textureProgress.toFixed(1)}% (maxProgress: ${maxProgress})`);
                                }
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
                    const totalTime = Date.now() - startTime;
                    console.log(`🎉 [COMPLETE] Total loading time: ${totalTime}ms, Final progress: ${maxProgress}%`);

                    resolve({
                        model,
                        animations: gltf.animations,
                    });
                } catch (error) {
                    console.error('❌ Texture loading failed:', error);
                    reject(error);
                }
            },
            (xhr) => {
                const xhrTime = Date.now();
                const percentComplete = (xhr.loaded / xhr.total) * 50;


                console.log(`📥 [XHR] at ${xhrTime - startTime}ms:`, {
                    loaded: xhr.loaded,
                    total: xhr.total,
                    rawPercentage: `${((xhr.loaded / xhr.total) * 100).toFixed(1)}%`,
                    calculatedProgress: `${percentComplete.toFixed(1)}%`,
                    currentMaxProgress: maxProgress
                });

                if (percentComplete > maxProgress) {
                    maxProgress = percentComplete;
                    console.log(`✅ [XHR] Progress updated to: ${percentComplete.toFixed(1)}%`);

                    if (onProgress) {
                        onProgress(percentComplete);
                    } else {
                        console.warn(`⚠️ [XHR] Progress IGNORED: ${percentComplete.toFixed(1)}% (maxProgress: ${maxProgress})`);
                    }

                }
            },
            reject
        );
    });
}