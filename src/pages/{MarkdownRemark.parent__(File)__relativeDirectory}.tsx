import { graphql, PageRendererProps } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { Layout } from '../components/layout'
import { PaintDripLink } from '../components/link'
import { SEO } from '../components/seo'
import { rhythm, styledScale } from '../utils/typography'

interface Props extends PageRendererProps {
  pageContext: any
  data: any
}

const Date = styled.p`
  display: block;
  ${styledScale(-1 / 5)};
  margin-bottom: ${rhythm(1)};
  margin-top: ${rhythm(-1)};
`

const Divider = styled.hr`
  margin-bottom: ${rhythm(1)};
`

const PostNavigator = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`

const MarkdownPost = (props: Props) => {
  const data = props.data!
  const post = data.markdownRemark!
  const excerpt = post.excerpt!
  const frontmatter = post.frontmatter!
  const html = post.html!
  const siteTitle = data.site!.siteMetadata!.title!
  const { previous, next } = props.pageContext
  const navigatorEnabled = false

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title={frontmatter.title!}
        description={frontmatter.description || excerpt}
      />
      <h1>{post.frontmatter!.title}</h1>
      <Date>{frontmatter.date}</Date>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Divider />
      <PostNavigator>
        <li>
          <PaintDripLink to={'/'} rel="/">
            ↵ Home
          </PaintDripLink>
        </li>
        <li>
          {navigatorEnabled && previous && (
            <PaintDripLink to={previous.fields!.slug!} rel="prev">
              ← {previous.frontmatter!.title}
            </PaintDripLink>
          )}
        </li>
        <li>
          {navigatorEnabled && next && (
            <PaintDripLink to={next.fields!.slug!} rel="next">
              {next.frontmatter!.title} →
            </PaintDripLink>
          )}
        </li>
      </PostNavigator>
    </Layout>
  )
}


export const query = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`

export default MarkdownPost
