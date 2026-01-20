import * as THREE from 'three';

export interface AnimationSetup {
    mixer: THREE.AnimationMixer;
    actions: THREE.AnimationAction[];
}

export default function setupAnimations(
    model: THREE.Group,
    animations: THREE.AnimationClip[]
): AnimationSetup | null {
    if (!animations || animations.length === 0) {
        return null;
    }

    const mixer = new THREE.AnimationMixer(model);
    const actions: THREE.AnimationAction[] = [];

    animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.play();
        actions.push(action);
    });

    return {mixer, actions};
}