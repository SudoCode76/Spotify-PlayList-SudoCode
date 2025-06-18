"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Linkedin } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-4xl">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-slate-900 dark:text-slate-50">About Me</h1>
      <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 mb-8">
        I am a passionate software developer with experience in building web applications and mobile apps. I love
        learning new technologies and solving complex problems.
      </p>

      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4 text-slate-900 dark:text-slate-50">
        Contact Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-4 sm:p-6 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
              <Mail className="text-white" size={24} />
            </div>
            <CardTitle className="text-lg sm:text-xl lg:text-2xl text-slate-800 dark:text-slate-200 mb-2">
              Email
            </CardTitle>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">youremail@example.com</p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-4 sm:p-6 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
              <Phone className="text-white" size={24} />
            </div>
            <CardTitle className="text-lg sm:text-xl lg:text-2xl text-slate-800 dark:text-slate-200 mb-2">
              Phone
            </CardTitle>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">+1 (555) 123-4567</p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-4 sm:p-6 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
              <Linkedin className="text-white" size={24} />
            </div>
            <CardTitle className="text-lg sm:text-xl lg:text-2xl text-slate-800 dark:text-slate-200 mb-2">
              LinkedIn
            </CardTitle>
            <Button
              onClick={() => window.open("https://linkedin.com/in/tu-perfil", "_blank")}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg text-sm sm:text-base"
            >
              View Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
