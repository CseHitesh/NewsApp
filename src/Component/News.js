import React, { Component } from "react";
import Newsitems from "./Newsitems";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export default class News extends Component {

    static defaultProps = {
        country: 'in',
        category: 'general'

    }
    static propTypes = {
        country: PropTypes.string.isRequired,
        pagesize: PropTypes.number,
        category: PropTypes.string.isRequired,
    }


    async componentDidMount() {

        this.updateNews();
    }

    constructor(props) {
        super();
        // console.log("i am a constructor from the News");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            maximumPage: 0,
            totalResults: 0,
        };
    }

    updateNews = async (props) => {
        this.props.setProgress(30)
        this.setState({ loading: true })

        let url = `https://api.thenewsapi.com/v1/news/all?api_token=${this.props.apikey}&locale=${this.props.country}&language=en&page=${this.state.page}&categories=${this.props.category}`;


        let data = await fetch(url);
        this.props.setProgress(50)
        let parsedDatainJson = await data.json();
        // console.log(parsedDatainJson);
        this.setState({
            articles: parsedDatainJson.data,
            loading: false,
            totalResults: parsedDatainJson.totalResults
        });
        this.props.setProgress(100)
    }


    fetchData = async (props) => {

        this.setState({ page: this.state.page + 1 });

        let url = `https://api.thenewsapi.com/v1/news/all?api_token=${this.props.apikey}&locale=${this.props.country}&language=en&page=${this.state.page}&categories=${this.props.category}`;

        let data = await fetch(url);
        let parsedDatainJson = await data.json();

        this.setState({
            articles: this.state.articles.concat(parsedDatainJson.data),
            loading: false,
            totalResults: parsedDatainJson.totalResults
        });
    }

    render() {
        return (
            <>







                <div className="container my-4">
                    <h1>News on {this.props.category} </h1>
                    {this.state.loading && <Spinner />}

                    <InfiniteScroll
                        dataLength={this.state.articles.length} //This is important field to render the next data
                        next={this.fetchData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner />}
                    >

                        <div className="container">
                            <div className="row">
                                {




                                    this.state.articles.map((element) => {


                                        return (
                                            <div className="col-md-4" key={element.uuid + Date.now() + Math.random()}>
                                                <Newsitems
                                                    title={element.title + "..."}
                                                    desc={element.description}
                                                    ImageUrl={
                                                        element.image_url
                                                            ? element.image_url
                                                            : "https://source.unsplash.com/random/?city,night"
                                                    }
                                                    NewsUrl={element.url}
                                                    author={element.source}
                                                    publishedAt={element.published_at}
                                                    name={element.relevance_score}
                                                />
                                            </div>
                                        );
                                    })
                                }


                            </div>

                        </div>
                    </InfiniteScroll>

                </div>















            </>
        );
    }
}
