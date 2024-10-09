/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
  	fontFamily: {
  		brand: 'Pacifico',
  		sans: ["Open Sans", "sans-serif"]
  	},
  	container: {
  		center: 'true',
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		fontFamily: {
  			sans: ["Open Sans", "sans-serif"],
  			mono: 'Geist Mono Variable'
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
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
  			},
  			'glow': {
  				'0%, 100%': {
  					boxShadow: '0 0 5px 2px rgba(0, 0, 0, 0.4)'
  				},
  				'50%': {
  					boxShadow: '0 0 5px 2px rgba(0, 0, 0, .6)'
  				}
  			},
  			'border-glow': {
  				'0%': {
  					'box-shadow': 'inset 0 0 0 0px rgba(0, 0, 255, 0.7)',
  					border: '2px solid transparent'
  				},
  				'25%': {
  					'box-shadow': 'inset 0 0 0 5px rgba(0, 0, 255, 0.7)',
  					border: '2px solid transparent'
  				},
  				'50%': {
  					'box-shadow': 'inset 0 0 0 5px rgba(0, 0, 255, 0)',
  					border: '2px solid transparent'
  				},
  				'75%': {
  					'box-shadow': 'inset 0 0 0 5px rgba(0, 0, 255, 0.7)',
  					border: '2px solid transparent'
  				},
  				'100%': {
  					'box-shadow': 'inset 0 0 0 0px rgba(0, 0, 255, 0)',
  					border: '2px solid transparent'
  				}
  			},
  			'border-ball': {
  				'0%': {
  					top: '0',
  					left: '0'
  				},
  				'25%': {
  					top: '0',
  					left: '100%'
  				},
  				'50%': {
  					top: '100%',
  					left: '100%'
  				},
  				'75%': {
  					top: '100%',
  					left: '0'
  				},
  				'100%': {
  					top: '0',
  					left: '0'
  				}
  			},
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
  			'border-ball': 'border-ball 9s linear infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'glow': 'glow 2s linear infinite',
  			'border-glow': 'border-glow 3s linear infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}