import { createBrowserRouter } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ContactPage from "./pages/ContactPage";
import DialogPage from "./pages/DialogPage";
import App from "./App";

export const router = createBrowserRouter([
    {
        path: "/", 
        element: <App />,
        children: [
            { path: "/", element: <AuthPage /> },
            { path: "contact", element: <ContactPage /> },
            { path: "dialog/:contact", element: <DialogPage /> },
          ],
      },
    ]);