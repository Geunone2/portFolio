import { useEffect, useRef, useState } from "react";
import type { CategoryType, UseCameraControlProps } from '../../../shared/types';
import { CAMERA_PRESETS } from '../model/cameraPresets';
import { cameraAnimation } from '../model/cameraAnimation';

export function useCameraControls({ cameraRef, controlsRef }: UseCameraControlProps) {
    const [currentCategory, setCurrentCategory] = useState<CategoryType>("default");
    const [currentPresetIndex, setCurrentPresetIndex] = useState(0);
    const [showContent, setShowContent] = useState(true);

    const isAnimatingRef = useRef(false);
    const currentPresetIndexRef = useRef(0);

    useEffect(() => {
        currentPresetIndexRef.current = currentPresetIndex;
    }, [currentPresetIndex]);

    const handleCategoryClick = (category: CategoryType) => {
        if (isAnimatingRef.current || !cameraRef.current || !controlsRef.current) return;

        const targetPresetIndex = CAMERA_PRESETS.findIndex(preset => preset.category === category);
        if (targetPresetIndex === -1) return;

        if (
            (currentCategory === 'skills' && category === 'contact') ||
            (currentCategory === 'contact' && category === 'skills')
        ) {
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
                { position: worksPreset.position, lookAt: worksPreset.lookAt },
                controlsRef.current,
                1.5
            );

            timeline1.eventCallback('onComplete', () => {
                setCurrentPresetIndex(finalPresetIndex);
                setCurrentCategory(finalCategory);

                const finalPreset = CAMERA_PRESETS[finalPresetIndex];
                const timeline2 = cameraAnimation(
                    cameraRef.current!,
                    { position: finalPreset.position, lookAt: finalPreset.lookAt },
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

        const targetPreset = CAMERA_PRESETS[targetPresetIndex];

        isAnimatingRef.current = true;
        setShowContent(false);
        setCurrentCategory(category);
        setCurrentPresetIndex(targetPresetIndex);

        const timeline = cameraAnimation(
            cameraRef.current,
            { position: targetPreset.position, lookAt: targetPreset.lookAt },
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
