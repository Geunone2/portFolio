import type {ReactNode} from "react";
import type {CategoryType} from "./camera.ts";

/**
 * 콘텐츠 컴포넌트 Props
 * from: src/types/types.ts
 */
export interface ContentProps {
    isVisible: boolean;
    onBack?: () => void;
}

/**
 * 콘텐츠 매니저 Props
 * from: src/types/types.ts
 */
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