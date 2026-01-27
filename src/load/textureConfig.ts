export const TEXTURE_MAPPING = {
    "Object004_holly_manual_bake_0": {
        texturePath: '/assets/textures/Me.jpeg',
        newName: "Me",
        type: "introduce",
        needsClone: true,
    },
    "Object005_squirrel_manual_bake_0": {
        texturePath: '/assets/textures/NextFrame.jpeg',
        newName: 'NextFrame',
        type: 'project1',
        needsClone: true
    },
    "scarlett_frame_scarlett_manual_bake_0": {
        texturePath: "/assets/textures/LowPoly.jpeg",
        newName: 'LowPoly',
        type: 'project2',
        needsClone: true
    },
    "end_frame_end_frame_manual_bake_0": {
        texturePath: "/assets/textures/Contact.jpeg",
        newName: "Contact",
        type: "contact",
        needsClone: true,
    }
} as const;

export type TextureMappingKey = keyof typeof TEXTURE_MAPPING;