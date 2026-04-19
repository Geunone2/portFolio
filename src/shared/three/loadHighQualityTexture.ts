import * as THREE from "three";

export function loadHighQualityTexture(
    textureLoader: THREE.TextureLoader,
    path: string
): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
        textureLoader.load(
            path,
            (loadedTexture) => {
                loadedTexture.colorSpace = THREE.SRGBColorSpace;
                loadedTexture.anisotropy = 16;
                loadedTexture.minFilter = THREE.LinearMipmapLinearFilter;
                loadedTexture.magFilter = THREE.LinearFilter;
                loadedTexture.wrapS = THREE.ClampToEdgeWrapping;
                loadedTexture.wrapT = THREE.ClampToEdgeWrapping;
                resolve(loadedTexture);
            },
            undefined,
            reject
        );
    });
}
