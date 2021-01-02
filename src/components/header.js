import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import styled from "styled-components"

import Burger from "../components/burger"
import { rhythm } from "../utils/typography"

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: left;
  max-width: 960px;
  margin: ${rhythm(0.5)} auto;
  margin-top: ${rhythm(2)};
  padding: 0 1rem;
  @media (min-width: 960px) {
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
`

const BurgerWrapper = styled.button`
  border: none;
  background: none;
  :focus & {
    outline: 0;
  }
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media (min-width: 960px) {
    width: auto;
  }
`

const MenuItem = styled.li`
  list-style-type: none;
  padding: 0;
  margin: 0;
  padding: ${rhythm(0.5)};
`

const NavBar = styled.div`
  max-height: 0;
  opacity: 0;
  display: none;
  ${props =>
    props.burgerOn &&
    `
      margin: 1rem 0;
      max-height: 500px;
      opacity: 1;
      display: inline;
      transition: opacity 0.5s ease;
      text-align: right;
    `}
  ${props =>
    !props.burgerOn &&
    `
    display: none;
    `}
  @media (min-width: 960px) {
    opacity: 1;
    display: inline;
    margin: 0;
    max-height: 300px;
    ${MenuItem} {
      display: inline;
      padding: 0.8rem;
    }
  }
`

const Header = ({ siteTitle, menuLinks }) => {
  const [burgerOn, setBurger] = useState(false)

  return (
    <header
      style={{
        marginBottom: `1.45rem`,
      }}
    >
      <FlexContainer>
        <TitleWrapper>
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: `black`,
                textDecoration: `none`,
              }}
            >
              {siteTitle}
            </Link>
          </h1>
          <BurgerWrapper
            tabIndex={0}
            role="button"
            onClick={() => setBurger(!burgerOn)}
            onKeyPress={() => setBurger(!burgerOn)}
          >
            <Burger></Burger>
          </BurgerWrapper>
        </TitleWrapper>
        <NavBar burgerOn={burgerOn}>
          <nav>
            <ul style={{ margin: 0 }}>
              {menuLinks.map(link => (
                <MenuItem key={link.name}>
                  <Link
                    className="menuItem"
                    activeClassName="active"
                    to={link.link}
                  >
                    {link.name}
                  </Link>
                </MenuItem>
              ))}
            </ul>
          </nav>
        </NavBar>
      </FlexContainer>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  menuLinks: PropTypes.array,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
