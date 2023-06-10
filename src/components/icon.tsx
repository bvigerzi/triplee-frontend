import { graphql, useStaticQuery } from 'gatsby'
import Image from 'gatsby-image'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { rhythm } from '../utils/typography'
import { sizes } from '../utils/sizes'

const IconImage = styled(Image)`
  margin-right: ${rhythm(1 / 2)};
`

interface Props {
  large?: boolean
}

export const Icon = ({ large = false }: Props) => {
  const data = useStaticQuery(graphql`
    query IconQuery {
      iconLarge: file(absolutePath: { regex: "/triplee-logo.png/" }) {
        childImageSharp {
          fixed(width: 100, height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      iconSmall: file(absolutePath: { regex: "/triplee-logo.png/" }) {
        childImageSharp {
          fixed(width: 60, height: 60) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== `undefined`
      ? window.innerWidth
      : sizes.mostCommonScreen.width
  )

  const resizeHandler = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  })

  const { author } = data.site.siteMetadata

  const ResponsiveIcon =
    windowWidth < sizes.smallScreenWidth && !large ? (
      <IconImage
        fixed={data.iconSmall.childImageSharp.fixed}
        alt={author}
        loading={'eager'}
      />
    ) : (
      <IconImage
        fixed={data.iconLarge.childImageSharp.fixed}
        alt={author}
        loading={'eager'}
      />
    )

  return ResponsiveIcon
}
