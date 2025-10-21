/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-custom-properties': {
      preserve: false, // Remove custom properties from output CSS for better browser support
      importFrom: [
        './app/globals.css' // Import custom properties from globals.css for processing
      ]
    },
  },
}

export default config