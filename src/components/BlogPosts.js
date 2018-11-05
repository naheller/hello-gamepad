import React, { PureComponent } from 'react'
import moment from 'moment'
import _ from 'lodash'
import Link from 'gatsby-link'
// import Img from 'gatsby-image'
import '../../static/styles/fontello/css/fontello.css'

class BlogPosts extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            numPosts: 10
        }
    }

    render() {
        const posts = _.get(this.props, 'posts', [])

        return (
            <div className="post-list-wrapper">
                {
                    this.props.tagName && [
                        <p className="tag-header">stories about</p>,
                        <h3 className="tag-name">{this.props.tagName}</h3>
                    ]
                }
                <div className="post-list">
                {
                    _.map(posts, post => {
                        // const title = _.get(post, 'node.frontmatter.title', '')
                        const { title, subtitle, date, image, metaTitle /*tags, description, author*/ } = post.node.frontmatter
                        const resizedImage = `${image}-/scale_crop/350x275/center/-/format/auto/-/progressive/yes/`

                        let formattedDate = moment(date).format('MMM D, YYYY – h:mm a')
                        const hourMin = moment(date).format('h:mm a')
                        const now = moment()

                        const hoursDiff = now.diff(moment(date), 'hours')
                        const daysDiff = now.diff(moment(date), 'days')



                        if (hoursDiff < 24) {
                            formattedDate = `Today at ${hourMin}`
                        } else if (daysDiff === 1) {
                            formattedDate = `Yesterday at ${hourMin}`
                        }

                        return (
                            <Link to={post.node.fields.slug} className="post" title={metaTitle}>
                                <img className="image" src={resizedImage} alt={`${metaTitle} - Gamepad News`} />
                                <div className="words">
                                    <div>
                                        <h3 className="title">{title}</h3>
                                        {/* <div className="subtitle">
                                            <span className="icon">
                                                <i className="icon-right-dir" />
                                            </span>
                                            <p className="text">{subtitle}</p>
                                        </div> */}
                                        {subtitle && (
                                            <div className="subtitle">
                                                <span className="icon">
                                                    {/* <i className="icon-right-dir" /> */}
                                                    ▸
                                                </span>
                                                <p className="text">{subtitle}</p>
                                            </div>
                                        )}
                                    </div>
                                    <h6 className="date">{formattedDate}</h6>
                                </div>
                            </Link>
                        )
                    })
                }
                </div>
            </div>
        )
    }
}

export default BlogPosts