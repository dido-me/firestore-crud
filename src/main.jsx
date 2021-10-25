import { StrictMode } from "react"
import { render } from "react-dom"
import "bootstrap/scss/bootstrap.scss"
import "./index.css"
import App from "./App"

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
)
