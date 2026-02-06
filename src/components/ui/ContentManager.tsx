import type {ContentManagerProps} from "../../types/types.ts";
import DefaultContent from "../contents/DefaultContent.tsx";
import IntroContent from "../contents/IntroContent.tsx";
import SKillsContent from "../contents/SkillsContent.tsx";
import ProjectOverviewContent from "../contents/ProjectOverviewContent.tsx";
import ProjectNextFrameContent from "../contents/ProjectNextFrameContent.tsx";
import ProjectLowPolyContent from "../contents/ProjectLowPolyContent.tsx";
import ContactContent from "../contents/ContactContent.tsx";

export default function ContentManager({presetId, isVisible, onBack}: ContentManagerProps) {
    switch (presetId) {
        case "default":
            return <DefaultContent isVisible={isVisible}/>
        case "intro" :
            return <IntroContent isVisible={isVisible} onBack={onBack}/>
        case "skills":
            return <SKillsContent isVisible={isVisible} onBack={onBack}/>
        case "project-overview":
            return <ProjectOverviewContent isVisible={isVisible} onBack={onBack}/>
        case "project-nextFrame":
            return <ProjectNextFrameContent isVisible={isVisible} onBack={onBack}/>
        case "project-lowPoly":
            return <ProjectLowPolyContent isVisible={isVisible} onBack={onBack}/>
        case "contact":
            return <ContactContent isVisible={isVisible} onBack={onBack}/>

        default:
            return null;
    }
}