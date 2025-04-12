import { memo } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const courses = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of machine learning algorithms",
    progress: 75,
    category: "Computer Science",
    tests: 4,
    notes: 8,
  },
  {
    id: 2,
    title: "Advanced Data Structures",
    description: "Deep dive into complex data structures and algorithms",
    progress: 45,
    category: "Computer Science",
    tests: 6,
    notes: 12,
  },
  {
    id: 3,
    title: "Web Development with React",
    description: "Build modern web applications with React",
    progress: 90,
    category: "Web Development",
    tests: 3,
    notes: 5,
  },
  {
    id: 4,
    title: "Quantum Computing Basics",
    description: "Introduction to quantum computing principles",
    progress: 20,
    category: "Physics",
    tests: 2,
    notes: 4,
  },
]

// Memoize the CourseCard component for better performance
const CourseCard = memo(function CourseCard({ course }: { course: (typeof courses)[0] }) {
  return (
    <Card key={course.id}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{course.title}</CardTitle>
          <Badge variant="outline">{course.category}</Badge>
        </div>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} />
          </div>
          <div className="flex justify-between text-sm">
            <div>Tests: {course.tests}</div>
            <div>Notes: {course.notes}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Continue Learning</Button>
      </CardFooter>
    </Card>
  )
})

export function CoursesList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}

