import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { cvId, companyId } = await request.json()

    // Get CV skills
    const { data: cv, error: cvError } = await supabase
      .from("cvs")
      .select("skills")
      .eq("id", cvId)
      .eq("user_id", user.id)
      .single()

    if (cvError || !cv) {
      return NextResponse.json({ error: "CV not found" }, { status: 404 })
    }

    // Get company required skills
    const { data: company, error: companyError } = await supabase
      .from("companies")
      .select("required_skills, name")
      .eq("id", companyId)
      .single()

    if (companyError || !company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 })
    }

    // Calculate skill match
    const cvSkills = cv.skills || []
    const requiredSkills = company.required_skills || []

    const matchedSkills = cvSkills.filter((skill) =>
      requiredSkills.some(
        (reqSkill) =>
          reqSkill.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(reqSkill.toLowerCase()),
      ),
    )

    const missingSkills = requiredSkills.filter(
      (reqSkill) =>
        !cvSkills.some(
          (skill) =>
            skill.toLowerCase().includes(reqSkill.toLowerCase()) ||
            reqSkill.toLowerCase().includes(skill.toLowerCase()),
        ),
    )

    const skillMatchPercentage =
      requiredSkills.length > 0 ? Math.round((matchedSkills.length / requiredSkills.length) * 100) : 0

    // Insert application
    const { data: application, error: applicationError } = await supabase
      .from("applications")
      .insert({
        user_id: user.id,
        cv_id: cvId,
        company_id: companyId,
        skill_match_percentage: skillMatchPercentage,
        matched_skills: matchedSkills,
        missing_skills: missingSkills,
      })
      .select()
      .single()

    if (applicationError) {
      if (applicationError.code === "23505") {
        // Unique constraint violation
        return NextResponse.json({ error: "You have already applied to this company with this CV" }, { status: 400 })
      }
      console.error("Error creating application:", applicationError)
      return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
    }

    return NextResponse.json({
      application,
      skillMatchPercentage,
      matchedSkills,
      missingSkills,
      companyName: company.name,
    })
  } catch (error) {
    console.error("Error in apply API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
