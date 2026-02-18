import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
        screens: {
            'mobile': {'max': '767px'},      // 모바일: 0 ~ 767px
            'tablet': {'min': '768px', 'max': '1279px'},  // 태블릿: 768 ~ 1279px
            'desktop': {'min': '1280px'},    // 데스크탑: 1280px ~
        }
    },
    plugins: [],
}

export default config