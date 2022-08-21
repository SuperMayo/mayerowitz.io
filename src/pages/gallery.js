import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {getImage, GatsbyImage} from "gatsby-plugin-image"
import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"
import "./gallery.css"

const Container = styled.div`
  max-width: 500px;
  padding: 3rem;
  width: 100%;
  margin: 0 auto;
`

const Meta = styled.div`
  padding-top: 1em;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`

const SmallSamp = styled.samp`
  font-size: calc(65%);
`

const Gallery = ({ data }) => (
  <Layout>
    <SEO title="Gallery" />
    {data.allFile.edges.map(({ node }) => (
      <Container>
        <Zoom>
          <GatsbyImage image={getImage(node)} />
        </Zoom>
        <Meta>
          <span>
            <SmallSamp>{node.name.split("_")[0]}</SmallSamp>
          </span>
          <SmallSamp>{node.name.split("_")[1]}</SmallSamp>
        </Meta>
      </Container>
    ))}
  </Layout>
)

export default Gallery

export const GalleryImages = graphql`
  query MyQuery {
    allFile(
      filter: { sourceInstanceName: { eq: "gallery" } }
      sort: { fields: name, order: DESC }
    ) {
      edges {
        node {
          id
          name
          relativePath
          birthTime(formatString: "Y.M.D")
          childImageSharp {
            gatsbyImageData(
              width: 500
              placeholder: BLURRED
            )
          }
        }
      }
    }
  }
`
