import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
  ],
  important : "#root",
  
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors : {
        'dark-blue': '#43682A',
        'light-blue': '#6AA04B',
      }
    },
  },
  plugins: [],
});
