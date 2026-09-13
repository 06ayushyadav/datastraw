import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/tickets/new"
          element={<CreateTicket />}
        />

        <Route
          path="/tickets/:ticketId"
          element={<TicketDetails />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;