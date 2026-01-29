import * as THREE from "three";

export interface CameraPreset {
    id: string;
    name: string;
    category: "default" | "intro" | "project" | "contact";
    position: THREE.Vector3;
    lookAt: THREE.Vector3;
}

// 스크롤 순서
export const CAMERA_PRESETS: CameraPreset[] = [
    {
        id: "default",
        name: "처음으로",
        category: "default",
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
    {
        id: "intro",
        name: "자기소개",
        category: "intro",
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
    {
        id: "project-overview",
        name: "프로젝트",
        category: "project",
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
    {
        id: "project-nextFrame",
        name: "NextFrame",
        category: "project",
        position: new THREE.Vector3(
            7.115209094120075,
            1.5,
            -0.582970877731686
        ),
        lookAt: new THREE.Vector3(
            7.1259060485523555,
            1.5,
            1.4394682512226535
        )
    },
    {
        id: "project-lowPoly",
        name: "LowPoly",
        category: "project",
        position: new THREE.Vector3(
            2.8327164943923773,
            1.626808144636149,
            0.34069308349154404
        ),
        lookAt: new THREE.Vector3(
            2.8280663349343897,
            1.6146087990051134,
            -0.21796954343566555
        )
    },
    {
        id: "contact",
        name: "컨택트",
        category: "contact",
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
]

export const CATEGORY_POSITIONS = {
    default: CAMERA_PRESETS[0],
    intro: CAMERA_PRESETS[1],
    project: CAMERA_PRESETS[2],
    contact: CAMERA_PRESETS[5]
} as const;

export type CategoryType = keyof typeof CATEGORY_POSITIONS;

export function getCategoryFromType(type: string): CategoryType {
    if (type === "introduce") return "intro";
    if (type.startsWith("project")) return "project";
    if (type === "contact") return "contact";

    return "default";
}