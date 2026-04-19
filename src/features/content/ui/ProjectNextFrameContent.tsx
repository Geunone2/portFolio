import { FaGithub, FaExternalLinkAlt, FaCalendarAlt } from "react-icons/fa";
import type { ContentProps } from '../../../shared/types';
import BaseContentLayout from '../../../shared/ui/BaseContentLayer';
import { PROJECTS } from '../../../entities/project';

export default function ProjectNextFrameContent({ isVisible, onBack }: ContentProps) {
    return (
        <BaseContentLayout
            isVisible={isVisible}
            onBack={onBack}
            animationSelector=".animate-item"
            width="two-thirds"
            position="right"
        >
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-purple-400 mb-2 -mt-2 animate-item">
                    {PROJECTS.nextFrame.name}
                </h2>
                <div className="flex items-center gap-2 text-black animate-item">
                    <FaCalendarAlt className="text-sm" />
                    <span className="text-sm">{PROJECTS.nextFrame.period}</span>
                </div>
            </div>

            <div className="flex gap-3 mb-6 animate-item">
                <a
                    href={PROJECTS.nextFrame.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-purple-400/20 hover:bg-purple-400/40 rounded-lg border border-purple-400/50 text-purple-400 transition-all"
                >
                    <FaGithub />
                    <span className="text-sm font-medium text-white">GitHub</span>
                </a>
                <a
                    href={PROJECTS.nextFrame.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-purple-400/20 hover:bg-purple-400/40 rounded-lg border border-purple-400/50 text-purple-400 transition-all"
                >
                    <FaExternalLinkAlt />
                    <span className="text-sm font-medium text-white">Demo</span>
                </a>
            </div>

            <p className="text-black mb-6 animate-item text-start">
                {PROJECTS.nextFrame.description}
            </p>

            <div className="mb-6 animate-item">
                <h3 className="text-lg font-semibold text-purple-400 mb-3 text-start">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                    {PROJECTS.nextFrame.techStack.map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-purple-400/20 rounded-full text-white text-sm border border-purple-400/30"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            <div className="animate-item">
                <h3 className="text-lg font-semibold text-start text-purple-400 mb-3">주요 기능</h3>
                <ul className="space-y-2">
                    {PROJECTS.nextFrame.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-black">
                            <span className="text-purple-400">•</span>
                            <span className="text-sm">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </BaseContentLayout>
    );
}
