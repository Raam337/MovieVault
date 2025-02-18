import { ReactNode } from "react"
import "./errorBanner.sass"

function ErrorBanner({children}:{children:ReactNode}) {
  return (
    <div data-testid="error-banner" className="error-banner">{children}</div>
  )
}

export default ErrorBanner