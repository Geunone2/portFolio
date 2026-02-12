import type {Project} from "../types";

export const PROJECTS: Record<"nextFrame" | "lowPoly", Project> = {
    nextFrame: {
        name: "Next Frame",
        period: "2024.01 - 2024.03",
        github: "https://github.com/next-frame-lab",
        demo: "https://nextframe.wisoft.dev/",
        techStack: ["React", "TypeScript", "TailwindCSS", "Recoil", "React Query", "Vercel"],
        description: "Next Frame은 대규모 트래픽을 감당할 수 있는 견고한 티켓팅 서비스입니다.",
        features: [
            "OAuth 2.0(카카오 등) 소셜 로그인",
            "공연 검색 및 상세 정보 조회",
            "실시간 좌석 상태 확인 및 예매",
            "외부 결제 시스템(TOSS)을 활용한 결제 시스템 구축",
            "예매 내역 확인 및 QR 코드 티켓 발급",
            "사용자 리뷰 및 평점(좋아요) 구현"
        ]
    },
    lowPoly: {
        name: "Low Poly",
        period: "2023.09 - 2023.12",
        github: "https://github.com/low-poly-dev",
        demo: "https://lowpoly.example.com/",
        techStack: ["React", "TypeScript", "Three.js", "TailwindCSS", "Vite"],
        description: "Low Poly는 3D 그래픽을 활용한 인터랙티브 웹 경험을 제공하는 프로젝트입니다.",
        features: [
            "Three.js를 활용한 3D 모델 렌더링",
            "카메라 애니메이션 및 인터랙션",
            "반응형 3D 환경 구성",
            "GLTF 모델 로딩 및 최적화",
            "사용자 친화적인 UI/UX 구현"
        ]
    }
}