import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main/Main";
import Layout from "./components/Layout/Layout";
// import Auth from "./containers/auth/auth";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <Main />
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
