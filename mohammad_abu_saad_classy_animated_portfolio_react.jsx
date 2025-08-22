import React, { useEffect, useMemo, useState } from "react";

// ------------------------------------------------------------------
// MOHAMMAD ABU SAAD — Classy Animated Portfolio (GitHub Pages preview)
// Fix for error `Unexpected token (1:0)`: previously the file contained
// full HTML starting with `<!DOCTYPE html>` while the canvas expects a
// React component. This rewrite provides a pure React component that
// renders the same portfolio content and adds lightweight self-tests.
// ------------------------------------------------------------------

// ---- Content (easy to edit) ----
const profile = {
  name: "MOHAMMAD ABU SAAD",
  role: "Civil Engineering Professional",
  location: "Dhaka, Bangladesh",
  about:
    "Hello, I'm MOHAMMAD ABU SAAD. I am a dedicated and result-oriented professional with strong expertise in Civil Engineering. I'm passionate about continuous learning, problem-solving, and building impactful connections that drive growth and success.",
  contacts: {
    phone: "0133311535",
    email: "saadfaiyaz007@gmail.com",
    linkedin: "https://www.linkedin.com/in/mohammad-abu-saad-a7b68a378",
  },
  skills: {
    technical: ["AutoCAD", "ETABS", "MS Word", "MS Excel", "Surveying Tools"],
    soft: [
      "Content Writing",
      "Literature Searching",
      "Presentation",
      "Slide Content Preparation",
    ],
  },
  project: {
    title: "Utilization of Waste Glass as Mineral Admixture in Concrete",
    summary:
      "Investigated the feasibility and performance impact of incorporating waste glass powder as a mineral admixture to enhance sustainability and mechanical properties of concrete mixes.",
    highlights: [
      "Designed experimental mix proportions and testing matrix",
      "Performed compressive strength & workability assessments",
      "Documented methodology, data, and conclusions for academic submission",
    ],
  },
  education: [
    {
      title: "Bachelor of Science in Civil Engineering",
      org: "Ahsanullah University of Science and Technology (AUST)",
      meta: "CGPA: 2.958 | 2025",
    },
    {
      title: "Higher Secondary Certificate (HSC), Science",
      org: "BAF Shaheen College, Tejgaon, Dhaka, Bangladesh",
      meta: "GPA: 5.00 | 2020",
    },
    {
      title: "Secondary School Certificate (SSC), Science",
      org: "BAF Shaheen College, Tejgaon, Dhaka, Bangladesh",
      meta: "GPA: 5.00 | 2018",
    },
  ],
  hobbies: ["Reading", "Tourism", "Gardening", "Sports"],
};

// ---- Helpers ----
function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-semibold mb-6">{title}</h2>
      {children}
    </section>
  );
}

function Chip({ children }) {
  return (
    <span className="px-3 py-1 rounded-full border bg-white/70 text-sm mr-2 mb-2 inline-block">
      {children}
    </span>
  );
}

// ---- Minimal smooth scroll (no external libs) ----
function useSmoothNav() {
  const onNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return onNavClick;
}

// ---- Tiny in-app smoke tests (since there were none) ----
function useSmokeTests() {
  const [results, setResults] = useState([]);
  useEffect(() => {
    const tests = [
      {
        name: "#about section exists",
        run: () => !!document.getElementById("about"),
      },
      {
        name: "#skills section exists",
        run: () => !!document.getElementById("skills"),
      },
      {
        name: "#project section exists",
        run: () => !!document.getElementById("project"),
      },
      {
        name: "#education section exists",
        run: () => !!document.getElementById("education"),
      },
      {
        name: "#hobbies section exists",
        run: () => !!document.getElementById("hobbies"),
      },
      {
        name: "#contact section exists",
        run: () => !!document.getElementById("contact"),
      },
      {
        name: "Email link is correct",
        run: () => {
          const a = document.querySelector('a[href^="mailto:"]');
          return a && a.getAttribute("href") === `mailto:${profile.contacts.email}`;
        },
      },
      {
        name: "LinkedIn link is correct",
        run: () => {
          const a = document.querySelector('a[href^="https://www.linkedin.com/"]');
          return a && a.getAttribute("href") === profile.contacts.linkedin;
        },
      },
    ];
    const r = tests.map((t) => ({ name: t.name, pass: !!t.run() }));
    setResults(r);
    // Also log to console for developers
    // eslint-disable-next-line no-console
    console.table(r);
  }, []);
  const summary = useMemo(() => {
    const pass = results.filter((x) => x.pass).length;
    const fail = results.length - pass;
    return { pass, fail, results };
  }, [results]);
  return summary;
}

// ---- Main Component ----
export default function PortfolioMAS() {
  const onNavClick = useSmoothNav();
  const tests = useSmokeTests();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="font-semibold tracking-tight">{profile.name}</div>
            <nav className="hidden md:flex items-center gap-3">
              {[
                ["About", "about"],
                ["Skills", "skills"],
                ["Project", "project"],
                ["Education", "education"],
                ["Hobbies", "hobbies"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="rounded-2xl px-3 py-2 hover:bg-slate-200"
                  onClick={(e) => onNavClick(e, id)}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* About */}
      <Section id="about" title="About">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          {profile.name}
        </h1>
        <p className="mt-2 text-lg text-slate-600">
          {profile.role} — {profile.location}
        </p>
        <p className="mt-5 text-slate-700 leading-relaxed max-w-2xl">
          {profile.about}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#project"
            className="px-5 py-2 rounded-2xl bg-slate-800 text-white"
            onClick={(e) => onNavClick(e, "project")}
          >
            View Project
          </a>
          <a
            href={`mailto:${profile.contacts.email}`}
            className="px-5 py-2 rounded-2xl border"
          >
            Email Me
          </a>
          <a
            href={profile.contacts.linkedin}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 rounded-2xl bg-blue-600 text-white"
          >
            LinkedIn
          </a>
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl border bg-white/70">
            <h3 className="font-semibold mb-3">Technical Software</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.technical.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </div>
          <div className="p-6 rounded-3xl border bg-white/70">
            <h3 className="font-semibold mb-3">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.soft.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Project */}
      <Section id="project" title="Featured Project">
        <div className="p-6 rounded-3xl shadow-xl bg-white/80">
          <h3 className="text-xl font-semibold">{profile.project.title}</h3>
          <p className="mt-3 text-slate-700">{profile.project.summary}</p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-slate-700">
            {profile.project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Education */}
      <Section id="education" title="Education">
        <div className="space-y-4">
          {profile.education.map((e, i) => (
            <div key={i} className="p-6 rounded-3xl border bg-white/70">
              <h3 className="font-semibold">{e.title}</h3>
              <p>{e.org}</p>
              <span className="text-sm text-slate-600">{e.meta}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Hobbies */}
      <Section id="hobbies" title="Hobbies & Interests">
        <div className="flex flex-wrap gap-2">
          {profile.hobbies.map((h) => (
            <Chip key={h}>{h}</Chip>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact">
        <div className="grid md:grid-cols-3 gap-4">
          <a
            href={`tel:${profile.contacts.phone}`}
            className="px-5 py-3 rounded-2xl bg-slate-800 text-white text-center"
          >
            Call
          </a>
          <a
            href={`mailto:${profile.contacts.email}`}
            className="px-5 py-3 rounded-2xl border text-center"
          >
            Email
          </a>
          <a
            href={profile.contacts.linkedin}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-2xl bg-blue-600 text-white text-center"
          >
            LinkedIn
          </a>
        </div>
      </Section>

      {/* Footer + Self-test results */}
      <footer className="py-10 text-center text-sm text-slate-500">
        <div>© {new Date().getFullYear()} {profile.name}. All rights reserved.</div>
        <div className="mt-4 inline-block rounded-2xl border px-3 py-2 bg-white/70">
          <strong>Self‑Check:</strong> {tests.pass} passed, {tests.fail} failed
        </div>
      </footer>
    </div>
  );
}

// ------------------------------------------------------------------
// NOTE FOR GITHUB PAGES EXPORT
// To publish this on GitHub Pages as a single file without React tooling,
// create an `index.html` with the same content structure as rendered here
// (I can generate a downloadable ZIP on request). Keeping this as a React
// component fixes the canvas error and makes it previewable here.
// ------------------------------------------------------------------
