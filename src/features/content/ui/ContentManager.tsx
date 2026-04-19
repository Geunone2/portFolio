import type { ContentManagerProps } from '../../../shared/types';
import DefaultContent from './DefaultContent';
import IntroContent from './IntroContent';
import SkillsContent from './SkillsContent';
import ProjectOverviewContent from './ProjectOverviewContent';
import ProjectNextFrameContent from './ProjectNextFrameContent';
import ProjectLowPolyContent from './ProjectLowPolyContent';
import ContactContent from './ContactContent';

export default function ContentManager({ presetId, isVisible, onBack }: ContentManagerProps) {
    switch (presetId) {
        case "default":
            return <DefaultContent isVisible={isVisible} />;
        case "intro":
            return <IntroContent isVisible={isVisible} onBack={onBack} />;
        case "skills":
            return <SkillsContent isVisible={isVisible} onBack={onBack} />;
        case "project-overview":
            return <ProjectOverviewContent isVisible={isVisible} onBack={onBack} />;
        case "project-nextFrame":
            return <ProjectNextFrameContent isVisible={isVisible} onBack={onBack} />;
        case "project-lowPoly":
            return <ProjectLowPolyContent isVisible={isVisible} onBack={onBack} />;
        case "contact":
            return <ContactContent isVisible={isVisible} onBack={onBack} />;
        default:
            return null;
    }
}
