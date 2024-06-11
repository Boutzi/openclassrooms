import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Error from "./components/Error"
import Home from "./pages/Home"
import Details from "./pages/Details"
import About from "./pages/About"
import "./styles/main.scss"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    ),
    errorElement: <Error />,
  },
  {
    path: "/about",
    element: (
      <>
        <Header />
        <About />
        <Footer />
      </>
    ),
    errorElement: <Error />,
  },
  {
    path: "/details/:id",
    element: (
      <>
        <Header />
        <Details />
        <Footer />
      </>
    ),
    errorElement: <Error />,
  },
  {
    path: "*",
    element: (
      <>
        <Header />
        <Error />
        <Footer />
      </>
    ),
    errorElement: <Error />,
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
)
