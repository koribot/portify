const config = {
  plugins: ["@tailwindcss/postcss"],
   theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionDuration: {
        '300': '300ms',
        '500': '500ms',
        '1000': '1000ms',
      },
      scale: {
        '105': '1.05',
        '110': '1.1',
      },
      translate: {
        '1': '0.25rem',
      },
    },
  },
};

export default config;
