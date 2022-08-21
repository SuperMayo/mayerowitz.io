import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import List from "../components/list"
import { rhythm } from "../utils/typography"

import { graphql } from "gatsby"

const Presentation = styled.div`
  max-width: 960px;
  padding: ${rhythm(1)};

  @media (min-width: 960px) {
    padding: ${rhythm(1)} ${rhythm(2)};
  }
`

const Research = ({data}) => {
  const p = data.markdownRemark.frontmatter;

  return(
  <Layout>
    <SEO title={p.title} />
    <Presentation>
      <h2>{p.wp.heading}</h2>
      <List>
        {p.wp.items.map((item) => (
          <li>
          <a href={item.url}  rel="noopener noreferrer" target="_blank">
            {item.title}</a> {item.authors}. Updated: {item.date}.
        </li>
        )
        )
      }
      </List>
      <h2>{p.book.heading}</h2>
      <List>
        {p.book.items.map((item) => (
          <li>
          <a href={item.url}  rel="noopener noreferrer" target="_blank">
            {item.title}</a> {item.authors}. <i>{item.book}</i>, {item.year}.
        </li>
        )
        )
      }
      </List>
      <h2>{p.wip.heading}</h2>
      <List>
      {p.wip.items.map((item) => <li> {item} </li>)}
      </List>
    </Presentation>
  </Layout>
  )
}

export default Research;

export const researchPageQuery = graphql`
query ResearchPageQuery {
  markdownRemark(frontmatter: {templateKey: {eq: "research-page"}}) {
    frontmatter {
      title
      path
      templateKey
      wip {
        heading
        items
      }
      wp {
        heading
        items {
          abstract
          authors
          date
          title
          url
        }
      }
      book {
        heading
        items {
          abstract
          authors
          year
          url
          book
          title
        }
      }
    }
  }
}
`;