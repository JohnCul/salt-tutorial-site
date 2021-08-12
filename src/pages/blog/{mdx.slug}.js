import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { GatsbyImage, getImage } from 'gatsby-plugin-image' // highlight-line
import Layout from '../../components/layout'

const BlogPost = ({ data }) => {
  const image = getImage(data.mdx.frontmatter.hero_image)
  return (
      <Layout pageTitle={data.mdx.frontmatter.title}>
        <p>Posted: {data.mdx.frontmatter.date}</p>
        {/* highlight-start */}
        <GatsbyImage
          image={image}
          alt={data.mdx.frontmatter.hero_image_alt}
        />
        <p>
        Photo Credit:{" "}
        <a to={data.mdx.frontmatter.hero_image_credit_link}>
          {data.mdx.frontmatter.hero_image_credit_text}
        </a>
      </p>
        {/* highlight-end */}
        <MDXRenderer>
          {data.mdx.body}
        </MDXRenderer>
      </Layout>
  )
  }
export const query = graphql`
  query($slug: String) {
    mdx(slug: {eq: $slug}) {
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`
export default BlogPost