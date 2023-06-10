import { graphql, PageRendererProps, useStaticQuery } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { Layout } from '../components/layout'
import { PaintDripLink } from '../components/link'
import { SEO } from '../components/seo'
import { styledScale, rhythm } from '../utils/typography'

const StyledLink = styled(PaintDripLink)`
  color: #1a9dc6;
`

const Title = styled.h2`
  ${styledScale(0.4)};
  margin-bottom: ${rhythm(1 / 4)};
  font-weight: bold;
`

type Props = PageRendererProps

interface Post {
  node: {
    excerpt: string
    parent: {
      absolutePath: string
      relativeDirectory: string
    }
  }
}

const BlogIndex = (props: Props) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          byline
        }
      }
      allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
        edges {
          node {
            excerpt
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
            }
            parent {
              ... on File {
                relativeDirectory
                absolutePath
              }
            }
          }
        }
      }
    }
  `)

  const siteTitle = data.site.siteMetadata.title
  const siteByline = data.site.siteMetadata.byline
  const markdownPages = data.allMarkdownRemark.edges
  
  const visibleMarkdownPages = markdownPages.filter((post: Post) => {
    return !post.node.parent.relativeDirectory.startsWith("_")
  })

  const blogPosts = visibleMarkdownPages.filter((post: Post) => {
    return post.node.parent.absolutePath.includes("blog")
  })

  return (
    <Layout location={props.location} title={siteTitle} byline={siteByline}>
      <SEO
        title="All posts"
        keywords={[`blog`, `triple e`, `engineering`, `computer science`]}
      />
      {blogPosts.map(({ node }: { node: any }) => {
        const frontmatter = node!.frontmatter!
        const excerpt = node!.excerpt!
        const slug = node!.parent!.relativeDirectory

        const title = frontmatter.title || slug
        return (
          <div key={slug}>
            <Title>
              <StyledLink to={slug}>{title}</StyledLink>
            </Title>
            <small>{frontmatter.date}</small>
            <p
              dangerouslySetInnerHTML={{
                __html: frontmatter.description || excerpt,
              }}
            />
          </div>
        )
      })}
      <div>
        <i>No more posts... how sad</i> 😢
      </div>
    </Layout>
  )
}

export default BlogIndex