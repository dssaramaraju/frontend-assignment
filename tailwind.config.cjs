module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        tealbg: "#eaf7fb",
        cyanLight: "#d8f1fb",
        brandBlue: "#1f6f92",
        softBlue: "#dff6fb",
        progressActive: "#1f4650"
      },
      boxShadow: {
        'inner-rounded': 'inset 0 6px 22px rgba(255,255,255,0.6), inset 0 -6px 18px rgba(0,0,0,0.03)',
        'card': '0 18px 40px rgba(17,44,58,0.12)'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
};
