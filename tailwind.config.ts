import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {



      backgroundPosition: {
        bottom: 'bottom',
        'bottom-4': 'center bottom 1rem',
        center: 'center',
        left: 'left',
        'left-bottom': 'left bottom',
        'left-top': 'left top',
        right: 'right',
        'right-bottom': 'right bottom',
        'right-top': 'right top',
        top: 'top',
        'position-plan-ahorro-home': 'center -10rem',
      },
      screens: {
        'mq-300px': '300px',
        'mq-350px': '350px',
        'mq-400px': '400px',
        'mq-450px': '450px',
        'mq-500px': '500px',
        'mq-550px': '550px',
        'mq-600px': '600px',
        'mq-650px': '650px',
        'mq-700px': '700px',
        'mq-750px': '750px',
        'mq-800px': '800px',
        'mq-850px': '850px',
        'mq-900px': '900px',
        'mq-950px': '950px',
        'mq-1000px': '1000px',
        'mq-1050px': '1050px',
        'mq-1100px': '1100px',
        'mq-1150px': '1150px',
        'mq-1200px': '1200px',


        'mq-364px': '364px',
        'mq-430px': '430px',
        'mq-542px': '542px',
        'mq-720px': '720px',
        'mq-772px': '772px',
        'mq-810px': '810px',
      },
      colors: {
        avecBlueColor: '#171c34',
        avecBlueColorHover: '#202A51',
        avecBlueColorDark: '#000419fa',
        avecWhiteColor: '#e4e4e4',
        avecGrayColor: '#ededed',
        avecLightBlueColor: '#00a3e0',
        avecGrayInputColor: '#f4f4f4',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
export default config;
