"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { signUp } from "@/lib/actions"

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
          Signing up...
        </>
      ) : (
        "Sign Up"
      )}
    </Button>
  )
}

export default function SignUpForm() {
  const [state, formAction] = useActionState(signUp, null)

  return (
    <div className="w-full max-w-md space-y-8 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-white">Create an account</h1>
        <p className="text-lg text-gray-200">Join HireQ to get started</p>
      </div>

      <form action={formAction} className="space-y-6">
        {state?.error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded">{state.error}</div>
        )}

        {state?.success && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-200 px-4 py-3 rounded">
            {state.success}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-200">
              Full Name
            </label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="John Doe"
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
            />
          </div>
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
          Already have an account?{" "}
          <Link href="/auth/login" className="text-white hover:underline font-medium">
            Log in
          </Link>
        </div>
      </form>
    </div>
  )
}
