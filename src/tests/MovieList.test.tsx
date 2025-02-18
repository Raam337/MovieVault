import { it, expect, describe } from 'vitest'
import { renderWithProviders } from './test-utils'
import MovieList from '@/components/MovieList/MovieList'
import { screen } from '@testing-library/react'

const mockMovies = [{
  "backdrop_path": "/9nhjGaFLKtddDPtPaX5EmKqsWdH.jpg",
  "id": 950396,
  "title": "The Gorge",
  "original_title": "The Gorge",
  "overview": "Two highly trained operatives grow close from a distance after being sent to guard opposite sides of a mysterious gorge. When an evil below emerges, they must work together to survive what lies within.",
  "poster_path": "/7iMBZzVZtG0oBug4TfqDb9ZxAOa.jpg",
  "media_type": "movie",
  "adult": false,
  "original_language": "en",
  "genre_ids": [
    28,
    27,
    10749,
    878,
    53
  ],
  "popularity": 463.558,
  "release_date": "2025-02-13",
  "video": false,
  "vote_average": 7.9,
  "vote_count": 501
}]

  describe('MovieList', () => {
    it('should render header', () => {
      renderWithProviders(<MovieList list={[]} />)

      const title = screen.getByText("Name")
      expect(title).toBeInTheDocument()

      const lang = screen.getByText("Language")
      expect(lang).toBeInTheDocument()

      const genre = screen.getByText("Genre")
      expect(genre).toBeInTheDocument()

      const relDate = screen.getByText("Release date")
      expect(relDate).toBeInTheDocument()
    })

    it('should render movies provided a list', () => {
      renderWithProviders(<MovieList list={mockMovies} />)

      const title = screen.getByText("The Gorge")
      expect(title).toBeInTheDocument()

      const lang = screen.getByText("EN")
      expect(lang).toBeInTheDocument()

      const genres = screen.getByText("Action, Horror, Romance, Science Fiction, Thriller")
      expect(genres).toBeInTheDocument()

      const date = screen.getByText("2025-02-13")
      expect(date).toBeInTheDocument()
    })
  })

  