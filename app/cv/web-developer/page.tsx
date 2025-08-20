"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Briefcase, Code, Calendar, MapPin, Mail, Phone, Award, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Nav } from "react-day-picker"
import Navbar from "@/components/navbar"

export default function WebDeveloperCVPage() {
  const profile = {
    name: "Alex Johnson",
    title: "Full Stack Web Developer",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    specialization: ["React.js", "Node.js", "JavaScript", "TypeScript", "MongoDB"],
    experience: [
      {
        company: "TechCorp Solutions",
        position: "Senior Full Stack Developer",
        duration: "2022 - Present",
        location: "San Francisco, CA",
        description:
          "Led development of scalable web applications using React and Node.js, managing a team of 4 developers. Implemented microservices architecture and improved system performance by 60%.",
        skills: ["React", "Node.js", "AWS", "PostgreSQL", "Docker", "Kubernetes"],
      },
      {
        company: "StartupHub",
        position: "Frontend Developer",
        duration: "2020 - 2022",
        location: "Remote",
        description:
          "Built responsive user interfaces and improved application performance by 40%. Collaborated with design team to implement pixel-perfect UI components.",
        skills: ["React", "TypeScript", "Redux", "CSS3", "Webpack", "Jest"],
      },
      {
        company: "WebTech Solutions",
        position: "Junior Web Developer",
        duration: "2018 - 2020",
        location: "San Francisco, CA",
        description:
          "Developed and maintained client websites using modern web technologies. Gained experience in full-stack development and agile methodologies.",
        skills: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "WordPress"],
      },
    ],
    projects: [
      {
        name: "E-commerce Platform",
        description:
          "Built a full-stack e-commerce solution with payment integration, inventory management, and admin dashboard. Handles 10,000+ daily transactions.",
        technologies: ["React", "Node.js", "Stripe", "MongoDB", "Redis", "AWS"],
        link: "https://github.com/alexjohnson/ecommerce",
      },
      {
        name: "Task Management App",
        description:
          "Developed a collaborative task management application with real-time updates, team collaboration features, and advanced analytics.",
        technologies: ["React", "Socket.io", "Express", "PostgreSQL", "Docker"],
        link: "https://github.com/alexjohnson/taskmanager",
      },
      {
        name: "Social Media Dashboard",
        description:
          "Created a comprehensive social media management platform with scheduling, analytics, and multi-platform integration.",
        technologies: ["Vue.js", "Node.js", "GraphQL", "MongoDB", "Bull Queue"],
        link: "https://github.com/alexjohnson/social-dashboard",
      },
      {
        name: "Real Estate Portal",
        description:
          "Built a modern real estate platform with advanced search, virtual tours, and mortgage calculator integration.",
        technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Vercel"],
        link: "https://github.com/alexjohnson/real-estate",
      },
    ],
    skills: {
      frontend: ["React.js", "Vue.js", "Next.js", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "SASS"],
      backend: ["Node.js", "Express.js", "REST APIs", "GraphQL", "WebSockets", "Microservices"],
      database: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Prisma", "Mongoose"],
      cloud: ["AWS", "Docker", "Kubernetes", "Vercel", "Netlify", "CI/CD", "Jenkins"],
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navbar */}
      <Navbar />

      <div className="container mx-auto px-6 py-8">
        <Link href="/cv">
          <Button variant="ghost" className="mb-6 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to CV Profiles
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="p-8 mb-8 bg-white/70 backdrop-blur-sm">
            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{profile.name}</h1>
                <h2 className="text-2xl text-gray-600 mb-4">{profile.title}</h2>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-blue-600" />
                    {profile.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-blue-600" />
                    {profile.phone}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                    {profile.location}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Core Specializations */}
          <Card className="p-6 mb-8 bg-white/70 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Core Specializations</h3>
            <div className="flex flex-wrap gap-3">
              {profile.specialization.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 px-3 py-1"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Experience */}
          <Card className="p-6 mb-8 bg-white/70 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
              Professional Experience
            </h3>
            <div className="space-y-6">
              {profile.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-200 pl-6 pb-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{exp.position}</h4>
                      <p className="text-blue-600 font-medium text-lg">{exp.company}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {exp.duration}
                      </div>
                      <div className="flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Projects */}
          <Card className="p-6 mb-8 bg-white/70 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Code className="w-5 h-5 mr-2 text-purple-600" />
              Featured Projects
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {profile.projects.map((project, index) => (
                <Card key={index} className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-gray-800 text-lg">{project.name}</h4>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Technical Skills */}
          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Award className="w-5 h-5 mr-2 text-green-600" />
              Technical Skills
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Frontend Technologies</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {profile.skills.frontend.map((skill, index) => (
                    <Badge key={index} className="bg-blue-100 text-blue-700 border-blue-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <h4 className="font-medium text-gray-700 mb-3">Backend Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.backend.map((skill, index) => (
                    <Badge key={index} className="bg-green-100 text-green-700 border-green-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Database & Storage</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {profile.skills.database.map((skill, index) => (
                    <Badge key={index} className="bg-purple-100 text-purple-700 border-purple-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <h4 className="font-medium text-gray-700 mb-3">Cloud & DevOps</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.cloud.map((skill, index) => (
                    <Badge key={index} className="bg-orange-100 text-orange-700 border-orange-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
