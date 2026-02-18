import type {UseCanvasEventsProps} from "../types";
import {useEffect} from "react";
import {createRaycaster, getClickableObject, getIntersectedObjects, getMousePosition} from "../utils/raycaster.ts";
import {CAMERA_PRESETS, getCategoryFromType} from "../camera/categoryCamera.ts";
import {createWheelScrollHandler} from "../utils/wheelScroll.ts";
import {calculateCameraTarget} from "../utils/calculateCameraTarget.ts";
import {cameraAnimation} from "../camera/cameraAnimation.ts";

export function useCanvasEvents({
                                    canvasRef,
                                    cameraRef,
                                    controlsRef,
                                    sceneRef,
                                    isAnimatingRef,
                                    currentPresetIndexRef,
                                    setCurrentCategory,
                                    setCurrentPresetIndex,
                                    setShowContent
                                }: UseCanvasEventsProps) {
    useEffect(() => {
        const canvas = canvasRef.current;
        const camera = cameraRef.current;
        const controls = controlsRef.current;
        const scene = sceneRef.current;

        if (!canvas || !camera || !controls || !scene) return;

        const raycaster = createRaycaster();

        // 오브젝트 클릭 핸들러
        const handleClick = (event: MouseEvent) => {
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
                const timeline = cameraAnimation(camera, target, controls);

                timeline.eventCallback('onComplete', () => {
                    isAnimatingRef.current = false;
                    setShowContent(true);
                });
            }
        };

        // 마우스 호버 핸들러
        const handleMouseMove = (event: MouseEvent) => {
            const mouse = getMousePosition(event, canvas);
            const intersects = getIntersectedObjects(raycaster, mouse, camera, scene.children);
            const hoveredObject = getClickableObject(intersects);

            canvas.style.cursor = hoveredObject ? 'pointer' : 'default';
        };

        // 휠 스크롤 핸들러
        const wheelHandler = createWheelScrollHandler({
            onScrollUp: () => {
                if (isAnimatingRef.current || !camera || !controls) return;

                setCurrentPresetIndex((prevIndex) => {
                    const nextIndex = Math.max(prevIndex - 1, 0);

                    if (nextIndex === prevIndex) {
                        return prevIndex;
                    }

                    const preset = CAMERA_PRESETS[nextIndex];

                    isAnimatingRef.current = true;
                    setShowContent(false);
                    setCurrentCategory(preset.category);

                    const timeline = cameraAnimation(
                        camera,
                        {
                            position: preset.position,
                            lookAt: preset.lookAt
                        },
                        controls,
                        1.5
                    );

                    timeline.eventCallback("onComplete", () => {
                        isAnimatingRef.current = false;
                        setShowContent(true);
                    });

                    return nextIndex;
                });
            },
            onScrollDown: () => {
                if (isAnimatingRef.current || !camera || !controls) return;

                setCurrentPresetIndex((prevIndex) => {
                    const nextIndex = Math.min(prevIndex + 1, CAMERA_PRESETS.length - 1);

                    if (nextIndex === prevIndex) {
                        return prevIndex;
                    }

                    const preset = CAMERA_PRESETS[nextIndex];

                    isAnimatingRef.current = true;
                    setShowContent(false);
                    setCurrentCategory(preset.category);

                    const timeline = cameraAnimation(
                        camera,
                        {
                            position: preset.position,
                            lookAt: preset.lookAt
                        },
                        controls,
                        1.5
                    );

                    timeline.eventCallback("onComplete", () => {
                        isAnimatingRef.current = false;
                        setShowContent(true);
                    });

                    return nextIndex;
                });
            },
            debounceTime: 800
        });

        // 이벤트 등록
        canvas.addEventListener('click', handleClick);
        canvas.addEventListener('mousemove', handleMouseMove);
        wheelHandler.attach(canvas);

        // 클린업
        return () => {
            canvas.removeEventListener('click', handleClick);
            canvas.removeEventListener('mousemove', handleMouseMove);
            wheelHandler.detach(canvas);
        };
    }, [canvasRef, cameraRef, controlsRef, sceneRef, isAnimatingRef, currentPresetIndexRef, setCurrentCategory, setCurrentPresetIndex, setShowContent]);
}