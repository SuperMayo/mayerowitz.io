import React from "react"
import styled, { keyframes } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGithubSquare,
  faLinkedin,
  faTwitterSquare,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const shape = keyframes`
  from {
    border-radius: 29% 71% 45% 55% / 70% 25% 75% 25%;
  }

  to {
    border-radius: 79% 21% 39% 61% / 30% 68% 32% 70%;
  }
`

const Container = styled.div`
  box-shadow: inset 1em 1em 15px rgba(0, 128, 128, 0.03);
  padding: 2rem 3rem;
  background: linear-gradient(
    45deg,
    rgba(17, 128, 127, 0.05) 0%,
    rgba(17, 128, 127, 0.003) 100%
  );
  animation: 5s ${shape} ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
`

const Presentation = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: justify;
`

const ExternalLink = styled.a`
  margin: 0 3px;
  opacity: 0.9;
  font-size: 1.2rem;
`

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query externalLinks {
      site {
        siteMetadata {
          externalLinks {
            twitter
            linkedin
            github
            instagram
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <Container>
        <Presentation>
          <p>Hi, I’m Antoine Mayerowitz.</p>
          <p>
            I’m a French PhD candidate in economics at the Paris School of
            Economics and College de France. My research is about innovation,
            corporate governance and social networks.
          </p>
          <p>
            I also practice web development when I’m bored and I’m pationate
            about generative design and computer science.
          </p>
          <p>
            You can also find me there:
            <ExternalLink
              href={data.site.siteMetadata.externalLinks.github}
              target="_blank"
            >
              <FontAwesomeIcon icon={faGithubSquare} />
            </ExternalLink>
            <ExternalLink
              href={data.site.siteMetadata.externalLinks.twitter}
              target="_blank"
            >
              <FontAwesomeIcon icon={faTwitterSquare} />
            </ExternalLink>
            <ExternalLink
              href={data.site.siteMetadata.externalLinks.linkedin}
              target="_blank"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </ExternalLink>
            <ExternalLink
              href={data.site.siteMetadata.externalLinks.instagram}
              target="_blank"
            >
              <FontAwesomeIcon icon={faInstagramSquare} />
            </ExternalLink>
          </p>
        </Presentation>
      </Container>
    </Layout>
  )
}

export default IndexPage
