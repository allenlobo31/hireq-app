"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MapPin, Users, Calendar, Globe, CheckCircle, XCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"

export default function CompanyDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [company, setCompany] = useState(null)
  const [userCVs, setUserCVs] = useState([])
  const [selectedCV, setSelectedCV] = useState("")
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [applicationResult, setApplicationResult] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchCompanyDetails()
    checkUser()
  }, [params.id])

  const checkUser = async () => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUser(user)
    if (user) {
      fetchUserCVs()
    }
  }

  const fetchCompanyDetails = async () => {
    try {
      const response = await fetch(`/api/companies/${params.id}`)
      const data = await response.json()
      if (data.company) {
        setCompany(data.company)
      }
    } catch (error) {
      console.error("Error fetching company details:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserCVs = async () => {
    try {
      const response = await fetch("/api/cvs")
      const data = await response.json()
      if (data.cvs) {
        setUserCVs(data.cvs)
        if (data.cvs.length > 0) {
          setSelectedCV(data.cvs[0].id)
        }
      }
    } catch (error) {
      console.error("Error fetching CVs:", error)
    }
  }

  const handleApply = async () => {
    if (!selectedCV || !user) return

    setApplying(true)
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cvId: selectedCV,
          companyId: params.id,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setApplicationResult(data)
      } else {
        alert(data.error || "Failed to submit application")
      }
    } catch (error) {
      console.error("Error applying:", error)
      alert("Failed to submit application")
    } finally {
      setApplying(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading company details...</div>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Company not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-white hover:bg-white/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Company Header */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-6 mb-6">
              <img
                src={company.logo_url || "/placeholder.svg?height=80&width=80&query=company logo"}
                alt={`${company.name} logo`}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">{company.name}</h1>
                <div className="flex flex-wrap gap-4 text-blue-200">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {company.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {company.company_size} employees
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Founded {company.founded_year}
                  </div>
                  {company.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <a href={company.website} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-300">
                  ${company.min_package?.toLocaleString()} - ${company.max_package?.toLocaleString()}
                </div>
                <div className="text-blue-200">Annual Package</div>
                <div className="text-white font-semibold mt-2">{company.openings} Openings</div>
              </div>
            </div>

            <p className="text-blue-100 text-lg leading-relaxed">{company.description}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Company Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Required Skills */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Required Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {company.required_skills?.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-500/20 text-blue-200 hover:bg-blue-500/30"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recruiting Areas */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Recruiting Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {company.recruiting_areas?.map((area, index) => (
                    <Badge key={index} variant="outline" className="border-purple-400 text-purple-200">
                      {area}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Benefits & Perks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {company.benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-blue-200">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Panel */}
          <div className="space-y-6">
            {user ? (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Apply with Your CV
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userCVs.length > 0 ? (
                    <>
                      <div>
                        <label className="block text-blue-200 mb-2">Select CV:</label>
                        <select
                          value={selectedCV}
                          onChange={(e) => setSelectedCV(e.target.value)}
                          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                        >
                          {userCVs.map((cv) => (
                            <option key={cv.id} value={cv.id} className="bg-gray-800">
                              {cv.specialization} - {cv.file_name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <Button
                        onClick={handleApply}
                        disabled={applying || !selectedCV}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      >
                        {applying ? "Submitting..." : "Submit Application"}
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-blue-200 mb-4">No CVs found. Upload a CV first to apply.</p>
                      <Link href="/">
                        <Button
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                        >
                          Upload CV
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <p className="text-blue-200 mb-4">Sign in to apply for this position</p>
                  <Link href="/auth/login">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Sign In
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Application Result */}
            {applicationResult && (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Application Result</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {applicationResult.skillMatchPercentage}%
                    </div>
                    <div className="text-blue-200">Skill Match</div>
                  </div>

                  {applicationResult.matchedSkills?.length > 0 && (
                    <div>
                      <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Matched Skills
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {applicationResult.matchedSkills.map((skill, index) => (
                          <Badge key={index} className="bg-green-500/20 text-green-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {applicationResult.missingSkills?.length > 0 && (
                    <div>
                      <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-400" />
                        Missing Skills
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {applicationResult.missingSkills.map((skill, index) => (
                          <Badge key={index} className="bg-red-500/20 text-red-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-center text-blue-200">
                    Application submitted successfully to {applicationResult.companyName}!
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
