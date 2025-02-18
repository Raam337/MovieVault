import {fireEvent, screen, waitFor} from "@testing-library/react"
import FeaturedPage from "../pages/FeaturedPage"
import "@testing-library/jest-dom/vitest"
import { renderWithProviders } from "./test-utils"

describe('FeaturePage', () => {
  beforeEach(()=> renderWithProviders(<FeaturedPage />))

  it('should render search form with input and btn', () => {

    const searchInput = screen.getByRole("textbox")
    expect(searchInput).toBeInTheDocument()

    const searchBtn = screen.getByRole("button" , {name: /search/i})
    expect(searchBtn).toBeInTheDocument()

  })

  it('should dispaly 10 featured movies on first render', async () => {
    await waitFor(()=>{screen.getAllByTestId("movie-card")})

    const movieCards = screen.getAllByTestId("movie-card")
    expect(movieCards).toHaveLength(10)
  })

  it('should display Featured movies', () => {
    const featuredText = screen.getByText("Featured movies")
    expect(featuredText).toBeInTheDocument()
  })

  it('should show pagination ul', () => {
    const pagination = screen.getByLabelText("Pagination")
    expect(pagination).toBeInTheDocument()
  })

  it('should show *Search results for Harry potter* after search', async () => {
    const searchInput = screen.getByRole("textbox")
    const searchBtn = screen.getByRole("button" , {name: /search/i})
    const searchHeader = screen.getByRole('heading', { level: 2 });
    
    fireEvent.change(searchInput, {target: { value:"Harry potter" }})
    fireEvent.click(searchBtn)

    await waitFor(()=> screen.getByText("Harry Potter and the Philosopher's Stone"))
    const movieName = screen.getByText("Harry Potter and the Philosopher's Stone")

    expect(searchHeader).toHaveTextContent("Search results for Harry potter")
    expect(movieName).toBeInTheDocument()
  })

  it('should navigate to movie page when clicked on movie card', async () => {
    const searchInput = screen.getByRole("textbox")
    const searchBtn = screen.getByRole("button" , {name: /search/i})
    
    fireEvent.change(searchInput, {target: { value:"Harry potter" }})
    fireEvent.click(searchBtn)

    await waitFor(()=> screen.getByText("Harry Potter and the Philosopher's Stone"))
    const movieName = screen.getByText("Harry Potter and the Philosopher's Stone")

    fireEvent.click(movieName)
    expect(window.location.pathname + window.location.search).toBe("/movie?id=671")
  })
})