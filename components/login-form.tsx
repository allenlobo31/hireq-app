"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { signIn } from "@/lib/actions"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg font-medium rounded-lg h-[60px]"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing in...
        </>
      ) : (
        "Sign In"
      )}
    </Button>
  )
}

export default function LoginForm() {
  const router = useRouter()
  const [state, formAction] = useActionState(signIn, null)

  // Handle successful login by redirecting
  useEffect(() => {
    if (state?.success) {
      router.push("/")
    }
  }, [state, router])

  return (
    <div className="w-full max-w-md space-y-8 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-white">Welcome back</h1>
        <p className="text-lg text-gray-200">Sign in to your HireQ account</p>
      </div>

      <form action={formAction} className="space-y-6">
        {state?.error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded">{state.error}</div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
        </div>

        <SubmitButton />

        <div className="text-center text-gray-200">
          Don't have an account?{" "}
          <Link href="/auth/sign-up" className="text-white hover:underline font-medium">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  )
}
