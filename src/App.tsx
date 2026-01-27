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
import {CATEGORY_POSITIONS, type CategoryType, getCategoryFromType} from "./utils/categoryCamera.ts";

function App() {
    const animationIdRef = useRef<number | null>(null);
    const isAnimatingRef = useRef(false);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.Camera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    // eslint-disable-next-line
    const controlsRef = useRef<any>(null);

    const [currentCategory, setCurrentCategory] = useState<CategoryType>("default");

    useEffect(() => {
        const canvas = document.getElementById("c") as HTMLCanvasElement;
        if (!canvas) return;

        const {scene, camera, renderer} = initialSetup(canvas);
        const controls = createOrbitControls(camera, renderer.domElement);
        const raycaster = createRaycaster();

        sceneRef.current = scene;
        cameraRef.current = camera;
        rendererRef.current = renderer;
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

        function handleResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
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

    const handleCategoryClick = (category: CategoryType) => {
        if (isAnimatingRef.current || !cameraRef.current || !controlsRef.current) {
            return;
        }

        const categoryPosition = CATEGORY_POSITIONS[category];

        isAnimatingRef.current = true;
        setCurrentCategory(category);

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
                         currentCategory={currentCategory}/>
        </>
    );
}

export default App