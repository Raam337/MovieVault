import MoviePage from "@/pages/MoviePage"
import { renderWithProviders } from "./test-utils"
import {fireEvent, screen, waitFor} from "@testing-library/react"

describe('MoviePage', () => {
  it('should show error banner if id is 0', async () => {

    window.history.pushState({},"","/movie?id=0")

    renderWithProviders(<MoviePage/>)

    await waitFor(()=>screen.getByTestId("error-banner"))

    const error = screen.getByTestId("error-banner")
    expect(error).toBeInTheDocument()
  })

  it('should render *Companion* if id is 1084199', async () => {
    window.history.pushState({},"","/movie?id=1084199")

    renderWithProviders(<MoviePage/>)

    const nameHeader = screen.getByRole('heading', { level: 2 });
    await waitFor(()=> expect(nameHeader).toHaveTextContent("Companion"))

    expect(nameHeader).toHaveTextContent("Companion")
    
  })

})