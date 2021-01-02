/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import { rhythm } from "../utils/typography"
import Header from "./header"

const Page = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  width: 100%;
  flex: 1 0 auto;
`

const Footer = styled.footer`
  text-align: center;
  flex-shrink: 0;
  padding: ${rhythm(1)};
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          menuLinks {
            name
            link
          }
        }
      }
    }
  `)

  return (
    <Page>
      <Header
        siteTitle={data.site.siteMetadata.title}
        menuLinks={data.site.siteMetadata.menuLinks}
      />
      <Container>
        <main style={{ flexGrow: 1 }}>{children}</main>
      </Container>
      <Footer>
        © {new Date().getFullYear()}
        {` `}Antoine Mayerowitz
      </Footer>
    </Page>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
