"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Props = {
  downloads: number;
  favorites: number;
  users: number;
  photos: number;
};

export default function AdminChart({
  downloads,
  favorites,
  users,
  photos,
}: Props) {
  const data = [
    {
      name: "Downloads",
      value: downloads,
    },
    {
      name: "Favorites",
      value: favorites,
    },
    {
      name: "Users",
      value: users,
    },
    {
      name: "Photos",
      value: photos,
    },
  ];

  return (
    <div className="mt-10 rounded-xl bg-zinc-900 p-6">
      <h2 className="mb-6 text-2xl font-bold">
        📊 Site Analytics
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}