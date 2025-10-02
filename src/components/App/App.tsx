import SearchBar from "../SearchBar/SearchBar";
import fetchMovie from "../../services/movieService";
import { useEffect, useState } from 'react';
import type { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { keepPreviousData } from "@tanstack/react-query";
import ReactPaginate from 'react-paginate';
import css from './App.module.css'
import Loader from "../Loader/Loader";



export default function App() {

    const [movieForModal, setMovieForModal] = useState<Movie | null>(null)

    const [page, setPage] = useState(1)
    const [query, setQuery] = useState('')

    const { data, isLoading, isError } = useQuery({
        queryKey: ['movie', query, page],
        queryFn: () => fetchMovie(query, page),
        enabled: query !== '',
        placeholderData: keepPreviousData
    })
    const handleSearch = async (query: string) => {
        setPage(1)
        setQuery(query)
    }

    useEffect(() => {
        if (data && data.results.length === 0) {
            toast('No movies found for your request.')
        }
    }, [data])


    const handleModal = (movie: Movie) => {
        setMovieForModal(movie)
    }
    const closeModal = () => {
        setMovieForModal(null)
    }



    return (
        <>
            <SearchBar onSubmit={handleSearch} />
            {isError && <ErrorMessage />}
            {isLoading && <Loader />}
            {data && <ReactPaginate
                pageCount={data.total_pages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={({ selected }) => setPage(selected + 1)}
                forcePage={page - 1}
                containerClassName={css.pagination}
                activeClassName={css.active}
                nextLabel="→"
                previousLabel="←"

            />}
            <Toaster />
            {data && <MovieGrid onSelect={handleModal} movies={data.results} />}
            {movieForModal && (
                <MovieModal movie={movieForModal} onClose={closeModal} />
            )}
        </>
    )

}