import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import List from "../components/list"
import { rhythm } from "../utils/typography"

const Presentation = styled.div`
  max-width: 960px;
  padding: ${rhythm(1)};

  @media (min-width: 960px) {
    padding: ${rhythm(1)} ${rhythm(2)};
  }
`

const Research = () => (
  <Layout>
    <SEO title="Research" />
    <Presentation>
      <blockquote>
        Not much to show here... but i'm workin on it !{" "}
        <span role="img" aria-label="computer-scientist">
          👨🏻‍💻
        </span>
      </blockquote>
      <h2>Work in Progress</h2>
      <List>
        <li>
          Social networks in the Innovation Process. (With P. Aghion, P. Jackson
          & X. Jaravel)
        </li>
        <li>Is Venture Capital Fueling Market Concentration ? </li>
      </List>
    </Presentation>
  </Layout>
)

export default Research
