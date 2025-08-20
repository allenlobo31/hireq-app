"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Briefcase, Code, Upload, FileText, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface CV {
  id: string
  file_name: string
  specialization: string
  skills: string[]
  experience: any[]
  projects: any[]
  education: any[]
  created_at: string
}

export default function CVPage() {
  const [cvs, setCvs] = useState<CV[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    checkUser()
    fetchCVs()
  }, [])

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUser(user)
  }

  const fetchCVs = async () => {
    try {
      const response = await fetch("/api/cvs")
      const data = await response.json()

      if (response.ok) {
        setCvs(data.cvs || [])
      } else {
        console.error("Failed to fetch CVs:", data.error)
      }
    } catch (error) {
      console.error("Error fetching CVs:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your CVs...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <Card className="p-8 max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Please Sign In</h2>
          <p className="text-gray-600 mb-6">You need to sign in to view your CVs.</p>
          <Link href="/auth/login">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Sign In
            </Button>
          </Link>
        </Card>
      </div>
    )
  }

  if (cvs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              HireQ
            </span>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/cv" className="text-blue-600 font-medium transition-colors">
              CV
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Interview
            </a>
            <a href="/profile" className="text-gray-600 hover:text-gray-900 transition-colors">
              Profile
            </a>
            <a href="/result" className="text-gray-600 hover:text-gray-900 transition-colors">
              Result
            </a>
          </div>

          {/* Right Buttons */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900 px-4 py-2">
              Sign Out
            </Button>
          </div>
        </nav>

        {/* Welcome Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <FileText className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to Your CV Dashboard
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              Upload your CV to get started with AI-powered analysis and personalized job recommendations.
            </p>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">What happens when you upload your CV?</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">AI Analysis</h4>
                  <p className="text-gray-600">Our AI analyzes your skills, experience, and qualifications</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Briefcase className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">Job Matching</h4>
                  <p className="text-gray-600">Get matched with relevant job opportunities</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Code className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">Skill Assessment</h4>
                  <p className="text-gray-600">Take targeted tests to showcase your abilities</p>
                </div>
              </div>
            </div>

            <Link href="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-lg"
              >
                Upload Your CV Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            HireQ
          </span>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="/cv" className="text-blue-600 font-medium transition-colors">
            CV
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            Interview
          </a>
          <a href="/profile" className="text-gray-600 hover:text-gray-900 transition-colors">
            Profile
          </a>
          <a href="/result" className="text-gray-600 hover:text-gray-900 transition-colors">
            Result
          </a>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" className="text-gray-600 hover:text-gray-900 px-4 py-2">
            Sign Out
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your CV Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage and view your uploaded CVs with AI-powered analysis and insights.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {cvs.map((cv) => (
              <Card key={cv.id} className="p-6 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow">
                {/* CV Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{cv.file_name}</h3>
                      <p className="text-lg text-gray-600 mb-2">{cv.specialization}</p>
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <span>Uploaded: {new Date(cv.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Extracted Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {cv.skills.slice(0, 4).map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {cv.skills.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{cv.skills.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Experience Preview */}
                {cv.experience.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <Briefcase className="w-4 h-4 mr-1" />
                      Experience
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-medium text-gray-800 text-sm">{cv.experience[0].position}</p>
                      <p className="text-blue-600 text-sm">{cv.experience[0].company}</p>
                      <p className="text-gray-500 text-xs">{cv.experience[0].duration}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-gray-500">
                    {cv.skills.length} skills • {cv.experience.length} experiences
                  </span>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                    View Details <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
