import type {ContentProps} from "../../types";
import BaseContentLayout from "../layout/BaseContentLayer.tsx";
import {SKILLS_DATA} from "../../data/skills.ts";

export default function SkillsContent({isVisible, onBack}: ContentProps) {

    return (
        <BaseContentLayout
            isVisible={isVisible}
            onBack={onBack}
            animationSelector=".skill-section"
            width="half"
            position="right"
            stagger={0.15}
        >
            {/* 제목 */}
            <h2 className="text-3xl font-bold text-purple-400 mb-6 -mt-2 text-start">
                Tech Stacks
            </h2>

            {/* 스킬 섹션들 */}
            <div className="space-y-6">
                {Object.entries(SKILLS_DATA).map(([category, groups]) => (
                    <div key={category} className="skill-section">
                        {/* 카테고리 제목 */}
                        <h3 className="text-lg text-start font-semibold text-purple-400 mb-3">
                            {category}
                        </h3>

                        {/* 그룹별로 나누어 표시 */}
                        <div className="space-y-2">
                            {groups.map((group, groupIndex) => (
                                <div key={groupIndex} className="flex flex-wrap gap-2">
                                    {group.map((skill) => (
                                        <div
                                            key={skill.name}
                                            className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-purple-400/30 transition-all group"
                                        >
                                            <div className="w-8 h-8 flex items-center justify-center shrink-0">
                                                <img
                                                    src={`/assets/skills/${skill.icon}.svg`}
                                                    alt={skill.name}
                                                    className="w-5 h-5 object-contain group-hover:scale-110 transition-transform"
                                                />
                                            </div>
                                            <p className="text-black text-sm font-medium whitespace-nowrap">
                                                {skill.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </BaseContentLayout>
    );
}