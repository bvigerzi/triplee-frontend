import { graphql, PageRendererProps, useStaticQuery } from 'gatsby'
import React from 'react'
import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import { PaintDripLink } from '../components/link'

type Props = PageRendererProps

export const NotFoundPage = (props: Props) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Layout location={props.location} title={data.site.siteMetadata.title}>
      <SEO title="Not Found" />
      <h1>Oops!</h1>
      <p>
        What you were looking for either no longer exists or never existed in
        the first place. Sorry about that!
      </p>
      <PaintDripLink to={'/'} rel="/">
        ↵ Home
      </PaintDripLink>
    </Layout>
  )
}

export default NotFoundPage
