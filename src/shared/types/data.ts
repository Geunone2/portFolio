import type { IconType } from "react-icons";

export interface ProfileItem {
    icon: IconType;
    label: string;
    value: string;
}

export interface Skill {
    name: string;
    icon: string;
}

export type SkillCategory = "Front-end" | "Collaboration & Tools";

export interface Project {
    name: string;
    period: string;
    github: string;
    demo: string;
    techStack: string[];
    description: string;
    features: string[];
}

export interface ContactItem {
    icon: IconType;
    label: string;
    value: string;
    link: string;
}
