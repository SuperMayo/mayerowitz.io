import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const Presentation = styled.div`
  max-width: 960px;
  padding: ${rhythm(1)};

  @media (min-width: 960px) {
    padding: ${rhythm(1)} ${rhythm(2)};
  }
`

const Research = () => {
  const data = useStaticQuery(graphql`
    query TeachingQuery {
      teachingJson {
        teaching {
          course
          institution
          year
          ressources {
            title
            elements {
              link
              name
              supplementLink
              supplementName
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Research" />
      <Presentation>
        {data.teachingJson.teaching.map(
          ({ course, institution, ressources }) => (
            <div style={{ marginBottom: "2rem" }}>
              <h2>
                {course} - {institution}
              </h2>
              {ressources !== null &&
                ressources.map(res => (
                  <ul>
                    {res.title !== null && <h3>{res.title}</h3>}
                    {res.elements.map(element => (
                      <li>
                        <a
                          href={element.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {element.name}
                        </a>
                        {element.supplementName !== null && (
                          <React.Fragment>
                            <span> - </span>
                            {console.log(element)}
                            <a
                              href={element.supplementLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {element.supplementName}
                            </a>
                          </React.Fragment>
                        )}
                      </li>
                    ))}
                  </ul>
                ))}
            </div>
          )
        )}
      </Presentation>
    </Layout>
  )
}

export default Research
