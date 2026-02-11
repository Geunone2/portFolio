import './App.css'
import {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import initialSetup, {resizeRendererToDisplaySize} from "./utils/sceneSetup.ts";
import createOrbitControls from "./camera/OrbitControlsSetup.ts";
import setupAnimations from "./load/AnimationLoader.ts";
import {createRaycaster, getClickableObject, getIntersectedObjects, getMousePosition} from "./utils/raycaster.ts";
import {animateCameraTo, calculateCameraTarget} from "./camera/cameraAnimation.ts";
import {loadGLTFModel} from "./load/GLTFLoader.ts";
import CategoryNav from "./components/ui/CategoryNav.tsx";
import {CAMERA_PRESETS, type CategoryType, getCategoryFromType} from "./camera/categoryCamera.ts";
import {createWheelScrollHandler} from "./utils/wheelScroll.ts";
import ContentManager from "./components/ui/ContentManager.tsx";
import LoadingScreen from "./components/ui/LoadingScreen.tsx";

// App.tsx 수정
function App() {
    const animationIdRef = useRef<number | null>(null);
    const isAnimatingRef = useRef(false);
    const cameraRef = useRef<THREE.Camera | null>(null);
    // eslint-disable-next-line
    const controlsRef = useRef<any>(null);

    const currentPresetIndexRef = useRef(0);

    const [currentCategory, setCurrentCategory] = useState<CategoryType>("default");
    const [currentPresetIndex, setCurrentPresetIndex] = useState(0);
    const [showContent, setShowContent] = useState(true); // 초기에는 보임

    // 로딩 상태
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);
    const [hasEntered, setHasEntered] = useState(false);

    useEffect(() => {
        currentPresetIndexRef.current = currentPresetIndex;
    }, [currentPresetIndex]);

    useEffect(() => {
        const canvas = document.getElementById("c") as HTMLCanvasElement;
        if (!canvas) return;

        const {scene, camera, renderer} = initialSetup(canvas);
        const controls = createOrbitControls(camera, renderer.domElement);
        const raycaster = createRaycaster();

        cameraRef.current = camera;
        controlsRef.current = controls;

        loadGLTFModel("/assets/scene.gltf", (progress) => {
            setLoadingProgress(progress);
        })
            .then(({model, animations}) => {
                scene.add(model);

                setIsLoadingComplete(true);

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
                        setShowContent(false);

                        const objectType = clickedObject.userData.type;

                        if (objectType) {
                            let presetIndex = CAMERA_PRESETS.findIndex(
                                preset => preset.id === objectType
                            );

                            if (presetIndex === -1) {
                                const category = getCategoryFromType(objectType);

                                setCurrentCategory(category);
                                presetIndex = CAMERA_PRESETS.findIndex(
                                    preset => preset.category === category
                                );
                            } else {
                                const category = CAMERA_PRESETS[presetIndex].category;

                                setCurrentCategory(category);
                            }

                            if (presetIndex !== -1) {
                                setCurrentPresetIndex(presetIndex);
                                currentPresetIndexRef.current = presetIndex;
                            }
                        }

                        const target = calculateCameraTarget(clickedObject);
                        const timeline = animateCameraTo(camera, target, controls);

                        timeline.eventCallback('onComplete', () => {
                            isAnimatingRef.current = false;
                            setShowContent(true); // 🔑 애니메이션 완료 후 표시
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

                setCurrentPresetIndex((prevIndex) => {
                    const nextIndex = Math.max(prevIndex - 1, 0);

                    if (nextIndex === prevIndex) {
                        return prevIndex;
                    }

                    const preset = CAMERA_PRESETS[nextIndex];

                    isAnimatingRef.current = true;
                    setShowContent(false); // 🔑 애니메이션 시작 시 숨김
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
                        setShowContent(true); // 🔑 애니메이션 완료 후 표시
                    });

                    return nextIndex;
                });
            },
            onScrollDown: () => {
                if (isAnimatingRef.current || !cameraRef.current || !controlsRef.current) {
                    return;
                }

                setCurrentPresetIndex((prevIndex) => {
                    const nextIndex = Math.min(prevIndex + 1, CAMERA_PRESETS.length - 1);

                    if (nextIndex === prevIndex) {
                        return prevIndex;
                    }

                    const preset = CAMERA_PRESETS[nextIndex];

                    isAnimatingRef.current = true;
                    setShowContent(false); // 🔑 애니메이션 시작 시 숨김
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
                        setShowContent(true); // 🔑 애니메이션 완료 후 표시
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
        if (isAnimatingRef.current || !cameraRef.current || !controlsRef.current) return;

        const targetPresetIndex = CAMERA_PRESETS.findIndex(preset => preset.category === category);
        if (targetPresetIndex === -1) return;

        if ((currentCategory === 'skills' && category === 'contact') ||
            (currentCategory === 'contact' && category === 'skills')) {

            const finalCategory = category;
            const finalPresetIndex = targetPresetIndex;

            isAnimatingRef.current = true;
            setShowContent(false); // 🔑 애니메이션 시작 시 숨김

            const worksIndex = CAMERA_PRESETS.findIndex(p => p.id === 'project-overview');

            setCurrentPresetIndex(worksIndex);
            setCurrentCategory('project');

            const worksPreset = CAMERA_PRESETS[worksIndex];

            const timeline1 = animateCameraTo(
                cameraRef.current,
                {
                    position: worksPreset.position,
                    lookAt: worksPreset.lookAt
                },
                controlsRef.current,
                1.5
            );

            timeline1.eventCallback('onComplete', () => {
                setCurrentPresetIndex(finalPresetIndex);
                setCurrentCategory(finalCategory);

                const finalPreset = CAMERA_PRESETS[finalPresetIndex];

                const timeline2 = animateCameraTo(
                    cameraRef.current!,
                    {
                        position: finalPreset.position,
                        lookAt: finalPreset.lookAt
                    },
                    controlsRef.current,
                    1.5
                );

                timeline2.eventCallback('onComplete', () => {
                    isAnimatingRef.current = false;
                    setShowContent(true); // 🔑 최종 애니메이션 완료 후 표시
                });
            });

            return;
        }

        const targetPreset = CAMERA_PRESETS[targetPresetIndex];

        isAnimatingRef.current = true;
        setShowContent(false); // 🔑 애니메이션 시작 시 숨김
        setCurrentCategory(category);
        setCurrentPresetIndex(targetPresetIndex);

        if (targetPresetIndex !== -1) {
            setCurrentPresetIndex(targetPresetIndex);
        }

        const timeline = animateCameraTo(
                cameraRef.current,
                {
                    position: targetPreset.position,
                    lookAt: targetPreset.lookAt
                },
                controlsRef.current
            )
        ;

        timeline.eventCallback('onComplete', () => {
            isAnimatingRef.current = false;
            setShowContent(true); // 🔑 애니메이션 완료 후 표시
        });
    };

    const handleEnter = () => {
        setHasEntered(true);
        if (cameraRef.current && controlsRef.current) {
            const defaultPreset = CAMERA_PRESETS.find(p => p.id === 'default') || CAMERA_PRESETS[0];

            if (defaultPreset) {
                isAnimatingRef.current = true;
                setShowContent(false);

                const timeline = animateCameraTo(
                    cameraRef.current,
                    {
                        position: defaultPreset.position,
                        lookAt: defaultPreset.lookAt
                    },
                    controlsRef.current,
                    1.5
                );

                timeline.eventCallback('onComplete', () => {
                    isAnimatingRef.current = false;
                    setShowContent(true);
                    setCurrentCategory(defaultPreset.category);
                    setCurrentPresetIndex(0);
                });
            }
        }
    }

    return (
        <>
            {!hasEntered && (
                <LoadingScreen
                    progress={loadingProgress}
                    isComplete={isLoadingComplete}
                    onEnter={handleEnter}
                />
            )}

            {hasEntered && (
                <>
                    <CategoryNav
                        onCategoryClick={handleCategoryClick}
                        currentCategory={currentCategory}
                        currentIndex={currentPresetIndex}
                    />

                    <ContentManager
                        presetId={CAMERA_PRESETS[currentPresetIndex]?.id || "default"}
                        isVisible={showContent}
                        onBack={() => {
                            handleCategoryClick("default");
                        }}
                    />
                </>
            )}
        </>
    );
}

export default App