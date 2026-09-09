import React, { useState } from 'react'
// import Header from './components/Header'
import Routing from './router/Routing'
import IntroLoader from './components/IntroLoader'
import { Toaster } from 'react-hot-toast';

function App() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={10}
        toastOptions={{
          duration: 3500,
          className: "font-sans font-medium text-xs sm:text-sm",
          style: {
            background: "#000000",
            color: "#ffffff",
            borderRadius: "9999px", // Rounded pill layout
            padding: "12px 20px",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
          },
          // Customizing Default Icons
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10B981", // Emerald Green
              secondary: "#FFFFFF",
            },
            style: {
              background: "#000000",
              color: "#FFFFFF",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#EF4444", // Modern Red
              secondary: "#FFFFFF",
            },
            style: {
              background: "#000000",
              color: "#FFFFFF",
            },
          },
          loading: {
            iconTheme: {
              primary: "#FFFFFF",
              secondary: "#000000",
            },
          },
        }}
      />
      {loading ? (
        <IntroLoader onComplete={() => setLoading(false)} />
      ) : (
        <Routing />
      )}
    </>
  )
}

export default App
