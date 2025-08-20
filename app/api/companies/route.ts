import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

const fallbackCompanies = [
  {
    id: 1,
    name: "Infosys",
    description:
      "Global leader in next-generation digital services and consulting, helping clients navigate digital transformation.",
    logo_url: "/infosys-logo.png",
    locations: ["Bangalore", "Hyderabad", "Chennai", "Pune", "Mumbai"],
    recruiting_areas: ["Software Development", "Data Analytics", "Cloud Engineering", "AI/ML", "Cybersecurity"],
    min_package: 350000,
    max_package: 1200000,
    openings: 45,
    required_skills: ["Java", "Python", "JavaScript", "React", "Spring Boot", "AWS", "Azure", "SQL"],
    benefits: ["Health Insurance", "Life Insurance", "Provident Fund", "Flexible Work", "Learning Budget"],
    work_type: "Hybrid",
    company_size: "10000+",
    founded_year: 1981,
    website: "https://infosys.com",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Tata Consultancy Services (TCS)",
    description:
      "Leading global IT services, consulting and business solutions organization helping clients transform.",
    logo_url: "/generic-tech-logo.png",
    locations: ["Mumbai", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Delhi"],
    recruiting_areas: ["Software Engineering", "Digital Solutions", "Cloud Services", "Data Science", "Consulting"],
    min_package: 380000,
    max_package: 1500000,
    openings: 60,
    required_skills: ["Java", "C++", "Python", "Angular", "Node.js", "AWS", "Docker", "Microservices"],
    benefits: [
      "Medical Insurance",
      "Group Life Insurance",
      "Retirement Benefits",
      "Work from Home",
      "Skill Development",
    ],
    work_type: "Hybrid",
    company_size: "10000+",
    founded_year: 1968,
    website: "https://tcs.com",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Wipro",
    description:
      "Leading technology services and consulting company helping clients adapt and thrive in the changing world.",
    logo_url: "/wipro-logo.png",
    locations: ["Bangalore", "Hyderabad", "Chennai", "Pune", "Noida", "Kochi"],
    recruiting_areas: [
      "Application Development",
      "Infrastructure Services",
      "Digital Transformation",
      "Analytics",
      "Automation",
    ],
    min_package: 320000,
    max_package: 1100000,
    openings: 35,
    required_skills: ["Java", "Python", ".NET", "React", "Angular", "AWS", "Azure", "DevOps", "Agile"],
    benefits: ["Health Insurance", "Accident Insurance", "Provident Fund", "Flexible Hours", "Career Development"],
    work_type: "Hybrid",
    company_size: "10000+",
    founded_year: 1945,
    website: "https://wipro.com",
    created_at: new Date().toISOString(),
  },
]

export async function GET() {
  try {
    const supabase = createClient()

    let companies = null
    let error = null

    try {
      const result = await supabase.from("companies").select("*").order("created_at", { ascending: false })

      companies = result.data
      error = result.error
    } catch (queryError) {
      console.log("Database query failed (table likely doesn't exist):", queryError)
      return NextResponse.json({ companies: fallbackCompanies })
    }

    if (error) {
      console.log("Companies table error, using fallback data:", error.message)
      return NextResponse.json({ companies: fallbackCompanies })
    }

    if (!companies || companies.length === 0) {
      console.log("No companies found in database, using fallback data")
      return NextResponse.json({ companies: fallbackCompanies })
    }

    return NextResponse.json({ companies })
  } catch (error) {
    console.error("Error in companies API:", error)
    return NextResponse.json({ companies: fallbackCompanies })
  }
}
