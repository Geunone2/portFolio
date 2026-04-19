import type { ReactNode } from "react";
import type { CategoryType } from "./camera";

export interface ContentProps {
    isVisible: boolean;
    onBack?: () => void;
}

export interface ContentManagerProps {
    presetId: string;
    isVisible: boolean;
    onBack: () => void;
}

export interface CategoryNavProps {
    onCategoryClick: (category: CategoryType) => void;
    currentCategory?: CategoryType;
    currentIndex?: number;
}

export interface BaseContentLayoutProps {
    isVisible: boolean;
    onBack?: () => void;
    children: ReactNode;
    animationSelector?: string;
    width?: 'quarter' | 'half' | 'two-thirds' | 'three-quarters' | 'full';
    position?: 'left' | 'center' | 'right';
    stagger?: number;
}
