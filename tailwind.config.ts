import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		boxShadow: {
			dbCardShadow1: '0 1rem 3rem rgba(255, 67, 54, 0.2)',
			dbCardShadow2: '0 1rem 3rem rgba(6, 37, 26, 0.2)',
			dbCardShadow3: '0 1rem 3rem rgba(19, 52, 68, 0.2)',
			dbCardShadow4: '0 1rem 3rem rgba(20, 42, 77, 0.2)',
			dbFluxInterationItemShadow: '0 0 1.5rem rgba(22, 162, 73, 0.5)'
		},
  		colors: {
			db_background_color: '#f0eff5',
  			db_bg_first_color_call_card: '#ff796f',
  			db_bg_second_color_call_card: '#bd261b',
  			db_bg_first_color_visit_card: '#4C6B60',
  			db_bg_second_color_visit_card: '#0B432F',
  			db_bg_first_color_mail_card: '#3269C1',
  			db_bg_second_color_mail_card: '#234A88',
  			db_bg_first_color_invoicing_card: '#338DB6',
  			db_bg_second_color_invoicing_card: '#23607D',

			  green: {
				500: "#24AE7C",
				600: "#0D2A1F",
			  },

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
			sidebarPrimary: {
				DEFAULT: '#6A42AB'
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
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
