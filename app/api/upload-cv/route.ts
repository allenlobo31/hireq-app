import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
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

    const formData = await request.formData()
    const file = formData.get("file") as File
    const specialization = (formData.get("specialization") as string) || "General"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Extract text content from file (simplified - in real app you'd use PDF parser)
    const fileContent = await file.text()

    // Parse CV content (simplified extraction)
    const cvData = {
      user_id: user.id,
      file_name: file.name,
      specialization: specialization,
      content: fileContent,
      // Simplified parsing - in real app you'd use AI/ML to extract these
      skills: extractSkills(fileContent),
      experience: extractExperience(fileContent),
      projects: extractProjects(fileContent),
      education: extractEducation(fileContent),
      created_at: new Date().toISOString(),
    }

    // Insert CV data into database
    const { data, error } = await supabase.from("cvs").insert([cvData]).select().single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save CV" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "CV uploaded and analyzed successfully",
      cv_id: data.id,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Simplified content extraction functions (in real app, use AI/ML)
function extractSkills(content: string): string[] {
  const skillKeywords = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "SQL",
    "AWS",
    "Docker",
    "TypeScript",
    "HTML",
    "CSS",
  ]
  return skillKeywords.filter((skill) => content.toLowerCase().includes(skill.toLowerCase()))
}

function extractExperience(content: string): any[] {
  // Simplified - in real app, use NLP to extract structured experience data
  return [
    {
      company: "Extracted Company",
      position: "Extracted Position",
      duration: "2020 - Present",
      description: "Experience extracted from CV content",
    },
  ]
}

function extractProjects(content: string): any[] {
  return [
    {
      name: "Extracted Project",
      description: "Project details extracted from CV",
      technologies: extractSkills(content).slice(0, 3),
    },
  ]
}

function extractEducation(content: string): any[] {
  return [
    {
      degree: "Extracted Degree",
      institution: "Extracted Institution",
      year: "2020",
    },
  ]
}
