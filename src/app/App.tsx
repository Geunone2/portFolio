import './App.css';
import { useState } from "react";
import { CategoryNav } from '../features/navigation';
import { ContentManager } from '../features/content';
import { LoadingScreen } from '../features/loading';
import { useSceneSetup } from '../features/scene';
import { cameraAnimation, CAMERA_PRESETS, useCameraControls, useCanvasEvents } from '../features/camera';

function App() {
    const [hasEntered, setHasEntered] = useState(false);

    const {
        canvasRef,
        cameraRef,
        controlsRef,
        sceneRef,
        loadingProgress,
        isLoadingComplete
    } = useSceneSetup();

    const {
        currentCategory,
        setCurrentCategory,
        currentPresetIndex,
        setCurrentPresetIndex,
        showContent,
        setShowContent,
        isAnimatingRef,
        currentPresetIndexRef,
        handleCategoryClick
    } = useCameraControls({ cameraRef, controlsRef });

    useCanvasEvents({
        canvasRef,
        cameraRef,
        controlsRef,
        sceneRef,
        isAnimatingRef,
        currentPresetIndexRef,
        setCurrentCategory,
        setCurrentPresetIndex,
        setShowContent
    });

    const handleEnter = () => {
        if (cameraRef.current && controlsRef.current) {
            const defaultPreset = CAMERA_PRESETS.find(p => p.id === 'default') || CAMERA_PRESETS[0];

            if (defaultPreset) {
                isAnimatingRef.current = true;
                setShowContent(false);

                const timeline = cameraAnimation(
                    cameraRef.current,
                    { position: defaultPreset.position, lookAt: defaultPreset.lookAt },
                    controlsRef.current,
                    1.5
                );

                timeline.eventCallback('onComplete', () => {
                    isAnimatingRef.current = false;
                    setShowContent(true);
                    setCurrentCategory(defaultPreset.category);
                    setCurrentPresetIndex(0);
                    setHasEntered(true);
                });
            }
        }
    };

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
                        onBack={() => handleCategoryClick("default")}
                    />
                </>
            )}
        </>
    );
}

export default App;
