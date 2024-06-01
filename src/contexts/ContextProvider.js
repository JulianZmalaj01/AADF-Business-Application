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
    const [currentColor, setCurrentColor] = useState("#7352ff")
    const [currentMode, setCurrentMode] = useState("Dark")
    const [themeSettings, setThemeSettings] = useState(false)
    const [activeMenu, setActiveMenu] = useState(true)
    const [isClicked, setIsClicked] = useState(initialState)

    const [baseurl, setBaseurl] = useState("https://f956-95-107-171-21.ngrok-free.app")

    // access-token
    const [token, setToken] = useState(window.sessionStorage.getItem("token") == "false" ? false : window.sessionStorage.getItem("token"))

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
