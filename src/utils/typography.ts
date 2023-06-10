import CSSObject  from 'styled-components'
import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.5,
  headerFontFamily: ['Andada', 'sans-serif'],
  headerWeight: 'normal',
  bodyFontFamily: ['Muli', 'serif'],
  googleFonts: [
    {
      name: 'Andada',
      styles: ['400', '700'],
    },
    {
      name: 'Bungee',
      styles: ['400'],
    },
    {
      name: 'Montserrat',
      styles: ['700'],
    },
    {
      name: 'Muli',
      styles: ['400'],
    },
  ],
  overrideStyles: () => ({
    a: {
      color: `#0062de`,
      textDecoration: `none`,
    },
  }),
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale

type StyledScale = (values: number) => CSSObject
export const styledScale = scale as StyledScale
