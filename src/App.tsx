import './App.css'
import {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import initialSetup, {resizeRendererToDisplaySize} from "./utils/sceneSetup.ts";
import createOrbitControls from "./camera/OrbitControlsSetup.ts";
import setupAnimations from "./load/AnimationLoader.ts";
import {createRaycaster, getClickableObject, getIntersectedObjects, getMousePosition} from "./utils/raycaster.ts";
import {animateCameraTo, calculateCameraTarget} from "./utils/cameraAnimation.ts";
import {loadGLTFModel} from "./load/GLTFLoader.ts";
import CategoryNav from "./components/ui/CategoryNav.tsx";
import {CAMERA_PRESETS, CATEGORY_POSITIONS, type CategoryType, getCategoryFromType} from "./utils/categoryCamera.ts";
import {createWheelScrollHandler} from "./utils/wheelScroll.ts";

function App() {
    const animationIdRef = useRef<number | null>(null);
    const isAnimatingRef = useRef(false);
    const cameraRef = useRef<THREE.Camera | null>(null);
    // eslint-disable-next-line
    const controlsRef = useRef<any>(null);

    const [currentCategory, setCurrentCategory] = useState<CategoryType>("default");
    const [currentPresetIndex, setCurrentPresetIndex] = useState(0);

    useEffect(() => {
        const canvas = document.getElementById("c") as HTMLCanvasElement;
        if (!canvas) return;

        const {scene, camera, renderer} = initialSetup(canvas);
        const controls = createOrbitControls(camera, renderer.domElement);
        const raycaster = createRaycaster();

        cameraRef.current = camera;
        controlsRef.current = controls;

        loadGLTFModel("/assets/scene.gltf")
            .then(({model, animations}) => {
                scene.add(model);

                const animationSetup = setupAnimations(model, animations);
                const clock = new THREE.Clock();

                function animate() {
                    animationIdRef.current = requestAnimationFrame(animate);

                    const delta = clock.getDelta();
                    if (animationSetup) {
                        animationSetup.mixer.update(delta);
                    }

                    if (!isAnimatingRef.current) {
                        controls.update();
                    }

                    resizeRendererToDisplaySize(renderer, camera);

                    renderer.render(scene, camera);
                }

                animate();

                canvas.addEventListener('click', (event) => {
                    if (isAnimatingRef.current) return;

                    const mouse = getMousePosition(event, canvas);
                    const intersects = getIntersectedObjects(raycaster, mouse, camera, scene.children);
                    const clickedObject = getClickableObject(intersects);

                    if (clickedObject) {
                        isAnimatingRef.current = true;

                        const objectType = clickedObject.userData.type;
                        if (objectType) {
                            const category = getCategoryFromType(objectType);
                            setCurrentCategory(category);
                        }
                        const target = calculateCameraTarget(clickedObject);
                        const timeline = animateCameraTo(camera, target, controls);

                        timeline.eventCallback('onComplete', () => {
                            isAnimatingRef.current = false;
                        });
                    }
                });

                canvas.addEventListener('mousemove', (event) => {
                    const mouse = getMousePosition(event, canvas);
                    const intersects = getIntersectedObjects(raycaster, mouse, camera, scene.children);
                    const hoveredObject = getClickableObject(intersects);

                    canvas.style.cursor = hoveredObject ? 'pointer' : 'default';
                });
            })
            .catch((error) => {
                console.error("모델 로드 실패:", error);
            });

        const wheelHandler = createWheelScrollHandler({
            onScrollUp: () => {
                if (isAnimatingRef.current || !cameraRef.current || !controlsRef.current) {
                    return;
                }

                // 🔑 함수형 업데이트로 최신 state 사용
                setCurrentPresetIndex((prevIndex) => {
                    const nextIndex = Math.max(prevIndex - 1, 0);

                    if (nextIndex === prevIndex) {
                        return prevIndex; // 변경 없음
                    }

                    const preset = CAMERA_PRESETS[nextIndex];
                    console.log('⬆️ 스크롤:', prevIndex, '→', nextIndex, preset.name);

                    isAnimatingRef.current = true;
                    setCurrentCategory(preset.category);

                    const timeline = animateCameraTo(
                        cameraRef.current!,
                        {
                            position: preset.position,
                            lookAt: preset.lookAt
                        },
                        controlsRef.current,
                        1.5
                    );

                    timeline.eventCallback("onComplete", () => {
                        isAnimatingRef.current = false;
                    });

                    return nextIndex;
                });
            },
            onScrollDown: () => {
                if (isAnimatingRef.current || !cameraRef.current || !controlsRef.current) {
                    return;
                }

                // 🔑 함수형 업데이트로 최신 state 사용
                setCurrentPresetIndex((prevIndex) => {
                    const nextIndex = Math.min(prevIndex + 1, CAMERA_PRESETS.length - 1);

                    if (nextIndex === prevIndex) {
                        return prevIndex; // 변경 없음
                    }

                    const preset = CAMERA_PRESETS[nextIndex];
                    console.log('⬇️ 스크롤:', prevIndex, '→', nextIndex, preset.name);

                    isAnimatingRef.current = true;
                    setCurrentCategory(preset.category);

                    const timeline = animateCameraTo(
                        cameraRef.current!,
                        {
                            position: preset.position,
                            lookAt: preset.lookAt
                        },
                        controlsRef.current,
                        1.5
                    );

                    timeline.eventCallback("onComplete", () => {
                        isAnimatingRef.current = false;
                    });

                    return nextIndex;
                });
            },
            debounceTime: 800
        });

        wheelHandler.attach(canvas);

        function handleResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            wheelHandler.detach(canvas);
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            controls.dispose();
            renderer.dispose();
        };
    }, []);

    const handleCategoryClick = (category: CategoryType) => {
        if (isAnimatingRef.current || !cameraRef.current || !controlsRef.current) {
            return;
        }

        const categoryPosition = CATEGORY_POSITIONS[category];

        const presetIndex = CAMERA_PRESETS.findIndex(preset => preset.category === category);

        isAnimatingRef.current = true;
        setCurrentCategory(category);

        if (presetIndex !== -1) {
            setCurrentPresetIndex(presetIndex);
        }

        const timeline = animateCameraTo(
            cameraRef.current,
            categoryPosition,
            controlsRef.current
        );

        timeline.eventCallback('onComplete', () => {
            isAnimatingRef.current = false;
        });
    };

    return (
        <>
            <CategoryNav onCategoryClick={handleCategoryClick}
                         currentCategory={currentCategory}
                         currentIndex={currentPresetIndex}
            />
        </>
    );
}

export default App