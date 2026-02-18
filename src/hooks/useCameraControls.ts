import type {CategoryType, UseCameraControlProps} from "../types";
import {useEffect, useRef, useState} from "react";
import {CAMERA_PRESETS} from "../camera/categoryCamera.ts";
import {cameraAnimation} from "../camera/cameraAnimation.ts";

export function useCameraControls({cameraRef, controlsRef}: UseCameraControlProps) {
    const [currentCategory, setCurrentCategory] = useState<CategoryType>("default");
    const [currentPresetIndex, setCurrentPresetIndex] = useState(0);
    const [showContent, setShowContent] = useState(true);

    const isAnimatingRef = useRef(false);
    const currentPresetIndexRef = useRef(0);

    // currentPresetIndex와 ref 동기화
    useEffect(() => {
        currentPresetIndexRef.current = currentPresetIndex;
    }, [currentPresetIndex]);

    const handleCategoryClick = (category: CategoryType) => {
        if (isAnimatingRef.current || !cameraRef.current || !controlsRef.current) return;

        const targetPresetIndex = CAMERA_PRESETS.findIndex(preset => preset.category === category);
        if (targetPresetIndex === -1) return;

        // skills <-> contact 사이 전환 시 project 경유
        if ((currentCategory === 'skills' && category === 'contact') ||
            (currentCategory === 'contact' && category === 'skills')) {

            const finalCategory = category;
            const finalPresetIndex = targetPresetIndex;

            isAnimatingRef.current = true;
            setShowContent(false);

            const worksIndex = CAMERA_PRESETS.findIndex(p => p.id === 'project-overview');

            setCurrentPresetIndex(worksIndex);
            setCurrentCategory('project');

            const worksPreset = CAMERA_PRESETS[worksIndex];

            const timeline1 = cameraAnimation(
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

                const timeline2 = cameraAnimation(
                    cameraRef.current!,
                    {
                        position: finalPreset.position,
                        lookAt: finalPreset.lookAt
                    },
                    controlsRef.current || undefined,
                    1.5
                );

                timeline2.eventCallback('onComplete', () => {
                    isAnimatingRef.current = false;
                    setShowContent(true);
                });
            });

            return;
        }

        // 일반 카테고리 전환
        const targetPreset = CAMERA_PRESETS[targetPresetIndex];

        isAnimatingRef.current = true;
        setShowContent(false);
        setCurrentCategory(category);
        setCurrentPresetIndex(targetPresetIndex);

        const timeline = cameraAnimation(
            cameraRef.current,
            {
                position: targetPreset.position,
                lookAt: targetPreset.lookAt
            },
            controlsRef.current
        );

        timeline.eventCallback('onComplete', () => {
            isAnimatingRef.current = false;
            setShowContent(true);
        });
    };

    return {
        currentCategory,
        setCurrentCategory,
        currentPresetIndex,
        setCurrentPresetIndex,
        showContent,
        setShowContent,
        isAnimatingRef,
        currentPresetIndexRef,
        handleCategoryClick
    };

}