"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, FileText, ArrowRight, MapPin, DollarSign, Users, LogOut, User } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function HomePage() {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [companies, setCompanies] = useState([])
  const [companiesLoading, setCompaniesLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("/api/companies")
        const data = await response.json()
        if (data.companies) {
          setCompanies(data.companies)
        }
      } catch (error) {
        console.error("Error fetching companies:", error)
      } finally {
        setCompaniesLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const uploadedFile = e.dataTransfer.files[0]
      if (uploadedFile.type === "application/pdf" || uploadedFile.name.endsWith(".pdf")) {
        setFile(uploadedFile)
      }
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("specialization", "General") // Default specialization

      const response = await fetch("/api/upload-cv", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        // Redirect to CV page to see the uploaded CV
        router.push("/cv")
      } else {
        // Handle error - could show toast notification
        console.error("Upload failed:", result.error)
        alert("Upload failed: " + result.error)
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
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
          <a href="/cv" className="text-gray-600 hover:text-gray-900 transition-colors">
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
          {loading ? (
            <div className="animate-pulse flex space-x-3">
              <div className="h-9 w-20 bg-gray-200 rounded"></div>
              <div className="h-9 w-24 bg-gray-200 rounded"></div>
            </div>
          ) : user ? (
            <>
              <div className="flex items-center space-x-3 px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user.email}</span>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 px-4 py-2 font-medium transition-all duration-200 bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900 px-4 py-2">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome to HireQ
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your CV into compelling insights with AI-powered analysis. Get detailed feedback and
            recommendations to boost your career prospects.
          </p>

          {!user && (
            <div className="flex items-center justify-center space-x-4">
              <Link href="/auth/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* How It Works Section */}
        <div className="mb-16 grid md:grid-cols-3 gap-8">
          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold">1</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload CV & Generate Summary</h3>
            <p className="text-gray-600">
              Upload your CV and get an AI-generated summary of your skills and experience.
            </p>
          </Card>

          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold">2</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Select Job & Take Interview</h3>
            <p className="text-gray-600">
              Choose the job you want to apply for, then take our AI-powered interview and assessment test.
            </p>
          </Card>

          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold">3</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">See Results & Get Placed</h3>
            <p className="text-gray-600">
              View your performance results and get matched with placement opportunities based on your scores.
            </p>
          </Card>
        </div>

        {/* File Upload Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="p-8 bg-white/70 backdrop-blur-sm border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
            <div
              className={`text-center ${dragActive ? "bg-blue-50 border-blue-400" : ""} rounded-lg p-8 transition-all`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {!file ? (
                <>
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Upload Your CV</h3>
                  <p className="text-gray-500 mb-6">Drag and drop your CV here, or click to browse</p>
                  <input type="file" accept=".pdf" onChange={handleFileInput} className="hidden" id="file-upload" />
                  <label htmlFor="file-upload">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer">
                      Choose File
                    </Button>
                  </label>
                  <p className="text-sm text-gray-400 mt-4">Supports PDF files up to 10MB</p>
                </>
              ) : (
                <>
                  <FileText className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">File Ready for Analysis</h3>
                  <p className="text-gray-600 mb-4">
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      onClick={handleUpload}
                      disabled={uploading}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50"
                    >
                      {uploading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Analyze CV <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setFile(null)}
                      className="border-gray-300"
                      disabled={uploading}
                    >
                      Remove
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>

        {/* Companies Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Top Companies Hiring
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover exciting opportunities with leading companies across various domains and locations.
            </p>
          </div>

          {companiesLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="p-6 bg-white/70 backdrop-blur-sm animate-pulse">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-16 rounded-lg bg-gray-200"></div>
                      <div>
                        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-8 bg-gray-200 rounded"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <Card
                  key={company.id}
                  className="p-6 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-white shadow-md border border-gray-200 flex items-center justify-center p-2">
                        <img
                          src={company.logo_url || "/placeholder.svg?height=64&width=64&query=company logo"}
                          alt={`${company.name} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{company.name}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="w-4 h-4 mr-1" />
                          {company.openings} openings
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{company.description}</p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Recruiting Areas:</h4>
                      <div className="flex flex-wrap gap-1">
                        {company.recruiting_areas?.map((area, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {company.location}
                      </div>
                      <div className="flex items-center text-sm font-semibold text-green-600">
                        <DollarSign className="w-4 h-4 mr-1" />${company.min_package?.toLocaleString()} - $
                        {company.max_package?.toLocaleString()}
                      </div>
                    </div>

                    <Link href={`/company/${company.id}`}>
                      <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  HireQ
                </span>
              </div>
              <p className="text-gray-300 text-sm">
                Transforming careers with AI-powered CV analysis and smart job matching. Your next opportunity is just a
                click away.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/cv" className="text-gray-300 hover:text-white transition-colors">
                    CV
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Interview
                  </a>
                </li>
                <li>
                  <a href="/profile" className="text-gray-300 hover:text-white transition-colors">
                    Profile
                  </a>
                </li>
                <li>
                  <a href="/result" className="text-gray-300 hover:text-white transition-colors">
                    Result
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Services</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    CV Analysis
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Job Matching
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Interview Prep
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Skill Assessment
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Career Guidance
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 HireQ. All rights reserved. Empowering careers through AI.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
