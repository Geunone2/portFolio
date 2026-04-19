import type { Skill, SkillCategory } from './model';

export const SKILLS_DATA: Record<SkillCategory, Skill[][]> = {
    "Front-end": [
        [
            { name: "HTML5", icon: "html5" },
            { name: "JavaScript", icon: "javascript" },
            { name: "TypeScript", icon: "typescript" },
        ],
        [
            { name: "React.js", icon: "react" },
            { name: "Next.js", icon: "next" },
            { name: "Three.js", icon: "three" },
        ],
        [
            { name: "CSS3", icon: "css3" },
            { name: "TailwindCSS", icon: "tailwindcss" },
        ],
        [
            { name: "React Query", icon: "reactquery" },
            { name: "Recoil", icon: "recoil" },
        ],
    ],
    "Collaboration & Tools": [
        [
            { name: "webstorm", icon: "webstorm" },
        ],
        [
            { name: "Figma", icon: "figma" },
        ],
        [
            { name: "Git", icon: "git" },
            { name: "Github", icon: "github" },
        ],
        [
            { name: "Notion", icon: "notion" },
            { name: "Discord", icon: "discord" },
        ],
    ]
};
