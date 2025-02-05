import { createHashRouter } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ContactPage from "./pages/ContactPage";
import App from "./App";
import ChatPage from "./pages/ChatPage";

export const router = createHashRouter([
    {
        path: "/", 
        element: <App />,
        children: [
            { path: "/", element: <AuthPage /> },
            { path: "contact", element: <ContactPage /> },
            { path: "chat/:contact", element: <ChatPage /> },
          ],
      },
    ]);