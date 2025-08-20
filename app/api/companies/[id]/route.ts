import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

const fallbackCompanies = [
  {
    id: 1,
    name: "Infosys",
    description:
      "A global leader in next-generation digital services and consulting. Infosys enables clients in more than 50 countries to navigate their digital transformation.",
    logo: "/infosys-logo.png",
    location: "Bangalore, Mumbai, Hyderabad, Chennai",
    min_package: 350000,
    max_package: 1200000,
    openings: 2500,
    required_skills: ["Java", "Python", "React", "Angular", "Spring Boot", "Microservices", "AWS", "Azure"],
    benefits: [
      "Health Insurance",
      "Life Insurance",
      "Flexible Work",
      "Learning & Development",
      "Employee Stock Options",
    ],
    work_type: "Hybrid",
    experience_level: "All Levels",
    company_size: "250000+",
    industry: "IT Services & Consulting",
    founded: 1981,
    website: "https://infosys.com",
    recruiting_areas: ["Software Development", "Data Analytics", "Cloud Computing", "AI/ML", "Cybersecurity"],
  },
  {
    id: 2,
    name: "Tata Consultancy Services (TCS)",
    description:
      "An IT services, consulting and business solutions organization that has been partnering with many of the world's largest businesses for over 50 years.",
    logo: "/generic-tech-logo.png",
    location: "Mumbai, Pune, Chennai, Bangalore, Hyderabad",
    min_package: 380000,
    max_package: 1500000,
    openings: 3000,
    required_skills: ["Java", "C++", "Python", "JavaScript", "React", "Node.js", "Oracle", "SAP", "Salesforce"],
    benefits: [
      "Comprehensive Health Coverage",
      "Retirement Benefits",
      "Global Career Opportunities",
      "Skill Development Programs",
    ],
    work_type: "Hybrid",
    experience_level: "All Levels",
    company_size: "500000+",
    industry: "IT Services & Consulting",
    founded: 1968,
    website: "https://tcs.com",
    recruiting_areas: [
      "Enterprise Solutions",
      "Digital Transformation",
      "Cloud Services",
      "Data Science",
      "Blockchain",
    ],
  },
  {
    id: 3,
    name: "Wipro",
    description:
      "A leading global information technology, consulting and business process services company helping clients adapt to the digital world.",
    logo: "/wipro-logo.png",
    location: "Bangalore, Hyderabad, Chennai, Pune, Noida",
    min_package: 320000,
    max_package: 1100000,
    openings: 1800,
    required_skills: ["Java", "Python", ".NET", "React", "Angular", "DevOps", "Kubernetes", "Docker", "Terraform"],
    benefits: [
      "Medical Insurance",
      "Accident Insurance",
      "Flexible Working Hours",
      "Professional Development",
      "Performance Bonuses",
    ],
    work_type: "Hybrid",
    experience_level: "All Levels",
    company_size: "200000+",
    industry: "IT Services & Consulting",
    founded: 1945,
    website: "https://wipro.com",
    recruiting_areas: [
      "Application Development",
      "Infrastructure Services",
      "Digital Operations",
      "Cybersecurity",
      "Analytics",
    ],
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()

    try {
      const { data: company, error } = await supabase.from("companies").select("*").eq("id", params.id).single()

      if (error) {
        // If table doesn't exist, fall back to hardcoded data
        if (error.message.includes("Could not find the table")) {
          const fallbackCompany = fallbackCompanies.find((c) => c.id === Number.parseInt(params.id))
          if (fallbackCompany) {
            return NextResponse.json({ company: fallbackCompany })
          }
          return NextResponse.json({ error: "Company not found" }, { status: 404 })
        }
        console.error("Error fetching company:", error)
        return NextResponse.json({ error: "Company not found" }, { status: 404 })
      }

      return NextResponse.json({ company })
    } catch (dbError: any) {
      // If database query fails, use fallback data
      console.log("[v0] Database query failed, using fallback data:", dbError.message)
      const fallbackCompany = fallbackCompanies.find((c) => c.id === Number.parseInt(params.id))
      if (fallbackCompany) {
        return NextResponse.json({ company: fallbackCompany })
      }
      return NextResponse.json({ error: "Company not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error in company API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
