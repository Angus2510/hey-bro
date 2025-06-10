"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { MoodType } from "@/lib/types";

interface MoodEntry {
  date: Date;
  mood: MoodType;
  note?: string;
}

// Structure of the data passed to the chart
interface ChartDataEntry {
  date: string; // Formatted date string for XAxis
  value: number; // Numerical value of the mood
  mood: MoodType; // Original mood type
  fullDate: Date; // Original date object for sorting
}

interface MoodTrackerProps {
  moodHistory: MoodEntry[];
  timeFrame?: "week" | "month";
}

const moodValues: Record<MoodType, number> = {
  happy: 5,
  stressed: 3,
  angry: 2,
  sad: 1,
  numb: 2,
  other: 3,
};

const moodColors: Record<MoodType, string> = {
  happy: "#22c55e", // green
  stressed: "#f59e0b", // amber
  angry: "#ef4444", // red
  sad: "#3b82f6", // blue
  numb: "#6b7280", // gray
  other: "#8b5cf6", // purple
};

export function MoodTracker({
  moodHistory,
  timeFrame = "week",
}: MoodTrackerProps) {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(timeFrame);

  // Filter history based on time frame
  const filteredHistory = moodHistory.filter((entry) => {
    const now = new Date();
    const entryDate = new Date(entry.date);

    if (selectedTimeFrame === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      return entryDate >= weekAgo;
    } else {
      const monthAgo = new Date();
      monthAgo.setMonth(now.getMonth() - 1);
      return entryDate >= monthAgo;
    }
  });

  // Format data for the chart
  const chartData = filteredHistory
    .map((entry) => {
      const date = new Date(entry.date);
      return {
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        value: moodValues[entry.mood],
        mood: entry.mood,
        fullDate: date,
      };
    })
    .sort((a, b) => a.fullDate.getTime() - b.fullDate.getTime());

  // Define types for Recharts Tooltip props
  interface TooltipPayload {
    name: string; // dataKey (e.g., "value")
    value: number; // The actual value for this dataKey
    payload: ChartDataEntry; // The full data object for this point
    color?: string; // Color of the bar/line
    dataKey?: string;
    formatter?: (
      value: number,
      name: string,
      entry: TooltipPayload,
      index: number
    ) => React.ReactNode;
    type?: string;
    unit?: string;
  }

  interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipPayload[];
  }

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      // The actual data point is in payload[0].payload
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-card border rounded p-2 shadow-md">
          <p className="text-sm font-medium">{dataPoint.date}</p>{" "}
          {/* Or use label if preferred for the date */}
          <p className="text-sm capitalize">{dataPoint.mood}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Mood Tracker</h2>
        <div className="flex space-x-2 text-sm">
          <button
            className={`px-2 py-1 rounded ${
              selectedTimeFrame === "week"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
            onClick={() => setSelectedTimeFrame("week")}
          >
            Week
          </button>
          <button
            className={`px-2 py-1 rounded ${
              selectedTimeFrame === "month"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
            onClick={() => setSelectedTimeFrame("month")}
          >
            Month
          </button>
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No mood data available for this time period.
          <p className="mt-2 text-sm">Check in daily to see your progress.</p>
        </div>
      ) : (
        <div className="h-[200px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                domain={[0, 5]}
                ticks={[0, 1, 2, 3, 4, 5]}
                tickFormatter={(value) => {
                  const labels = ["", "Low", "", "Neutral", "", "High"];
                  return labels[value] || "";
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={moodColors[entry.mood]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
