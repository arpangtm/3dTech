/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	fontSize: {
  		sm: '0.8rem',
  		base: '1rem',
  		xl: '1.25rem',
  		'2xl': '1.563rem',
  		'3xl': '1.953rem',
  		'4xl': '2.441rem',
  		'5xl': '3.052rem',
  		'10xl': '20rem',
  		'body-lg': '1rem',
  		body: '.875rem'
  	},
  	extend: {
  		colors: {
  			'primary-color': 'rgb(var(--primary-color) / <alpha-value>)',
  			'secondary-color': 'rgb(var(--secondary-color) / <alpha-value>)',
  			'accent-color': 'rgb(var(--accent-color) / <alpha-value>)',
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
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		animation: {
  			'spin-slow': 'spin 3s linear infinite',
  			'spin-reverse': 'spin-reverse 2s linear infinite',
  			'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			float: 'float 3s ease-in-out infinite',
  			'fade-in': 'fadeIn 1s ease-out forwards'
  		},
  		keyframes: {
  			'spin-reverse': {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(-360deg)'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			fadeIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			}
  		},
  		boxShadow: {
  			neon: '0 0 5px theme("colors.primary-color"), 0 0 20px theme("colors.primary-color")',
  			'neon-secondary': '0 0 5px theme("colors.secondary-color"), 0 0 20px theme("colors.secondary-color")',
  			'neon-accent': '0 0 5px theme("colors.accent-color"), 0 0 20px theme("colors.accent-color")'
  		},
  		textShadow: {
  			sm: '0 1px 2px rgba(0, 0, 0, 0.5)',
  			md: '0 2px 4px rgba(0, 0, 0, 0.5)',
  			lg: '0 4px 8px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.5)',
  			glow: '0 0 5px rgba(var(--primary-color), 0.5), 0 0 20px rgba(var(--primary-color), 0.3)',
  			'glow-secondary': '0 0 5px rgba(var(--secondary-color), 0.5), 0 0 20px rgba(var(--secondary-color), 0.3)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  variants: {
    fill: ['hover', 'focus'],
    extend: {
      animation: ['hover', 'focus'],
      boxShadow: ['hover', 'focus'],
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      const newUtilities = {};
      const textShadows = theme('textShadow', {});
      
      Object.entries(textShadows).forEach(([key, value]) => {
        newUtilities[`.text-shadow-${key}`] = {
          textShadow: value,
        };
      });
      
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
      require("tailwindcss-animate")
],
};
