"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Trophy,
  Target,
  Brain,
  Code,
  MessageSquare,
  TrendingUp,
  Award,
  CheckCircle,
  AlertCircle,
  Star,
} from "lucide-react"

export default function ResultPage() {
  const [selectedView, setSelectedView] = useState("overview")

  // Sample data for different assessment rounds
  const overallScores = [
    { name: "Aptitude", label: "Aptitude", score: 85, value: 85, maxScore: 100, color: "#3b82f6" },
    { name: "Technical", label: "Technical", score: 78, value: 78, maxScore: 100, color: "#8b5cf6" },
    { name: "Interview", label: "Interview", score: 92, value: 92, maxScore: 100, color: "#10b981" },
  ]

  const detailedScores = [
    { category: "Logical Reasoning", label: "Logical Reasoning", score: 88, value: 88 },
    { category: "Quantitative", label: "Quantitative", score: 82, value: 82 },
    { category: "Verbal Ability", label: "Verbal Ability", score: 85, value: 85 },
    { category: "Data Structures", label: "Data Structures", score: 75, value: 75 },
    { category: "Algorithms", label: "Algorithms", score: 80, value: 80 },
    { category: "System Design", label: "System Design", score: 78, value: 78 },
    { category: "Communication", label: "Communication", score: 94, value: 94 },
    { category: "Problem Solving", label: "Problem Solving", score: 90, value: 90 },
    { category: "Leadership", label: "Leadership", score: 92, value: 92 },
  ]

  const performanceData = [
    { round: "Round 1", label: "Round 1", aptitude: 85, technical: 0, interview: 0 },
    { round: "Round 2", label: "Round 2", aptitude: 85, technical: 78, interview: 0 },
    { round: "Round 3", label: "Round 3", aptitude: 85, technical: 78, interview: 92 },
  ]

  const skillDistribution = [
    { name: "Frontend", label: "Frontend", value: 85, color: "#3b82f6" },
    { name: "Backend", label: "Backend", value: 78, color: "#8b5cf6" },
    { name: "Database", label: "Database", value: 72, color: "#10b981" },
    { name: "DevOps", label: "DevOps", value: 65, color: "#f59e0b" },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-blue-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { label: "Excellent", variant: "default" as const, color: "bg-green-100 text-green-800" }
    if (score >= 75) return { label: "Good", variant: "secondary" as const, color: "bg-blue-100 text-blue-800" }
    if (score >= 60) return { label: "Average", variant: "outline" as const, color: "bg-yellow-100 text-yellow-800" }
    return { label: "Needs Improvement", variant: "destructive" as const, color: "bg-red-100 text-red-800" }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Assessment Results
              </h1>
              <p className="text-gray-600 text-lg">Alex Johnson • Full Stack Developer Assessment</p>
              <p className="text-sm text-gray-500">Completed on January 15, 2024</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-green-100 text-green-800 px-3 py-1">
                <CheckCircle className="w-4 h-4 mr-2" />
                Assessment Completed
              </Badge>
              <Button variant="outline" size="sm" className="px-4 py-2 bg-transparent">
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 mb-10 bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-sm border border-gray-200/50">
          {[
            { id: "overview", label: "Overview", icon: Trophy },
            { id: "detailed", label: "Detailed Scores", icon: Target },
            { id: "progress", label: "Progress", icon: TrendingUp },
            { id: "recommendations", label: "Recommendations", icon: Star },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedView(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all font-medium ${
                selectedView === tab.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/70 hover:shadow-sm"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {selectedView === "overview" && (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Overall Score Cards */}
              <div className="lg:col-span-2 grid md:grid-cols-3 gap-6">
                {overallScores.map((item, index) => (
                  <Card
                    key={index}
                    className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl flex items-center space-x-3">
                          {item.name === "Aptitude" && <Brain className="w-6 h-6 text-blue-600" />}
                          {item.name === "Technical" && <Code className="w-6 h-6 text-purple-600" />}
                          {item.name === "Interview" && <MessageSquare className="w-6 h-6 text-green-600" />}
                          <span>{item.name}</span>
                        </CardTitle>
                        <Badge className={`${getScoreBadge(item.score).color} px-3 py-1`}>
                          {getScoreBadge(item.score).label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-4xl font-bold ${getScoreColor(item.score)}`}>{item.score}</span>
                        <span className="text-gray-500 text-lg">/ {item.maxScore}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-700 shadow-sm"
                          style={{
                            width: `${(item.score / item.maxScore) * 100}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <Award className="w-6 h-6 text-yellow-600" />
                    <span>Overall Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ChartContainer
                    config={{
                      score: { label: "Score", color: "hsl(var(--chart-1))" },
                      value: { label: "Value", color: "hsl(var(--chart-2))" },
                    }}
                    className="h-[240px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="80%" data={overallScores}>
                        <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="text-center mt-6 space-y-1">
                    <div className="text-3xl font-bold text-blue-600">85%</div>
                    <div className="text-sm text-gray-600">Average Score</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl">Skills Distribution</CardTitle>
                <CardDescription className="text-base">
                  Performance breakdown across different skill areas
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ChartContainer
                  config={{
                    value: { label: "Score", color: "hsl(var(--chart-1))" },
                    name: { label: "Skill", color: "hsl(var(--chart-2))" },
                  }}
                  className="h-[350px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={skillDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name || ""}: ${value || 0}%`}
                      >
                        {skillDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedView === "detailed" && (
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl">Detailed Score Breakdown</CardTitle>
              <CardDescription className="text-base">Performance across all assessment categories</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ChartContainer
                config={{
                  score: { label: "Score", color: "hsl(var(--chart-1))" },
                  value: { label: "Value", color: "hsl(var(--chart-2))" },
                }}
                className="h-[450px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={detailedScores} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="score" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        )}

        {selectedView === "progress" && (
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl">Assessment Progress</CardTitle>
              <CardDescription className="text-base">Score progression through different rounds</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ChartContainer
                config={{
                  aptitude: { label: "Aptitude", color: "#3b82f6" },
                  technical: { label: "Technical", color: "#8b5cf6" },
                  interview: { label: "Interview", color: "#10b981" },
                }}
                className="h-[450px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="round" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="aptitude" stroke="#3b82f6" strokeWidth={4} />
                    <Line type="monotone" dataKey="technical" stroke="#8b5cf6" strokeWidth={4} />
                    <Line type="monotone" dataKey="interview" stroke="#10b981" strokeWidth={4} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        )}

        {selectedView === "recommendations" && (
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-green-600 text-xl">
                  <CheckCircle className="w-6 h-6" />
                  <span>Strengths</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-0">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="space-y-1">
                    <h4 className="font-semibold text-lg">Excellent Communication Skills</h4>
                    <p className="text-gray-600">
                      Scored 94% in interview round, showing strong verbal and presentation abilities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="space-y-1">
                    <h4 className="font-semibold text-lg">Strong Problem-Solving</h4>
                    <p className="text-gray-600">
                      Demonstrated excellent analytical thinking with 90% score in problem-solving.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="space-y-1">
                    <h4 className="font-semibold text-lg">Leadership Potential</h4>
                    <p className="text-gray-600">
                      High leadership score (92%) indicates strong team management capabilities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-yellow-600 text-xl">
                  <AlertCircle className="w-6 h-6" />
                  <span>Areas for Improvement</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-0">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="space-y-1">
                    <h4 className="font-semibold text-lg">Data Structures Knowledge</h4>
                    <p className="text-gray-600">
                      Consider reviewing advanced data structures and their implementations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="space-y-1">
                    <h4 className="font-semibold text-lg">System Design</h4>
                    <p className="text-gray-600">Focus on scalability patterns and distributed system concepts.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="space-y-1">
                    <h4 className="font-semibold text-lg">DevOps Skills</h4>
                    <p className="text-gray-600">Enhance knowledge in containerization and CI/CD pipelines.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 bg-white/80 backdrop-blur-sm shadow-lg border-0">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-blue-600 text-xl">
                  <Star className="w-6 h-6" />
                  <span>Recommended Next Steps</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Immediate Actions</h4>
                    <ul className="text-gray-600 space-y-2">
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Practice advanced data structure problems</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Study system design case studies</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Complete Docker and Kubernetes tutorials</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Long-term Goals</h4>
                    <ul className="text-gray-600 space-y-2">
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>Obtain cloud certification (AWS/Azure)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>Build a portfolio project showcasing system design</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>Contribute to open-source projects</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-4 mt-12 pt-8 border-t border-gray-200/50">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all">
            Apply to Matching Jobs
          </Button>
          <Button variant="outline" className="px-8 py-3 text-lg font-medium border-2 hover:bg-gray-50 bg-transparent">
            Retake Assessment
          </Button>
          <Button variant="outline" className="px-8 py-3 text-lg font-medium border-2 hover:bg-gray-50 bg-transparent">
            Schedule Interview
          </Button>
        </div>
      </div>
    </div>
  )
}
