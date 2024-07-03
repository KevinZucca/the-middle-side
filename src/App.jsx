import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import OrdersProvider from "./contexts/OrdersContext";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CompanyAPIs from "./pages/CompanyAPIs";

function App() {
  return (
    <>
      <OrdersProvider>
        <Router>
          <Routes>
            <Route>
              <Route path="/" element={<Main />} />
              <Route path="/company/:companyId" element={<CompanyAPIs />} />
            </Route>
          </Routes>
        </Router>
      </OrdersProvider>
    </>
  );
}

export default App;
