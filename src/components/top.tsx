import React, { RefObject, useEffect, useState } from 'react'
import { rhythm } from '../utils/typography'
import { UpCircleTwoTone } from '@ant-design/icons'
import { Property } from 'csstype'

interface Props {
  topRef: RefObject<HTMLDivElement | null>
}

export const ScrollTop = (props: Props) => {
  const { topRef } = props

  const onClick = () => {
    topRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const [visible, setVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const [contentRightBoundary, setContentRightBoundary] = useState(0)

  useEffect(() => {
    setContentRightBoundary(topRef?.current?.getBoundingClientRect().right ?? 0)
  })

  const scrollHandler = () => {
    const closeToTop = window.scrollY <= window.innerHeight
    const scrollingDown = scrollY < window.scrollY
    const scrollingUp = scrollY > window.scrollY

    if ((scrollingDown || closeToTop) && visible) {
      setVisible(false)
    } else if (scrollingUp && !closeToTop && !visible) {
      setVisible(true)
    }
    setScrollY(window.scrollY)
  }

  const resizeHandler = () => {
    setContentRightBoundary(topRef?.current?.getBoundingClientRect().right ?? 0)
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler)
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
      window.removeEventListener('resize', resizeHandler)
    }
  })

  const fontSize = 35

  const divStyle = {
    position: 'fixed' as Property.Position,
    width: '100%',
    bottom: `${rhythm(1.2)}`,
    height: `${rhythm(1.2)}`,
    left: `${contentRightBoundary - fontSize - 20}px`,
    zIndex: 1000,
  }

  return visible ? (
    <div style={divStyle}>
      <UpCircleTwoTone onClick={onClick} style={{ fontSize }} />
    </div>
  ) : (
    <React.Fragment />
  )
}
