
import _L                       from 'lodash'
import React , { Component }    from 'react'
import ReactDOM                 from 'react-dom'
import YTSearch                 from 'youtube-api-search'

import SearchBar                from './components/search_bar'
import VideoList                from './components/video_list'
import VideoDetail              from './components/video_detail'

const YOUTUBE_API_KEY = 'AIzaSyClhT-yjW4mPtuQeJzq0kSz9W9QVNfwZl0'


class App extends Component {

    constructor(props) {
        super(props)

        this.state = { 
            selectedVideo : null,
            videos: [] 
        }

        this.videoSearch('')

    }

    videoSearch(term) {
        YTSearch({ key: YOUTUBE_API_KEY, term: term}, (videos) => {
            this.setState( { 
                videos: videos,
                selectedVideo : videos[0]
            } )
        } )
    }


    render() {

        const videoSearch = _L.debounce((term) => { this.videoSearch(term) }, 300)

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        )
    }
}


ReactDOM.render(<App/>, document.querySelector('.container'))


