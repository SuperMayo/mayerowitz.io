import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import { rhythm } from "../utils/typography"
import PostHeader from "../components/postHeader"

const Presentation = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: ${rhythm(1)};

  @media (min-width: 960px) {
    padding: ${rhythm(1)} ${rhythm(2)};
  }
`

const shortcodes = { Link }

const Template = ({ data }) => {
  const post = data.mdx
  const { title, date, description, featuredImage, tags } = post.frontmatter

  return (
    <Layout>
      <Presentation>
        <div style={{ marginBottom: rhythm(3) }}>
          <PostHeader
            title={title}
            date={date}
            description={description}
            tags={tags}
            featuredImage={featuredImage.childImageSharp}
            clickable={false}
          />
        </div>
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{post.body}</MDXRenderer>
        </MDXProvider>
      </Presentation>
    </Layout>
  )
}

export const postQuery = graphql`
  query BlogPost($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      id
      frontmatter {
        date
        description
        tags
        title
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 960) {
              ...GatsbyImageSharpFluid
            }
          }
          relativePath
        }
      }
      body
    }
  }
`

export default Template
