"use client"

import { memo } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ResponsiveContainer } from "recharts"

const data = [
  {
    name: "Jan",
    courses: 2,
    tests: 3,
    notes: 4,
  },
  {
    name: "Feb",
    courses: 3,
    tests: 5,
    notes: 7,
  },
  {
    name: "Mar",
    courses: 3,
    tests: 6,
    notes: 10,
  },
  {
    name: "Apr",
    courses: 4,
    tests: 8,
    notes: 12,
  },
  {
    name: "May",
    courses: 5,
    tests: 10,
    notes: 15,
  },
  {
    name: "Jun",
    courses: 7,
    tests: 12,
    notes: 20,
  },
  {
    name: "Jul",
    courses: 8,
    tests: 16,
    notes: 24,
  },
]

// Memoize chart components for better performance
const LearningProgressChart = memo(function LearningProgressChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis tickLine={false} axisLine={false} fontSize={12} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Line type="monotone" dataKey="courses" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="tests" stroke="#82ca9d" strokeWidth={2} />
        <Line type="monotone" dataKey="notes" stroke="#ffc658" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
})

const AIInteractionsChart = memo(function AIInteractionsChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={[
          { name: "Questions", value: 45 },
          { name: "Summaries", value: 32 },
          { name: "Explanations", value: 28 },
          { name: "Quizzes", value: 15 },
        ]}
      >
        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
})

export function Overview() {
  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-medium mb-4">Learning Progress</h4>
        <LearningProgressChart />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-4">AI Interactions by Category</h4>
        <AIInteractionsChart />
      </div>
    </div>
  )
}

