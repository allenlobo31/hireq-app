import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Check if user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch user's CVs
    const { data: cvs, error } = await supabase
      .from("cvs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch CVs" }, { status: 500 })
    }

    return NextResponse.json({ cvs })
  } catch (error) {
    console.error("Fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
