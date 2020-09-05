import React from "react"
import styled from "styled-components"
import propTypes from "prop-types"
import Img from "gatsby-image"
import { Link } from "gatsby"

import { rhythm } from "../utils/typography"

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  font-size: calc(80%);
`

const StyledImage = styled(Img)`
  border-radius: 3px;
`

const ConditionalLink = ({ clickable, path, children }) => {
  if (clickable) {
    return <Link to={path}>{children}</Link>
  } else {
    return <React.Fragment>{children}</React.Fragment>
  }
}

const PostHeader = ({
  title,
  date,
  description,
  tags,
  featuredImage,
  clickable,
  path,
}) => (
  <div>
    {console.log(clickable)}
    <Meta>
      <span>
        {tags.map(tag => (
          <span key={tag}>#{tag}</span>
        ))}
      </span>
      <span>{date}</span>
    </Meta>
    <ConditionalLink path={path} clickable={clickable}>
      <div style={{ width: "100%", marginBottom: rhythm(0.5) }}>
        <StyledImage fluid={featuredImage.fluid} />
      </div>
      <h2 style={{ marginBottom: rhythm(0.5) }}>{title}</h2>
    </ConditionalLink>
    <h4 style={{ marginBottom: rhythm(0.5) }}>{description}</h4>
  </div>
)

PostHeader.propTypes = {
  title: propTypes.string,
  date: propTypes.string,
  description: propTypes.string,
  tags: propTypes.array,
  featuredImage: propTypes.node,
  clickable: propTypes.bool,
  path: propTypes.string,
}

export default PostHeader
