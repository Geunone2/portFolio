import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import initialSetup, { resizeRendererToDisplaySize } from '../../../shared/three/sceneSetup';
import createOrbitControls from '../../../shared/three/orbitControls';
import setupAnimations from '../../../shared/three/animationLoader';
import { loadGLTFModel } from '../../../shared/three/gltfLoader';
import type { AnimationSetup, UseSceneSetupResult } from '../../../shared/types';
import { getDeviceType, DEVICE_FOV } from '../../../shared/config/breakPoints';

export function useSceneSetup(): UseSceneSetupResult {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const controlsRef = useRef<OrbitControls>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const animationIdRef = useRef<number | null>(null);

    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);

    useEffect(() => {
        const canvas = document.getElementById("c") as HTMLCanvasElement;
        if (!canvas) return;

        canvasRef.current = canvas;

        const { scene, camera, renderer } = initialSetup(canvas);
        const controls = createOrbitControls(camera, renderer.domElement);

        cameraRef.current = camera;
        controlsRef.current = controls;
        sceneRef.current = scene;

        const updateCameraFOV = () => {
            if (!cameraRef.current) return;
            const deviceType = getDeviceType(window.innerWidth);
            cameraRef.current.fov = DEVICE_FOV[deviceType];
            cameraRef.current.updateProjectionMatrix();
        };

        updateCameraFOV();

        loadGLTFModel("/assets/scene.gltf", (progress) => {
            setLoadingProgress(progress);
        })
            .then(({ model, animations }) => {
                scene.add(model);
                setIsLoadingComplete(true);

                const animationSetup: AnimationSetup | null = setupAnimations(model, animations);
                const clock = new THREE.Clock();

                function animate() {
                    animationIdRef.current = requestAnimationFrame(animate);
                    const delta = clock.getDelta();
                    if (animationSetup) {
                        animationSetup.mixer.update(delta);
                    }
                    resizeRendererToDisplaySize(renderer, camera);
                    renderer.render(scene, camera);
                }

                animate();
            })
            .catch((error) => {
                console.error("모델 로드 실패:", error);
            });

        function handleResize() {
            if (!cameraRef.current) return;
            const cam = cameraRef.current as THREE.PerspectiveCamera;
            const deviceType = getDeviceType(window.innerWidth);
            cam.fov = DEVICE_FOV[deviceType];
            cam.aspect = window.innerWidth / window.innerHeight;
            cam.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            controls.dispose();
            renderer.dispose();
        };
    }, []);

    return {
        canvasRef,
        cameraRef,
        controlsRef,
        sceneRef,
        loadingProgress,
        isLoadingComplete
    };
}
