/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT ({
    content: ["./index.html",
              "./src/**/*.{js,ts,jsx,tsx}",],
    theme: {
        extend: {
            width: {
                150: "150px",
                190: "190px",
                225: "225px",
                275: "275px",
                300: "300px",
                340: "340px",
                350: "350px",
                375: "375px",
                460: "460px",
                656: "656px",
                880: "880px",
                508: "508px",
            },
            height: {
                80: "80px",
                150: "150px",
                225: "225px",
                300: "300px",
                340: "340px",
                370: "370px",
                420: "420px",
                510: "510px",
                600: "600px",
                650: "650px",
                685: "685px",
                800: "800px",
                "90vh": "90vh",
            },
            minWidth: {
                210: "210px",
                350: "350px",
                620: "620px",
            },
            screens: {
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
                "2xl": "1536px",
            },
            colors: {
                bgColor: "#e5eaef",
                overLay: "#000",
                textPrice: "rgb(237 27 45)",
                buttonProduct: "#ed1b2e",
                require: "#ed1b2c",
                headingColor: "#2e2e2e", //đen
                textColor: "#515151", //đen-xám
                cartNumBg: "#e80013", //đỏ
                //xanh nhạt - đậm (blue)
                primary: { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a", "950": "#172554" },
                cardOverlay: "rgba(256,256,256,0.4)", //gần như trong suốt
                lighttextGray: "#9ca0ab", //xám
                card: "rgba(256,256,256,0.8)",
                cartBg: "#282a2c", //đen
                cartItem: "#2e3033", //đen
                cartTotal: "#343739", //đen
                footerColor: "#627F7E",
            },
        },
        fontFamily: {
            'body': [
                'Inter',
                'ui-sans-serif',
                'system-ui',
                '-apple-system',
                'system-ui',
                'Segoe UI',
                'Roboto',
                'Helvetica Neue',
                'Arial',
                'Noto Sans',
                'sans-serif',
                'Apple Color Emoji',
                'Segoe UI Emoji',
                'Segoe UI Symbol',
                'Noto Color Emoji'
            ],
            'sans': [
                'Inter',
                'ui-sans-serif',
                'system-ui',
                '-apple-system',
                'system-ui',
                'Segoe UI',
                'Roboto',
                'Helvetica Neue',
                'Arial',
                'Noto Sans',
                'sans-serif',
                'Apple Color Emoji',
                'Segoe UI Emoji',
                'Segoe UI Symbol',
                'Noto Color Emoji'
            ]
        }
    },
    plugins: [],
});


