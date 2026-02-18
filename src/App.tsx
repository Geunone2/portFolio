import './App.css'
import {useState} from "react";
import CategoryNav from "./components/ui/CategoryNav.tsx";
import {CAMERA_PRESETS} from "./camera/categoryCamera.ts";
import ContentManager from "./components/ui/ContentManager.tsx";
import LoadingScreen from "./components/ui/LoadingScreen.tsx";
import {useSceneSetup} from "./hooks/useSceneSetup.ts";
import {cameraAnimation} from "./camera/cameraAnimation.ts";
import {useCameraControls} from "./hooks/useCameraControls.ts";
import {useCanvasEvents} from "./hooks/useCancasEvents.ts";

function App() {
    const [hasEntered, setHasEntered] = useState(false);

    // 씬 초기화
    const {
        canvasRef,
        cameraRef,
        controlsRef,
        sceneRef,
        loadingProgress,
        isLoadingComplete
    } = useSceneSetup();

    // 카메라 제어
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
    } = useCameraControls({
        cameraRef,
        controlsRef
    });

    // 캔버스 이벤트
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
                    setHasEntered(true);
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