import { useState, useEffect } from "react";
import { HomeScreen } from "./src/components/HomeScreen.jsx";
import { SplashScreen } from "./src/components/SplashScreen.jsx";


export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    return () => clearTimeout(timer);
  }, [])

  return (
    <>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <HomeScreen />
      )}

    </>
  )
}