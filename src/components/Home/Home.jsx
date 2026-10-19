import { Link } from "react-router-dom";
import {  ArrowUpRight, Rabbit } from "lucide-react";
import "./Home.css";

const lessons = [
  {
    slug: "wo-ist-mein-hase",
    title: "Wo ist mein Hase?",
    description: "Lerne neue Wörter in dieser Deutschlektion.",
    icon: Rabbit,
    number: "01",
  },
 
];

function Home() {
  return (
    <div className="page-layout">
      <main className="home-main">
      

        <section className="lessons-section">
          <div className="section-heading">
            <div>
              <h2>Die Lektionen</h2>
              <p>Wähle eine Lektion aus und fang an zu lernen.</p>
            </div>

            <span className="lesson-count">
              {lessons.length} Lektion 
            </span>
          </div>

          <div className="lessons-grid">
            {lessons.map((lesson) => {
              const Icon = lesson.icon;

              return (
                <Link
                  to={`/${lesson.slug}`}
                  className="lesson-card"
                  key={lesson.slug}
                >
                  <div className="lesson-card-top">
                    <div className="lesson-icon">
                      <Icon size={26} />
                    </div>

                    <span className="lesson-number">
                      {lesson.number}
                    </span>
                  </div>

                  <h3>{lesson.title}</h3>
                  <p>{lesson.description}</p>

                  <div className="lesson-link">
                    <span>Lektion entdecken</span>
                    <ArrowUpRight size={18} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

   
    </div>
  );
}

export default Home;