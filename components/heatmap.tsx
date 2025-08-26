"use client";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

interface HeatmapProps {
  contributions: { date: string; count: number }[];
}

export default function Heatmap({ contributions }: HeatmapProps) {
  return (
    <div className="space-y-4">
      <CalendarHeatmap
        startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
        endDate={new Date()}
        values={contributions}
        classForValue={(val) => {
          if (!val || val.count === 0) return "color-empty";
          if (val.count < 3) return "color-scale-1";
          if (val.count < 6) return "color-scale-2";
          if (val.count < 10) return "color-scale-3";
          return "color-scale-4";
        }}
        tooltipDataAttrs={(val: any) =>
          val.date ? { "data-tip": `${val.date}: ${val.count} contributions` } : null
        }
      />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex space-x-1">
          <div className="w-3 h-3 rounded-sm bg-[#ebedf0]" />
          <div className="w-3 h-3 rounded-sm bg-[#c6e48b]" />
          <div className="w-3 h-3 rounded-sm bg-[#7bc96f]" />
          <div className="w-3 h-3 rounded-sm bg-[#239a3b]" />
          <div className="w-3 h-3 rounded-sm bg-[#196127]" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
