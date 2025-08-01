import React, { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import authService from "../appwrite/auth"
import { Input, Button } from "./index" // adjust import if needed

function ResetPassword() {
    const [searchParams] = useSearchParams()
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const userId = searchParams.get("userId")
    const secret = searchParams.get("secret")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await authService.updatePassword(userId, secret, password)
            setMessage("Password successfully updated! Redirecting to login...")
            setTimeout(() => navigate("/login"), 3000)
        } catch (error) {
            setMessage("Failed to update password: " + error.message)
        }
    }

    if (!userId || !secret) {
        return <div className="text-red-600 text-center mt-8">Invalid reset link</div>
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-md bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
                {message && <p className="text-center mb-4">{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="password"
                        label="New Password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" className="w-full">Update Password</Button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword

