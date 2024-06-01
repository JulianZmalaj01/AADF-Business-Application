import React, {useState} from "react"
import {useStateContext} from "../contexts/ContextProvider"

const NotLogged = () => {
    const {baseurl, setToken, setIsClicked, initialState} = useStateContext()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const login = () => {
        let getUrl = new URL(`${baseurl}/account/login`)
        let payload = {
            email: email,
            password: password,
        }
        if (email && password) {
            fetch(getUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("data", data)
                    setToken(data.token)
                    setIsClicked(initialState)
                })
                .catch((e) => {
                    console.error(e)
                    setIsClicked(initialState)
                    setToken("test-token")
                })
        } else {
            setError("Please fill the fields to login")
            setTimeout(() => {
                setError("")
            }, 5000)
        }
    }

    return (
        <div className="min-h-screen flex flex-col sm:flex-row" style={{width: "100%"}}>
            <div style={{background: "#060818"}} className="sm:w-1/2 h-screen flex items-center justify-center left-side-logged-out">
                <div className="text-white text-4xl font-bold text-center">
                    <img src="logo.png" alt="Logo" className="w-32 h-32 mb-4 mx-auto" />
                    AADF
                </div>
            </div>
            <div className="sm:w-1/2 h-screen flex items-center justify-center bg-gray-100 right-side-logged-out">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            login()
                        }}
                    >
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                value={email}
                                type="email"
                                id="email"
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                value={password}
                                type="password"
                                id="password"
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        <button
                            type="submit"
                            className=" text-undefined p-3 w-full hover:drop-shadow-xl hover:bg-undefined"
                            style={{backgroundColor: "rgb(3, 201, 215)", color: "white", borderRadius: "10px"}}
                        >
                            Login
                        </button>
                    </form>
                    {error ? <div className="text-center dark:text-red-700 text-x mb-2 mt-3">{error}</div> : null}
                </div>
            </div>
        </div>
    )
}

export default NotLogged
