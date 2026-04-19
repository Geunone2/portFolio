import { useEffect } from "react";
import type { UseCanvasEventsProps } from '../../../shared/types';
import { createRaycaster, getClickableObject, getIntersectedObjects, getMousePosition } from '../../../shared/utils/raycaster';
import { CAMERA_PRESETS, getCategoryFromType } from '../model/cameraPresets';
import { createWheelScrollHandler } from '../../../shared/utils/wheelScroll';
import { calculateCameraTarget } from '../../../shared/utils/calculateCameraTarget';
import { cameraAnimation } from '../model/cameraAnimation';

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
                    let presetIndex = CAMERA_PRESETS.findIndex(preset => preset.id === objectType);

                    if (presetIndex === -1) {
                        const category = getCategoryFromType(objectType);
                        setCurrentCategory(category);
                        presetIndex = CAMERA_PRESETS.findIndex(preset => preset.category === category);
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

        const handleMouseMove = (event: MouseEvent) => {
            const mouse = getMousePosition(event, canvas);
            const intersects = getIntersectedObjects(raycaster, mouse, camera, scene.children);
            const hoveredObject = getClickableObject(intersects);
            canvas.style.cursor = hoveredObject ? 'pointer' : 'default';
        };

        const wheelHandler = createWheelScrollHandler({
            onScrollUp: () => {
                if (isAnimatingRef.current || !camera || !controls) return;

                setCurrentPresetIndex((prevIndex) => {
                    const nextIndex = Math.max(prevIndex - 1, 0);
                    if (nextIndex === prevIndex) return prevIndex;

                    const preset = CAMERA_PRESETS[nextIndex];
                    isAnimatingRef.current = true;
                    setShowContent(false);
                    setCurrentCategory(preset.category);

                    const timeline = cameraAnimation(
                        camera,
                        { position: preset.position, lookAt: preset.lookAt },
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
                    if (nextIndex === prevIndex) return prevIndex;

                    const preset = CAMERA_PRESETS[nextIndex];
                    isAnimatingRef.current = true;
                    setShowContent(false);
                    setCurrentCategory(preset.category);

                    const timeline = cameraAnimation(
                        camera,
                        { position: preset.position, lookAt: preset.lookAt },
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

        canvas.addEventListener('click', handleClick);
        canvas.addEventListener('mousemove', handleMouseMove);
        wheelHandler.attach(canvas);

        return () => {
            canvas.removeEventListener('click', handleClick);
            canvas.removeEventListener('mousemove', handleMouseMove);
            wheelHandler.detach(canvas);
        };
    }, [canvasRef, cameraRef, controlsRef, sceneRef, isAnimatingRef, currentPresetIndexRef, setCurrentCategory, setCurrentPresetIndex, setShowContent]);
}
