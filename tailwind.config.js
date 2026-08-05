import { defineConfig } from "tailwindcss";


export default defineConfig({

  content: [

    "./index.html",

    "./src/**/*.{js,ts,jsx,tsx}"

  ],


  theme: {

    extend: {

      animation: {

        bounceDog:
          "bounceDog 0.4s infinite"

      },


      keyframes: {

        bounceDog: {

          "0%,100%": {

            transform:
              "translateY(0)"

          },


          "50%": {

            transform:
              "translateY(-8px)"

          }

        }

      }

    }

  },


  plugins: []

});