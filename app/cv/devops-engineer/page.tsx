"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Briefcase, Code, Calendar, MapPin, Mail, Phone, Award, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function DevOpsEngineerCVPage() {
  const profile = {
    name: "Alex Johnson",
    title: "DevOps Engineer & Cloud Specialist",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    specialization: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    experience: [
      {
        company: "CloudOps Solutions",
        position: "Senior DevOps Engineer",
        duration: "2021 - Present",
        location: "San Francisco, CA",
        description:
          "Architected cloud infrastructure and automated deployment pipelines, reduced deployment time by 70%. Led infrastructure modernization for 50+ microservices.",
        skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Ansible"],
      },
      {
        company: "TechStart Inc",
        position: "DevOps Engineer",
        duration: "2019 - 2021",
        location: "Remote",
        description:
          "Implemented CI/CD pipelines and managed cloud infrastructure for multiple applications. Improved system reliability from 95% to 99.9% uptime.",
        skills: ["Docker", "AWS", "Linux", "Bash", "GitLab CI", "Prometheus"],
      },
      {
        company: "InfraTech Systems",
        position: "Junior DevOps Engineer",
        duration: "2017 - 2019",
        location: "San Francisco, CA",
        description:
          "Managed server infrastructure and automated deployment processes. Gained expertise in containerization and monitoring systems.",
        skills: ["Linux", "Docker", "Nginx", "MySQL", "Bash", "Grafana"],
      },
    ],
    projects: [
      {
        name: "Automated Deployment Pipeline",
        description:
          "Built comprehensive CI/CD pipeline with automated testing, building, and deployment. Reduced deployment time from 2 hours to 10 minutes.",
        technologies: ["Jenkins", "Docker", "Kubernetes", "AWS", "Helm", "ArgoCD"],
        link: "https://github.com/alexjohnson/cicd-pipeline",
      },
      {
        name: "Infrastructure as Code",
        description:
          "Implemented infrastructure automation using Terraform for multi-environment deployments across 3 AWS regions.",
        technologies: ["Terraform", "AWS", "Docker", "Ansible", "CloudFormation"],
        link: "https://github.com/alexjohnson/infrastructure-code",
      },
      {
        name: "Monitoring & Alerting System",
        description:
          "Designed comprehensive monitoring solution with custom dashboards and intelligent alerting for 100+ services.",
        technologies: ["Prometheus", "Grafana", "AlertManager", "ELK Stack", "PagerDuty"],
        link: "https://github.com/alexjohnson/monitoring-system",
      },
      {
        name: "Multi-Cloud Migration",
        description:
          "Led migration of legacy infrastructure to multi-cloud architecture, improving scalability and reducing costs by 40%.",
        technologies: ["AWS", "GCP", "Terraform", "Kubernetes", "Istio", "Vault"],
        link: "https://github.com/alexjohnson/multi-cloud-migration",
      },
    ],
    skills: {
      frontend: ["Grafana", "Kibana", "Prometheus", "HTML", "CSS", "JavaScript", "React"],
      backend: ["Python", "Bash", "Node.js", "Go", "REST APIs", "gRPC", "Microservices"],
      database: ["PostgreSQL", "MongoDB", "Redis", "InfluxDB", "Elasticsearch", "MySQL"],
      cloud: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "GitLab CI", "Ansible"],
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            HireQ
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="/cv" className="text-blue-600 font-medium transition-colors">
            CV
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            Interview
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            Profile
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            Contact
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            Result
          </a>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" className="text-gray-600 hover:text-gray-900 px-4 py-2">
            Sign In
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2">
            Get Started
          </Button>
        </div>
      </nav>

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
                <h4 className="font-medium text-gray-700 mb-3">Monitoring & Visualization</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {profile.skills.frontend.map((skill, index) => (
                    <Badge key={index} className="bg-blue-100 text-blue-700 border-blue-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <h4 className="font-medium text-gray-700 mb-3">Scripting & Development</h4>
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
                <h4 className="font-medium text-gray-700 mb-3">Cloud & Infrastructure</h4>
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
