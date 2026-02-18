import {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import initialSetup, {resizeRendererToDisplaySize} from "../utils/sceneSetup";
import createOrbitControls from "../camera/OrbitControlsSetup";
import setupAnimations from "../load/AnimationLoader";
import {loadGLTFModel} from "../load/GLTFLoader";
import type {AnimationSetup, UseSceneSetupResult} from "../types";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {getDeviceType, DEVICE_FOV} from "../data/breakPoints";  // ← 추가

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

        const {scene, camera, renderer} = initialSetup(canvas);
        const controls = createOrbitControls(camera, renderer.domElement);

        cameraRef.current = camera;
        controlsRef.current = controls;
        sceneRef.current = scene;

        // 초기 FOV 설정 (추가)
        const updateCameraFOV = () => {
            if (!cameraRef.current) return;

            const deviceType = getDeviceType(window.innerWidth);
            const fov = DEVICE_FOV[deviceType];

            cameraRef.current.fov = fov;
            cameraRef.current.updateProjectionMatrix();
        };

        updateCameraFOV();

        loadGLTFModel("/assets/scene.gltf", (progress) => {
            setLoadingProgress(progress);
        })
            .then(({model, animations}) => {
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

        // 리사이즈 핸들러 (FOV 업데이트 추가)
        function handleResize() {
            if (!cameraRef.current) return;

            const camera = cameraRef.current as THREE.PerspectiveCamera;

            // FOV 업데이트 (추가)
            const deviceType = getDeviceType(window.innerWidth);
            const fov = DEVICE_FOV[deviceType];
            camera.fov = fov;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        window.addEventListener('resize', handleResize);

        // 클린업
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