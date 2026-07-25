export default function Stats() {
  const stats = [
    {
      number: "500+",
      label: "Matches Covered",
    },
    {
      number: "15K+",
      label: "Photos Captured",
    },
    {
      number: "50+",
      label: "Tournaments",
    },
    {
      number: "100+",
      label: "Happy Clients",
    },
  ];

  return (
    <section className="bg-zinc-950 py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-zinc-900 p-8 text-center"
          >
            <h2 className="text-4xl font-extrabold text-green-500">
              {stat.number}
            </h2>

            <p className="mt-3 text-zinc-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}