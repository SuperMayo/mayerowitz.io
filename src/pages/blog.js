import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import PostHeader from "../components/postHeader"
import Layout from "../components/layout"
import { rhythm } from "../utils/typography"

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: ${rhythm(2)};
`

const BlogPage = ({ data }) => (
  <Layout>
    {data.allMdx.edges.map(({ node }) => (
      <Container>
        <PostHeader
          key={node.id}
          title={node.frontmatter.title}
          date={node.frontmatter.date}
          description={node.frontmatter.description}
          tags={node.frontmatter.tags}
          featuredImage={node.frontmatter.featuredImage.childImageSharp}
          clickable={true}
          path={node.frontmatter.path}
        />
      </Container>
    ))}
  </Layout>
)

export default BlogPage

export const AllBlogsQuery = graphql`
  query AllBlogPosts {
    allMdx {
      edges {
        node {
          frontmatter {
            date
            title
            description
            path
            tags
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 700) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
          id
        }
      }
    }
  }
`
