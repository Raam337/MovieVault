import { PropsWithChildren } from "react"
import "./errorBanner.sass"

function ErrorBanner({children}:PropsWithChildren) {
  return (
    <div data-testid="error-banner" className="error-banner">{children}</div>
  )
}

export default ErrorBanner