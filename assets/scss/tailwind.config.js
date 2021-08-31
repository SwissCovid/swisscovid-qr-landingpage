module.exports = {
    purge: {
      enabled: false,
      content: ['./layouts/**/*.html'],
    },
    darkMode: false,
    theme: {
      colors: {
          background: 'var(--color-background)',
          primary: 'var(--color-primary)',
          'primary-dark': 'var(--color-primary-dark)',
          'primary-light': 'var(--color-primary-light)',
          secondary: 'var(--color-secondary)',
          tertiary: 'var(--color-tertiary)',
          white: 'var(--color-white)',
      },
      borderRadius: { 
        DEFAULT: '3px',
      },
      screens: {
        md: '600px',
      },
      extend: {},
    },
    variants: {    
      extend: {
        opacity: ['disabled'],
      }
    },
    plugins: [],
  }
