import React from 'react'
import styled from 'styled-components'
import { PaintDripLink } from './link'
import { rhythm } from '../utils/typography'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faYoutube,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons'

const Content = styled.div`
  background-color: #11a7d5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${`${rhythm(0.3)}`};
  margin-top: ${rhythm(1)};
`

const WrappedLink = styled(PaintDripLink)`
  margin-left: ${`${rhythm(0.5)}`};
  margin-right: ${`${rhythm(0.5)}`};
  text-align: center;
  color: inherit;
`

const WrappedFontAwesome = styled(FontAwesomeIcon)`
  margin-left: ${`${rhythm(0.5)}`};
  margin-right: ${`${rhythm(0.5)}`};
  color: black;
`

export const Footer = () => {
  return (
    <Content>
      <WrappedLink to="/about">about</WrappedLink>
      <WrappedLink to="/oss">we ❤️ open source</WrappedLink>
      <WrappedLink to="https://github.com/bvigerzi">
        <WrappedFontAwesome icon={faGithub} title={'Triple E GitHub'} />
      </WrappedLink>
      <WrappedLink to="https://www.youtube.com/channel/UCYWFgqqus7rt8BNca0G4ctw">
        <WrappedFontAwesome icon={faYoutube} title={'Triple E YouTube'} />
      </WrappedLink>
      <WrappedLink to="https://www.facebook.com/TripleEdotTech">
        <WrappedFontAwesome icon={faFacebook} title={'Triple E Facebook'} />
      </WrappedLink>
    </Content>
  )
}
