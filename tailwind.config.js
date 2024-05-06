/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html", "./_includes/**/*.html", "./_layouts/**/*.html", "./_posts/**/*.{html,md}", "./_projects/**/*.{html,md}"],
  theme: {
    extend: {
    
      fontFamily: {
        //set papyrus as a font option
          'sans': ['Inter', 'Papyrus', 'sans-serif']
      }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
}
