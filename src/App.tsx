import './App.css'
import {useEffect, useRef} from "react";
import * as THREE from "three";
import initialSetup from "./utils/sceneSetup.ts";
import loadGLTFModels from "./load/GLTFLoader.ts";
import createOrbitControls from "./camera/OrbitControlsSetup.ts";
import setupAnimations from "./load/AnimationLoader.ts";

function App() {

    const animationIdRef = useRef<number | null>(null);
    useEffect(() => {
        const canvas = document.getElementById("c") as HTMLCanvasElement;
        if (!canvas) {
            console.error("No Exist Canvas");
            return;
        }

        const {scene, camera, renderer} = initialSetup(canvas);

        const controls = createOrbitControls(camera, renderer.domElement);

        loadGLTFModels("/assets/scene.gltf")
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

                    controls.update();
                    renderer.render(scene, camera);
                }

                animate();
            })
            .catch((error) => {
                console.error("모델 로드 실패:", error);
            })

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

    return null;
}

export default App
