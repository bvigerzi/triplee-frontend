import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { styledScale, rhythm } from '../utils/typography'
import { PageRendererProps } from 'gatsby'
import { Icon } from './icon'
import { PaintDripLink } from './link'
import { sizes } from '../utils/sizes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBellSlash } from '@fortawesome/free-regular-svg-icons'
import { faBell as faBellOutline } from '@fortawesome/free-regular-svg-icons'
import { faBell as faBellSolid } from '@fortawesome/free-solid-svg-icons'
import { useSpring, animated } from 'react-spring'
import { urlB64ToUint8Array } from '../utils/push'
import axios from 'axios'

const StyledH1 = styled.h1`
  ${styledScale(1.5)};
  font-family: Bungee, sans-serif;
  font-weight: bold;
`
const StyledH1Small = styled.h1`
  ${styledScale(1.1)};
  font-family: Bungee, sans-serif;
  font-weight: bold;
`

const StyledP = styled.p`
  ${styledScale(0.2)};
  font-weight: regular;
  font-style: italic;
  margin-left: ${rhythm(0.5)};
`

const StyledLink = styled(PaintDripLink)`
  box-shadow: none;
  color: inherit;
  text-decoration: none;
`

const VerticalContent = styled.div`
  display: flex;
  flex-direction: column;
`

const HorizontalContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const NotificationDiv = styled.div`
  margin-top: ${`${rhythm(0.5)}`};
`

interface Props extends PageRendererProps {
  title: string
  byline?: string
}

const AnimatedFontAwesome = animated(FontAwesomeIcon)

export const Header = (props: Props) => {
  const { title, byline, location } = props

  const onIndexPage: boolean = location.pathname === '/'

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== `undefined`
      ? window.innerWidth
      : sizes.mostCommonScreen.width
  )

  const [notificationState, setNotificationState] = useState<
    NotificationPermission
  >(typeof Notification !== `undefined` ? Notification.permission : 'default')

  const [mouseOnNotification, setMouseOnNotification] = useState(false)

  const [animating, setAnimating] = useState(false)

  const supportsNotification =
    typeof window !== `undefined` &&
    typeof navigator !== `undefined` &&
    'serviceWorker' in navigator &&
    'PushManager' in window && false // disable notification

  const resizeHandler = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  })

  const requestPermission = () => {
    return new Promise(function(resolve, reject) {
      const permissionResult = Notification.requestPermission(function(result) {
        resolve(result)
      })

      if (permissionResult) {
        permissionResult.then(resolve, reject)
      }
    }).then(function(permissionResult) {
      setNotificationState(permissionResult as NotificationPermission)
      if (permissionResult === 'granted') {
        navigator.serviceWorker.ready.then(async swRegistration => {
          const pushSubscription = await swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(
              'BOF6kYgJWmvpF5TMxO_poJaC4P5qJFwRhpcN1x6iMjeKCMT17l3xddXheVh1v00b_Y_GdJeZsiRKfpYCDynweDA'
            ),
          })
          axios.post(
            'https://us-central1-triple-e-8750b.cloudfunctions.net/registerPush',
            pushSubscription
          )
        })
      }
    })
  }

  const { x: ringAnim } = useSpring({
    reset: !animating,
    loop: false,
    cancel: !mouseOnNotification && !animating,
    from: { x: 1 },
    x: 0,
    onStart: () => setAnimating(true),
    onRest: () => setAnimating(false),
    config: { duration: 650 },
  })

  const fadeAnim = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    cancel: notificationState === 'default',
    config: { duration: 650 },
  })

  return (
    <VerticalContent>
      <HorizontalContent>
        <HorizontalContent>
          <StyledLink to={'/'}>
            <Icon large={!onIndexPage} />
          </StyledLink>
          {onIndexPage ? (
            <StyledLink to={'/'}>
              {windowWidth < sizes.smallScreenWidth ? (
                <StyledH1Small>{title}</StyledH1Small>
              ) : (
                <StyledH1>{title}</StyledH1>
              )}
            </StyledLink>
          ) : (
            <React.Fragment />
          )}
        </HorizontalContent>
        <NotificationDiv>
          {supportsNotification &&
            (notificationState === 'default' ? (
              <AnimatedFontAwesome
                style={{
                  rotateZ: ringAnim.to({
                    range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 1],
                    output: [0, 20, 0, -20, 0, 30, 0, -30, 0],
                  }),
                  scale: ringAnim.to({
                    range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 1],
                    output: [1, 1, 1, 1.1, 1.1, 1.2, 1.1, 1.1, 1],
                  }),
                }}
                size={'lg'}
                icon={faBellOutline}
                title={'Enable Notifications'}
                onClick={requestPermission}
                onMouseEnter={() => setMouseOnNotification(true)}
                onMouseLeave={() => setMouseOnNotification(false)}
              />
            ) : notificationState === 'granted' ? (
              <AnimatedFontAwesome
                style={fadeAnim}
                size={'lg'}
                icon={faBellSolid}
                title={'Notification Enabled'}
              />
            ) : (
              <AnimatedFontAwesome
                style={fadeAnim}
                size={'lg'}
                icon={faBellSlash}
                color={'grey'}
                title={'Notification Disabled'}
              />
            ))}
        </NotificationDiv>
      </HorizontalContent>
      {onIndexPage && byline ? <StyledP>{byline}</StyledP> : <React.Fragment />}
    </VerticalContent>
  )
}
