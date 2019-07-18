import React, { Component } from "react";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    // movies: getMovies(),
    // genres: getGenres(),
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" }
    // selectedGenre: null
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
    // use setState to modify the state
    // first one the old one and second one the new one
    // if the new one and the one we wnat to replace the old one with have the same name, we can just use it and write onece
  };

  handleLike = movie => {
    // console.log(movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
    // console.log("this.state.selectedGenre", this.state.selectedGenre);
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
    // console.log(path);
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn
    } = this.state;
    // take the correct movies
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state;
    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPageData();

    // console.log(movies);
    // in jsx, render only return a single element
    // if we want to return multiple elements, they should have a parent
    return (
      <div className="row">
        {/* <div className="col-3"> */}
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            // textProperty="name"
            // valueProperty="_id"
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className="col">
          <p>Showing {totalCount} movies in the database.</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
