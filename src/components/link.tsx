import Link from 'gatsby-plugin-transition-link'
// tslint:disable-next-line:no-submodule-imports
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import * as React from 'react'
import { ComponentProps } from 'react'

const FADE_TIME = 0.3

type Props = Partial<ComponentProps<typeof Link>>

export const PaintDripLink = (props: Props) => {
  const { children, ...linkProps } = props

  const internalLink: boolean = linkProps.to?.startsWith('/') ?? false

  return internalLink ? (
    <AniLink
      paintDrip={true}
      duration={FADE_TIME}
      direction={'top'}
      hex={'#11a7d5'} // TODO: COLOUR THEME FIX
      {...linkProps}
    >
      {children}
    </AniLink>
  ) : (
    <a href={linkProps.to}>{children}</a>
  )
}
