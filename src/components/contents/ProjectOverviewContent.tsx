import type {ContentProps} from "../../types";
import BaseContentLayout from "../layout/BaseContentLayer.tsx";

export default function ProjectOverviewContent({isVisible, onBack}: ContentProps) {
    return (
        <BaseContentLayout
            isVisible={isVisible}
            onBack={onBack}
            animationSelector=".animate-item"
            width="quarter"
            position="right"
        >
            {/* 제목 */}
            <div className="animate-item">
                <h2 className="text-4xl -mt-3 font-bold text-purple-400 mb-4 text-center">
                    Projects
                </h2>
                <p className="text-xl text-gray-300 text-center mb-2">
                    참여한 프로젝트들을 소개합니다.
                </p>
            </div>

            {/* 안내 영역 */}
            <div className="animate-item p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-white text-center text-sm leading-relaxed">
                    액자를 클릭하거나,<br/>
                    스크롤로 이동하여<br/>
                    프로젝트들을 확인할 수 있습니다.
                </p>
            </div>
        </BaseContentLayout>
    );
}