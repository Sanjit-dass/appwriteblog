import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { login as authLogin } from '../store/authSlice'
import authService from '../appwrite/auth'
import { Button, Input, Logo } from './index'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const login = async (data) => {
        setError("")
        setLoading(true)
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message || "Login failed.")
        } finally {
            setLoading(false)
        }
    }

    const handleForgotPassword = async () => {
        const email = prompt("Enter your email for password reset:")?.trim()
        if (!email) return

        const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
        if (!validEmail) {
            alert("Please enter a valid email address.")
            return
        }

        try {
            await authService.forgotPassword(email)
            alert("Recovery email sent! Please check your inbox.")
        } catch (error) {
            alert("Error: " + error.message)
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen px-4 dark:bg-gradient-to-r dark:from-slate-900 dark:via-gray-800 dark:to-black'>
            <div className="w-full max-w-lg my-10 bg-gradient-to-r from-slate-500 via-blue-100 via-red-300 to-blue-200 rounded-xl p-6 sm:p-10 border border-black/10 dark:border-gray-700  dark:shadow-2xl dark:shadow-white dark:from-gray-800 dark:via-slate-700 dark:to-gray-900 shadow-2xl shadow-black rounded-2xl">

                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60 dark:text-gray-400">
                    Don&apos;t have an account?&nbsp;
                    <Link to="/signup" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                        Sign Up
                    </Link>
                </p>

                {error && <p className="text-red-600 mt-6 text-center dark:text-red-400">{error}</p>}

                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5 dark:text-white mt-4'>
                        <Input
                            label="Email:"
                            placeholder="Enter your email"
                            type="email"
                            autoComplete="email"
                            disabled={loading}
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Invalid email address"
                                }
                            })}
                        />

                        <div className="relative">
                            <Input
                                label="Password:"
                                placeholder="Enter your password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                disabled={loading}
                                {...register("password", {
                                    required: "Password is required"
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 bottom-3 text-blue-700 dark:text-blue-400"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <div className="text-right">
                            <button
                                type="button"
                                className="text-sm text-blue-700 dark:text-blue-400 hover:underline"
                                onClick={handleForgotPassword}
                                disabled={loading}
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
