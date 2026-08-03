import {
  FaGithub,
  FaReact,
  FaNodeJs,
  FaRobot,
  FaCode,
  FaChartLine,
  FaFileAlt,
  FaUsers,
} from "react-icons/fa";

import {
  SiExpress,
  SiTailwindcss,
  SiPostgresql,
  SiPrisma,
} from "react-icons/si";

export default function About() {
  const features = [
    {
      icon: <FaRobot />,
      title: "AI Insights",
      desc: "Generate intelligent GitHub profile summaries and recommendations.",
    },
    {
      icon: <FaCode />,
      title: "Repository Analyzer",
      desc: "Analyze repositories, README files, technologies and project quality.",
    },
    {
      icon: <FaChartLine />,
      title: "Developer Analytics",
      desc: "Track repositories, stars, forks, languages and developer growth.",
    },
    {
      icon: <FaUsers />,
      title: "Developer Comparison",
      desc: "Compare two GitHub developers using AI-powered metrics.",
    },
    {
      icon: <FaFileAlt />,
      title: "Resume Builder",
      desc: "Create ATS-friendly resumes directly from GitHub profiles.",
    },
    {
      icon: <FaGithub />,
      title: "GitHub Intelligence",
      desc: "Everything about your GitHub profile in one beautiful dashboard.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* HERO */}

      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-8 py-24 text-center">

          <h1 className="text-7xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">

            DevLens

          </h1>

          <p className="text-2xl text-slate-300 mt-8 max-w-4xl mx-auto leading-10">

            AI Powered GitHub Intelligence Platform

          </p>

          <p className="text-slate-400 text-lg max-w-3xl mx-auto mt-6 leading-8">

            Analyze developers, repositories, AI insights, GitHub statistics,
            career recommendations and build ATS-ready resumes — all from one place.

          </p>

          <div className="flex justify-center gap-6 mt-12">

          

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="max-w-7xl mx-auto px-8">

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 text-center">

            <h2 className="text-5xl font-black text-cyan-400">100+</h2>

            <p className="text-slate-400 mt-3">
              GitHub Metrics
            </p>

          </div>

          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 text-center">

            <h2 className="text-5xl font-black text-purple-400">AI</h2>

            <p className="text-slate-400 mt-3">
              Developer Insights
            </p>

          </div>

          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 text-center">

            <h2 className="text-5xl font-black text-green-400">24/7</h2>

            <p className="text-slate-400 mt-3">
              Repository Analysis
            </p>

          </div>

          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 text-center">

            <h2 className="text-5xl font-black text-yellow-400">PDF</h2>

            <p className="text-slate-400 mt-3">
              Export Reports
            </p>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="max-w-7xl mx-auto px-8 py-24">

        <h2 className="text-5xl font-bold text-center mb-16">

          Everything Developers Need

        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {features.map((feature) => (

            <div
              key={feature.title}
              className="bg-slate-900 rounded-3xl border border-slate-800 p-8 hover:border-cyan-500 hover:-translate-y-3 transition-all duration-300"
            >

              <div className="text-cyan-400 text-5xl mb-6">

                {feature.icon}

              </div>

              <h3 className="text-2xl font-bold">

                {feature.title}

              </h3>

              <p className="text-slate-400 mt-5 leading-8">

                {feature.desc}

              </p>

            </div>

          ))}

        </div>

      </section>
            {/* HOW IT WORKS */}

      <section className="max-w-7xl mx-auto px-8 pb-24">

        <h2 className="text-5xl font-bold text-center mb-16">
          How DevLens Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {[
            {
              no: "01",
              title: "Search",
              desc: "Enter any GitHub username.",
            },
            {
              no: "02",
              title: "Analyze",
              desc: "DevLens collects repositories, stars, forks and activity.",
            },
            {
              no: "03",
              title: "AI Insights",
              desc: "AI generates summaries, skills and recommendations.",
            },
            {
              no: "04",
              title: "Export",
              desc: "Download professional PDF reports instantly.",
            },
          ].map((step) => (

            <div
              key={step.no}
              className="text-center bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-cyan-500 transition"
            >

              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-2xl font-bold mb-6">
                {step.no}
              </div>

              <h3 className="text-2xl font-bold">
                {step.title}
              </h3>

              <p className="text-slate-400 mt-4 leading-7">
                {step.desc}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* TECHNOLOGY STACK */}

      <section className="max-w-7xl mx-auto px-8 pb-24">

        <h2 className="text-5xl font-bold text-center mb-16">
          Built With Modern Technologies
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">

          {[
            {
              icon:<FaReact className="text-cyan-400 text-5xl"/>,
              name:"React"
            },
            {
              icon:<FaNodeJs className="text-green-500 text-5xl"/>,
              name:"Node.js"
            },
            {
              icon:<SiExpress className="text-white text-5xl"/>,
              name:"Express"
            },
            {
              icon:<SiTailwindcss className="text-sky-400 text-5xl"/>,
              name:"Tailwind"
            },
            {
              icon:<SiPrisma className="text-cyan-300 text-5xl"/>,
              name:"Prisma"
            },
            {
              icon:<SiPostgresql className="text-blue-400 text-5xl"/>,
              name:"PostgreSQL"
            },
          ].map((tech)=>(

            <div
              key={tech.name}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center hover:border-cyan-500 hover:-translate-y-2 transition"
            >

              {tech.icon}

              <h3 className="mt-6 font-semibold text-lg">
                {tech.name}
              </h3>

            </div>

          ))}

        </div>

      </section>

      {/* CTA */}

      <section className="max-w-7xl mx-auto px-8 pb-24">

        <div className="rounded-[40px] bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 p-16 text-center shadow-2xl">

          <h2 className="text-5xl font-black">
            Ready to Explore DevLens?
          </h2>

          <p className="text-xl mt-6 text-slate-100 max-w-3xl mx-auto leading-9">

            Analyze GitHub developers, compare repositories, discover AI
            insights and build professional developer reports with one click.

          </p>

       

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-slate-800 py-12 text-center">

        <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          DevLens
        </h2>

        <p className="text-slate-500 mt-4">
          AI Powered GitHub Intelligence Platform
        </p>

        <div className="flex justify-center gap-10 mt-8 text-slate-400">

          <span>React</span>

          <span>Node.js</span>

          <span>Express</span>

          <span>Prisma</span>

          <span>PostgreSQL</span>

        </div>

        <p className="mt-8 text-slate-600">
          © 2026 DevLens • Built with ❤️ for Developers
        </p>

      </footer>

    </div>
  );
}