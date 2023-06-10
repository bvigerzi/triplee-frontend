import { PageRendererProps } from 'gatsby'
import React, { ReactNode, useRef, MutableRefObject } from 'react'
import styled from 'styled-components'
import { rhythm } from '../utils/typography'
import { Header } from './header'
import { ScrollTop } from './top'
import { Footer } from './footer'
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'
import Div100vh from 'react-div-100vh'

deckDeckGoHighlightElement()

interface Props extends PageRendererProps {
  title: string
  byline?: string
  children: ReactNode
}

const maxWidth = rhythm(26)

const Content = styled.div`
  @media (min-width: ${maxWidth}) {
    margin-left: auto;
    margin-right: auto;
  }
  max-width: ${maxWidth};
  padding: ${`${rhythm(1.5)} ${rhythm(3 / 4)} ${rhythm(0)}`};
  flex-grow: 1;
`

export const Layout = (props: Props) => {
  const { title, byline, location, children } = props

  const topRef: MutableRefObject<HTMLDivElement | null> = useRef(null)

  return (
    <Div100vh style={{ display: 'flex', flexDirection: 'column' }}>
      <Content ref={topRef}>
        <header>
          <Header title={title} byline={byline} location={location} />
        </header>
        <main>{children}</main>
      </Content>
      <ScrollTop topRef={topRef} />
      <Footer />
    </Div100vh>
  )
}
