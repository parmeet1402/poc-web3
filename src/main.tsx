import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClientProvider, QueryClient } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";

const AppWrapper = () => {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
