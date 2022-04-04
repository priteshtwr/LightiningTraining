
const getUpComingMovies = async () => {
    const result = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=d94f159407a85eeb548a649d79bd715a')

    return result.json()
}
const getMovieDetails = async (movieId) => {
    const result = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=d94f159407a85eeb548a649d79bd715a`)
    return result.json()
}
const getImageURL = (poster_path, width) => {
    return `https://image.tmdb.org/t/p/w${width}${poster_path}`
}

const getSimilarMovies = async (movieId) => {
    const result = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=d94f159407a85eeb548a649d79bd715a`)
    return result.json()
}
export {getUpComingMovies}
export {getImageURL}
export {getMovieDetails}
export {getSimilarMovies}