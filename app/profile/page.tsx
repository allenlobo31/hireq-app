"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Settings,
  Edit3,
  Camera,
  Save,
  X,
} from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+91 98765 43210",
    location: "Bangalore, Karnataka",
    title: "Full Stack Developer",
    company: "TechCorp Solutions",
    experience: "5+ years",
    education: "B.Tech Computer Science",
    university: "IIT Bangalore",
    bio: "Passionate full-stack developer with expertise in modern web technologies. Love building scalable applications and solving complex problems.",
    skills: ["React", "Node.js", "Python", "TypeScript", "AWS", "MongoDB", "Docker", "GraphQL"],
    achievements: ["AWS Certified Developer", "Google Cloud Professional", "Hackathon Winner 2023"],
    joinDate: "January 2024",
  })

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset any changes
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
          <a href="/profile" className="text-blue-600 font-medium">
            Profile
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            Contact
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            Result
          </a>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" className="text-gray-600 hover:text-gray-900 px-4 py-2">
            Sign In
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-xl text-gray-600">Manage your personal information and preferences</p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-6">
          {/* Profile Header Card */}
          <Card className="p-8 bg-white/70 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
                  <p className="text-lg text-gray-600">{profileData.title}</p>
                  <p className="text-sm text-gray-500">{profileData.company}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 mt-4 md:mt-0">
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleSave}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={handleCancel} variant="outline" className="border-gray-300 bg-transparent">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
                <Button variant="outline" className="border-gray-300 bg-transparent">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{profileData.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{profileData.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{profileData.location}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{profileData.experience} experience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{profileData.education}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">Joined {profileData.joinDate}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* About Section */}
          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              About Me
            </h3>
            {isEditing ? (
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                rows={4}
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
            )}
          </Card>

          {/* Skills Section */}
          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-blue-600" />
              Technical Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 hover:from-blue-200 hover:to-purple-200"
                >
                  {skill}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Add new skill and press Enter"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value.trim()) {
                      setProfileData({
                        ...profileData,
                        skills: [...profileData.skills, e.currentTarget.value.trim()],
                      })
                      e.currentTarget.value = ""
                    }
                  }}
                />
              </div>
            )}
          </Card>

          {/* Achievements Section */}
          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-blue-600" />
              Achievements & Certifications
            </h3>
            <div className="space-y-3">
              {profileData.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg"
                >
                  <Award className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">{achievement}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Education Section */}
          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
              Education
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                <h4 className="font-semibold text-gray-800">{profileData.education}</h4>
                <p className="text-gray-600">{profileData.university}</p>
                <p className="text-sm text-gray-500">2018 - 2022</p>
              </div>
            </div>
          </Card>

          {/* Activity Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white/70 backdrop-blur-sm text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800">12</h4>
              <p className="text-gray-600">Applications Sent</p>
            </Card>

            <Card className="p-6 bg-white/70 backdrop-blur-sm text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800">8</h4>
              <p className="text-gray-600">Interviews Completed</p>
            </Card>

            <Card className="p-6 bg-white/70 backdrop-blur-sm text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800">3</h4>
              <p className="text-gray-600">Offers Received</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
