import { Lightning, Router } from "@lightningjs/sdk";
import { getImageURL, getMovieDetails, getSimilarMovies } from "../lib/API";


export class MovieDetails extends Lightning.Component {
    static _template() {
        return {
            Background: {
                w: 1920,
                h: 1080,
                alpha: 0.7,
                src: null
            },
            Poster: {
                x: 100, y: 100,
                src: null
            },
            MovieDetails: {
                x: 100, y:540, mountY: 0.4,
                Title: {
                    y: 20,
                    text: { text: "", textColor: 0xff000000}
                },
                ReleaseDate: {
                    y:80,
                    text: { text: "", textColor: 0xff000000}
                },
                Plot: {
                    x: 400,y: -300,
                    text: { text: "", textColor: 0xff000000, wordWrapWidth: 1400}
                }
            },
            SimilarMovies: {
                x: 500, y: 540, 
                Label: {
                    text: { text: "Similar Movies"}
                },
                
                MovieItems: {
                    y: 60,rect: true, w: 1400, h: 280, color: 0xFF486f67,
                    flex: {
                        direction: "row",
                        padding: 20
                    },
                    children: []
                }
            },
            Label: {
                x:960, y: 980,
                text: { text: "Press Back to go to Movies", fontSize: 48, textColor: 0xfff1f1f1}
            }
        }
    }

    _onUrlParams(params) {
        this.populateMovieDetails(params.movieId)
    }

    _init() {
        this.index = 0;
    }

    async populateMovieDetails(movieId) {
        this.details = await getMovieDetails(movieId)
        this.tag("Poster").patch({ src: getImageURL(this.details.poster_path, 300)})
        this.tag("Background").patch({src: getImageURL(this.details.backdrop_path, 1280)})

        this.tag("MovieDetails").patch({Title: { text: { text: this.details.original_title}}})
        this.tag("MovieDetails").patch({ReleaseDate: { text: { text: this.details.release_date}}})
        this.tag("MovieDetails").patch({Plot: { text: { text: this.details.overview}}})

        this.similarMovies = await getSimilarMovies(movieId)
        this.tag("SimilarMovies").tag("MovieItems").patch( {
            children: this.similarMovies.results.map((item, index) => {
                return {
                    x: (index * 230),
                    Image: {
                         w:210, h:280,
                        src: getImageURL(item.poster_path, 300)
                    },
                    Title: {
                        y: 300,
                        text: { text: item.title, fontSize: 24, wordWrapWidth: 210}
                    }
                }
            })
        })
        this._refocus()

    }

    _handleBack() {
        Router.navigate("movie")
        Router.focusWidget("Movies")
    }
}