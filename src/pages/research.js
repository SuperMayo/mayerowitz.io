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
      <h2>Working Paper</h2>
      <List>
       <li>
          <a href="http://dx.doi.org/10.2139/ssrn.3917979"  rel="noopener noreferrer" target="_blank">
            Innovation Networks and Business-Stealing.</a> With Philippe Aghion, Matthew O. Jackson
          & Abhijit Tagade). Updated: May 2022.
        </li>
      </List>
      <h2>Book Chapter</h2>
      <List>
       <li>
          <a href="http://dx.doi.org/10.1007/978-3-030-54252-8_3" rel="noopener noreferrer" target="_blank">
          A State-Space Model to Estimate Potential Growth in the Industrialized Countries.</a> With Thomas Brand and Gilles Dufrénot.
          <i> Recent Econometric Techniques for Macroeconomic and Financial Data</i>, 2021.
        </li>
      </List>
      <h2>Work in Progress</h2>
      <List>
        <li>Is Venture Capital Fueling Market Concentration? </li>
      </List>
    </Presentation>
  </Layout>
)

export default Research
