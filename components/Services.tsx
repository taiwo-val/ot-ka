export default function Services() {
  const services = [
    {
      title: "Match Photography",
      description: "Capturing every tackle, goal, and celebration with stunning action shots.",
    },
    {
      title: "Tournament Coverage",
      description: "Professional photography for football competitions from start to finish.",
    },
    {
      title: "Player Portraits",
      description: "High-quality portraits for players, teams, and sports branding.",
    },
    {
      title: "Highlight Content",
      description: "Creating engaging visual content for clubs, academies, and social media.",
    },
  ];

  return (
    <section className="bg-zinc-950 py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-4xl font-bold text-white">
          My Services
        </h2>

        <p className="mt-4 text-center text-zinc-400">
          Professional football photography tailored for clubs, players, and tournaments.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition hover:border-green-500"
            >
              <h3 className="text-2xl font-semibold text-white">
                {service.title}
              </h3>

              <p className="mt-4 text-zinc-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}