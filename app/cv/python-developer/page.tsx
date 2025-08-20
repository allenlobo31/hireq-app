"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Briefcase, Code, Calendar, MapPin, Mail, Phone, Award, ExternalLink } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"

export default function PythonDeveloperCVPage() {
  const profile = {
    name: "Alex Johnson",
    title: "Python Developer & Data Analyst",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    specialization: ["Python", "Django", "Data Analysis", "Machine Learning", "SQL"],
    experience: [
      {
        company: "DataTech Analytics",
        position: "Senior Python Developer",
        duration: "2021 - Present",
        location: "San Francisco, CA",
        description:
          "Developed Python applications for data processing and built ML models for business insights. Led a team of 3 data analysts and improved data processing efficiency by 80%.",
        skills: ["Python", "Django", "Pandas", "NumPy", "Scikit-learn", "TensorFlow"],
      },
      {
        company: "AI Innovations",
        position: "Python Developer",
        duration: "2019 - 2021",
        location: "Remote",
        description:
          "Built data processing pipelines and automated reporting systems using Python. Developed predictive models that increased business revenue by 25%.",
        skills: ["Python", "Flask", "SQLAlchemy", "Matplotlib", "Seaborn", "PostgreSQL"],
      },
      {
        company: "TechStart Analytics",
        position: "Junior Data Analyst",
        duration: "2017 - 2019",
        location: "San Francisco, CA",
        description:
          "Analyzed large datasets and created visualizations for business stakeholders. Gained expertise in statistical analysis and data mining techniques.",
        skills: ["Python", "Pandas", "Jupyter", "SQL", "Excel", "Tableau"],
      },
    ],
    projects: [
      {
        name: "Sales Analytics Dashboard",
        description:
          "Built comprehensive analytics dashboard for sales data visualization and reporting. Processes 1M+ records daily with real-time insights.",
        technologies: ["Python", "Django", "Chart.js", "PostgreSQL", "Redis", "Celery"],
        link: "https://github.com/alexjohnson/sales-analytics",
      },
      {
        name: "Inventory Management System",
        description:
          "Developed automated inventory tracking system with predictive analytics and demand forecasting capabilities.",
        technologies: ["Python", "Flask", "SQLAlchemy", "Pandas", "Scikit-learn"],
        link: "https://github.com/alexjohnson/inventory-system",
      },
      {
        name: "Customer Churn Prediction",
        description:
          "Built machine learning model to predict customer churn with 92% accuracy, helping reduce customer attrition by 30%.",
        technologies: ["Python", "TensorFlow", "Pandas", "NumPy", "Matplotlib"],
        link: "https://github.com/alexjohnson/churn-prediction",
      },
      {
        name: "Financial Data Pipeline",
        description:
          "Created automated ETL pipeline for financial data processing, handling multiple data sources and generating daily reports.",
        technologies: ["Python", "Apache Airflow", "PostgreSQL", "Docker", "AWS"],
        link: "https://github.com/alexjohnson/financial-pipeline",
      },
    ],
    skills: {
      frontend: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Chart.js", "D3.js", "Plotly"],
      backend: ["Python", "Django", "Flask", "FastAPI", "REST APIs", "GraphQL", "Celery"],
      database: ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "Redis", "InfluxDB"],
      cloud: ["AWS", "Docker", "Heroku", "Linux", "Apache Airflow", "Kubernetes"],
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}

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
                <h4 className="font-medium text-gray-700 mb-3">Data & Analytics</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {profile.skills.frontend.map((skill, index) => (
                    <Badge key={index} className="bg-blue-100 text-blue-700 border-blue-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <h4 className="font-medium text-gray-700 mb-3">Backend & APIs</h4>
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
