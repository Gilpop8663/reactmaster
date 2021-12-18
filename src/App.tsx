import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
          integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
          crossOrigin="anonymous"
        />
      </Helmet>
      <Router>
        <Header />
        <Switch>
          <Route path={["/search"]}>
            <Search />
          </Route>
          <Route path={["/tv", "/tvs/:tvId"]}>
            <Tv />
          </Route>
          <Route path={["/", "/movies/:movieId"]}>
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
