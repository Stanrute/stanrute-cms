import React, { useState } from "react";
import style from "./index.module.css";
import Draft from "../Draft/Draft";

function Drafts({ setEditorShown }) {
  const [drafts, setDrafts] = useState([
    {
      title: "What is OTC?",
      id: 1,
    },
    {
      title: "Crypto terminologies",
      id: 2,
    },
  ]);

  return (
    <section className={style.grid}>
      {drafts.map((draft) => (
        <Draft
          key={draft.id}
          title={draft.title}
          setEditorShown={setEditorShown}
        />
      ))}
    </section>
  );
}

export default Drafts;
