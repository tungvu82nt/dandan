/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Microsoft YaHei"', 'SimHei', 'SimSun', 'Arial', 'Helvetica', 'sans-serif'],
            },
            colors: {
                // Main Colors
                primary: '#ca231e',      // Main Red (Menu BG)
                secondary: '#ba141a',    // Hover/Active Red
                darkRed: '#a71c1d',      // Accent Red
                brightRed: '#ea2b32',    // Button/Header BG

                // Text & Link Colors
                linkRed: '#da2c31',      // Link Text
                hoverRed: '#ED4040',     // Link Hover
                textMain: '#333333',     // Main Text (Headers)
                textSub: '#666666',      // Sub Text (Descriptions)
                textLight: '#999999',    // Meta Text (Dates)

                // Accents
                accent: '#fc960c',       // Orange (H1 / Highlights)
                badge: '#f7b709',        // Yellow (Badges)

                // Backgrounds & Borders
                bgFooter: '#f2f2f2',     // Footer Background
                bgBlock: '#f5f6f7',      // Light Block Background
                borderGray: '#dedede',   // Borders
                lightGray: '#f5f6f7'     // Alias for bgBlock
            },
            maxWidth: {
                'container': '1200px',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                marquee: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(-100%)' },
                }
            },
            animation: {
                fadeIn: 'fadeIn 0.3s ease-out forwards',
                marquee: 'marquee 20s linear infinite',
            }
        },
    },
    plugins: [],
}
