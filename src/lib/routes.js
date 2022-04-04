import { Movie } from "../pages/Movie"
import { MovieDetails } from "../pages/MovieDetails"
import { NotFound } from "../pages/NotFound"

export default {
    routes: [
        {
            path: 'movie',
            component: Movie,
            widgets: ['Movies']
        },
        {
            path: 'movie/:movieId',
            component: MovieDetails,
        },
        {
            path: '*',
            component: NotFound
        }
    ],
}
