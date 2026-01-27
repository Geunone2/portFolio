import * as THREE from "three";

export const CATEGORY_POSITIONS = {
    default: {
        position: new THREE.Vector3(
            15.64786172585633,
            1.1405550416992727,
            -1.3494664014220525
        ),
        lookAt: new THREE.Vector3(
            0.9645753668977224,
            0.016616225929891305,
            3.151110593929052
        )
    },
    intro: {
        position: new THREE.Vector3(
            11.489084044300006,
            1.2282506993831697,
            0.016474571060953735
        ),
        lookAt: new THREE.Vector3(
            5.854919050906442,
            -0.31727391827163903,
            9.487720450166938
        )
    },
    project: {
        position: new THREE.Vector3(
            11.272614812787253,
            1.631537259998673,
            -0.14602024909744432
        ),
        lookAt: new THREE.Vector3(
            -0.05470008032311394,
            0.5293691019117591,
            -0.15203112151424705
        )
    },
    contact: {
        position: new THREE.Vector3(
            -11.612719343140466,
            1.5291087271404913,
            0.1961828181404534
        ),
        lookAt: new THREE.Vector3(
            -19.553815088399745,
            1.4001713134199403,
            0.29087099825888435
        )
    }
} as const;

export type CategoryType = keyof typeof CATEGORY_POSITIONS;

export function getCategoryFromType(type: string): CategoryType {
    if (type === "introduce") return "intro";
    if (type.startsWith("project")) return "project";
    if (type === "contact") return "contact";

    return "default";
}