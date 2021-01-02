import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import { rhythm } from "../utils/typography"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Container = styled.div`
  max-width: 960px;
  padding: ${rhythm(1)};

  @media (min-width: 960px) {
    padding: ${rhythm(1)} ${rhythm(2)};
  }
`

const SmallSamp = styled.samp`
  font-size: calc(80%);
`

const Projects = () => {
  const data = useStaticQuery(graphql`
    query projects {
      projectsJson {
        generative {
          name
          link
          date
          description
        }
        web {
          name
          link
          date
          description
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Gallery" />
      <Container>
        <h2>Generative Art</h2>
        <ul>
          {data.projectsJson.generative.map(({ name, link, description }) => (
            <li key={name}>
              <a href={link} rel="noopener noreferrer">
                {name}
              </a>
              <br />
              <SmallSamp>{description}</SmallSamp>
            </li>
          ))}
        </ul>
        <h2>Web</h2>
        <ul>
          {data.projectsJson.web.map(({ name, link, description }) => (
            <li key={name}>
              <a key={name} href={link} rel="noopener noreferrer">
                {name}
              </a>
              <br />
              <SmallSamp>{description}</SmallSamp>
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  )
}

export default Projects
