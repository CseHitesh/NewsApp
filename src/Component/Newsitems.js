import React, { Component } from 'react'

export default class Newsitems extends Component {


    render() {
        let { title, desc, ImageUrl, NewsUrl, author, publishedAt, name } = this.props;

        return (
            <>
                <div className="card my-1" >
                    <div className="container ">
                        <span className="badge rounded-pill badge-notification bg-danger position-absolute top-0 end-0">{name}</span>
                    </div>
                    <img src={ImageUrl} className="card-img-top" alt="..." />

                    <div className="card-body">



                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{desc}</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : "unknown"} on {new Date(publishedAt).toGMTString()}</small></p>
                        <a href={NewsUrl} rel="noreferrer" target='_blank' className="btn btn-primary">Read More</a>
                    </div>
                </div>



            </>
        )
    }
}
