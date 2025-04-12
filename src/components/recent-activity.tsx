import { memo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, FileText, GraduationCap, MessageSquare } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "course",
    title: "Advanced Machine Learning",
    time: "2 hours ago",
    icon: GraduationCap,
  },
  {
    id: 2,
    type: "test",
    title: "Data Structures Quiz",
    time: "Yesterday",
    icon: FileText,
  },
  {
    id: 3,
    type: "note",
    title: "Neural Networks Notes",
    time: "2 days ago",
    icon: BookOpen,
  },
  {
    id: 4,
    type: "ai",
    title: "AI Assistant Chat",
    time: "3 days ago",
    icon: MessageSquare,
  },
]

// Memoize the ActivityItem component for better performance
const ActivityItem = memo(function ActivityItem({ activity }: { activity: (typeof activities)[0] }) {
  const Icon = activity.icon

  return (
    <div className="flex items-center" key={activity.id}>
      <Avatar className="h-9 w-9 mr-4">
        <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt="" />
        <AvatarFallback>
          <Icon className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">{activity.title}</p>
        <p className="text-sm text-muted-foreground">{activity.time}</p>
      </div>
      <div className="ml-auto font-medium">
        {activity.type === "course" && <span className="text-blue-500">Resumed</span>}
        {activity.type === "test" && <span className="text-green-500">Completed</span>}
        {activity.type === "note" && <span className="text-yellow-500">Generated</span>}
        {activity.type === "ai" && <span className="text-purple-500">Interacted</span>}
      </div>
    </div>
  )
})

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  )
}

