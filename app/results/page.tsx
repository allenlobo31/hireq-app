"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  FileText,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  User,
  Briefcase,
  GraduationCap,
  Award,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface FileInfo {
  name: string
  size: number
  type: string
}

export default function ResultsPage() {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedFile = localStorage.getItem("uploadedFile")
    if (storedFile) {
      setFileInfo(JSON.parse(storedFile))
    } else {
      router.push("/")
    }
  }, [router])

  if (!fileInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analysis...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => router.push("/")} className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Upload</span>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HireQ
              </span>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Download Report
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* File Info Header */}
        <Card className="p-6 mb-8 bg-white/70 backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <FileText className="w-12 h-12 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">CV Analysis Complete</h1>
              <p className="text-gray-600">
                {fileInfo.name} • {(fileInfo.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <div className="ml-auto">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="w-4 h-4 mr-1" />
                Analysis Complete
              </Badge>
            </div>
          </div>
        </Card>

        {/* Overall Score */}
        <Card className="p-8 mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="text-center">
            <div className="text-6xl font-bold mb-2">85</div>
            <div className="text-xl mb-4">Overall CV Score</div>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Your CV demonstrates strong professional experience and skills. Here are detailed insights to help you
              improve further.
            </p>
          </div>
        </Card>

        {/* Analysis Sections */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-semibold">Strengths</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Professional Experience</p>
                  <p className="text-sm text-gray-600">Well-structured work history with clear progression</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Technical Skills</p>
                  <p className="text-sm text-gray-600">Comprehensive list of relevant technologies</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Education Background</p>
                  <p className="text-sm text-gray-600">Strong educational foundation with relevant qualifications</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Areas for Improvement */}
          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="w-6 h-6 text-orange-600" />
              <h2 className="text-xl font-semibold">Areas for Improvement</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Quantifiable Achievements</p>
                  <p className="text-sm text-gray-600">Add more specific metrics and numbers to showcase impact</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Professional Summary</p>
                  <p className="text-sm text-gray-600">Consider adding a compelling summary at the top</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Keywords Optimization</p>
                  <p className="text-sm text-gray-600">Include more industry-specific keywords for ATS systems</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-white/70 backdrop-blur-sm text-center">
            <User className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800 mb-1">92%</div>
            <div className="text-sm text-gray-600">Contact Information</div>
          </Card>

          <Card className="p-6 bg-white/70 backdrop-blur-sm text-center">
            <Briefcase className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800 mb-1">78%</div>
            <div className="text-sm text-gray-600">Work Experience</div>
          </Card>

          <Card className="p-6 bg-white/70 backdrop-blur-sm text-center">
            <GraduationCap className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800 mb-1">88%</div>
            <div className="text-sm text-gray-600">Education</div>
          </Card>

          <Card className="p-6 bg-white/70 backdrop-blur-sm text-center">
            <Award className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800 mb-1">82%</div>
            <div className="text-sm text-gray-600">Skills & Achievements</div>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="p-6 bg-white/70 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Recommendations</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Add Quantifiable Results</h3>
                <p className="text-sm text-blue-700">
                  Include specific numbers, percentages, and metrics to demonstrate your impact in previous roles.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-purple-900 mb-2">Optimize for ATS</h3>
                <p className="text-sm text-purple-700">
                  Use industry keywords and standard section headings to improve compatibility with applicant tracking
                  systems.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">Professional Summary</h3>
                <p className="text-sm text-green-700">
                  Add a compelling 2-3 sentence summary highlighting your key strengths and career objectives.
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium text-orange-900 mb-2">Format Consistency</h3>
                <p className="text-sm text-orange-700">
                  Ensure consistent formatting, fonts, and spacing throughout your CV for a professional appearance.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
