import React, {createContext, useContext, useState} from "react"

const StateContext = createContext()

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
}

export const ContextProvider = ({children}) => {
    const [screenSize, setScreenSize] = useState(undefined)
    const [currentColor, setCurrentColor] = useState("#03C9D7")
    const [currentMode, setCurrentMode] = useState("Light")
    const [themeSettings, setThemeSettings] = useState(false)
    const [activeMenu, setActiveMenu] = useState(true)
    const [isClicked, setIsClicked] = useState(initialState)
    const [token, setToken] = useState(false)
    const [baseurl, setBaseurl] = useState("https://43f0-192-109-217-9.ngrok-free.app")

    const setMode = (e) => {
        setCurrentMode(e.target.value)
        localStorage.setItem("themeMode", e.target.value)
    }

    const setColor = (color) => {
        setCurrentColor(color)
        localStorage.setItem("colorMode", color)
    }

    const handleClick = (clicked) => setIsClicked({...initialState, [clicked]: true})

    return (
        <StateContext.Provider
            value={{
                currentColor,
                currentMode,
                activeMenu,
                screenSize,
                setScreenSize,
                handleClick,
                isClicked,
                initialState,
                setIsClicked,
                setActiveMenu,
                setCurrentColor,
                setCurrentMode,
                setMode,
                setColor,
                themeSettings,
                setThemeSettings,
                token,
                setToken,
                baseurl,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
