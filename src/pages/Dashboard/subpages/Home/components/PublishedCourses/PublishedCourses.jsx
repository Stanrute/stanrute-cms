import React, { useState } from "react";
import style from "./index.module.css";
import PublishedCourse from "../PublishedCourse/PublishedCourse";

function PublishedCourses({ setEditorShown }) {
  const [publishedCourses, setPublishedCourses] = useState([
    {
      title: "Crypto terminologies",
      id: 1,
    },
    {
      title: "Crypto terminologies",
      id: 2,
    },
    {
      title: "Crypto terminologies",
      id: 3,
    },
    {
      title: "Crypto terminologies",
      id: 4,
    },
    {
      title: "Crypto terminologies",
      id: 5,
    },
    {
      title: "Crypto terminologies",
      id: 6,
    },
    {
      title: "Crypto terminologies",
      id: 7,
    },
    {
      title: "Crypto terminologies",
      id: 8,
    },
  ]);

  return (
    <section className={style.grid}>
      {publishedCourses.map((publishedCourse) => (
        <PublishedCourse
          key={publishedCourse.id}
          title={publishedCourse.title}
          setEditorShown={setEditorShown}
        />
      ))}
    </section>
  );
}

export default PublishedCourses;
