import React, { useState } from "react";
import style from "./index.module.css";
import Highlights from "../Highlights/Highlights";
import Objectives from "../Objectives/Objectives";
import { EditorState, convertFromHTML, ContentState } from "draft-js";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import { constants } from "../../../../../../constants";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../../../../../../utils/instances/firebase";

import { createLinkDecorator } from "../EditorLink/EditorLink";

function Editor({ course, setEditorShown, courseToShow }) {
  const [highlights, setHighlights] = useState(
    JSON.parse(courseToShow?.highlights || JSON.stringify([]))
  );
  const [highlightsAreShown, setHighlightsAreShown] = useState(false);
  const [objectives, setObjectives] = useState(
    JSON.parse(courseToShow?.objectives || JSON.stringify([]))
  );
  const [objectivesAreShown, setObjectivesAreShown] = useState(false);
  const [HTMLValue, setHTMLValue] = useState(courseToShow?.HTMLValue || "");
  const [courseTitle, setCourseTitle] = useState(courseToShow?.title || "");
  const [courseCover, setCourseCover] = useState(courseToShow?.image || "");
  const [loading, setLoading] = useState(false);

  const { apiUrl, token } = constants;

  const decorator = createLinkDecorator();

  const previewProps = {
    HTMLValue,
    courseTitle,
    courseCover,
    objectives,
  };

  const [editorState, setEditorState] = useState(() => {
    if (courseToShow) {
      const blocksFromHTML = convertFromHTML(courseToShow.HTMLValue);
      const content = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );

      return EditorState.createWithContent(content, decorator);
    }

    return EditorState.createEmpty();
  });

  const handleChange = (e) => {
    setLoading(true);
    let image = e.currentTarget.files[0];
    let formData = new FormData();
    formData.append("image", image);

    const storageRef = ref(storage, image.name);

    uploadBytes(storageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setCourseCover(url);
        setLoading(false);
      });
    });
  };

  const handleSubmit = (published) => {
    let title = courseTitle;
    let content = HTMLValue;
    let img = courseCover;
    const uploadData = JSON.stringify({
      title,
      content,
      img,
      highlights: JSON.stringify(highlights),
      objectives: JSON.stringify(objectives),
      published,
      id: courseToShow?._id,
    });

    if (!content) return;

    setLoading(true);

    let endpoint = courseToShow ? `${apiUrl}/edit` : `${apiUrl}/add-course`;

    fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token()}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: uploadData,
    })
      .then((res) => res.json())
      .then(() => {
        setEditorShown(false);
      });
  };

  return (
    <div className={style.editor_container}>
      <button
        onClick={() => {
          setEditorShown(false);
        }}
        className={style.close}
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.7329 10.7325C11.2018 10.2638 11.8375 10.0005 12.5004 10.0005C13.1634 10.0005 13.7991 10.2638 14.2679 10.7325L25.0004 21.465L35.7329 10.7325C35.9636 10.4937 36.2394 10.3032 36.5444 10.1722C36.8494 10.0412 37.1775 9.97222 37.5094 9.96933C37.8414 9.96645 38.1706 10.0297 38.4778 10.1554C38.7851 10.2811 39.0642 10.4667 39.2989 10.7015C39.5337 10.9362 39.7193 11.2153 39.845 11.5226C39.9707 11.8298 40.034 12.159 40.0311 12.491C40.0282 12.8229 39.9592 13.151 39.8282 13.456C39.6972 13.761 39.5067 14.0368 39.2679 14.2675L28.5354 25L39.2679 35.7325C39.7233 36.204 39.9753 36.8355 39.9696 37.491C39.9639 38.1465 39.701 38.7735 39.2375 39.237C38.774 39.7005 38.1469 39.9634 37.4914 39.9691C36.836 39.9748 36.2044 39.7229 35.7329 39.2675L25.0004 28.535L14.2679 39.2675C13.7964 39.7229 13.1649 39.9748 12.5094 39.9691C11.8539 39.9634 11.2269 39.7005 10.7634 39.237C10.2999 38.7735 10.037 38.1465 10.0313 37.491C10.0256 36.8355 10.2775 36.204 10.7329 35.7325L21.4654 25L10.7329 14.2675C10.2643 13.7986 10.001 13.1629 10.001 12.5C10.001 11.837 10.2643 11.2013 10.7329 10.7325Z"
            fill="#808080"
          />
        </svg>
      </button>
      <div className={style.inner}>
        <p className={style.title}>{!!course ? "Edit post" : "Make post"}</p>
        <div className={style.options}>
          <label htmlFor="cover">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.1563 24.375H4.84375C3.54932 24.375 2.5 23.3257 2.5 22.0312V7.96875C2.5 6.67432 3.54932 5.625 4.84375 5.625H25.1563C26.4507 5.625 27.5 6.67432 27.5 7.96875V22.0312C27.5 23.3257 26.4507 24.375 25.1563 24.375ZM7.96875 8.35938C6.45859 8.35938 5.23438 9.58359 5.23438 11.0938C5.23438 12.6039 6.45859 13.8281 7.96875 13.8281C9.47891 13.8281 10.7031 12.6039 10.7031 11.0938C10.7031 9.58359 9.47891 8.35938 7.96875 8.35938ZM5.625 21.25H24.375V15.7812L20.1018 11.5081C19.873 11.2792 19.502 11.2792 19.2731 11.5081L12.6563 18.125L9.94556 15.4143C9.71675 15.1855 9.34575 15.1855 9.1169 15.4143L5.625 18.9062V21.25Z"
                fill="#808080"
              />
            </svg>
            Set Cover
          </label>

          <input onChange={handleChange} type="file" name="cover" id="cover" />

          <button
            onClick={() => {
              setHighlightsAreShown((prevValue) => !prevValue);
            }}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.6589 3.86838L10.6075 10.0553L3.78039 11.0506C2.5561 11.2282 2.06544 12.7375 2.95329 13.602L7.89254 18.4151L6.72431 25.2141C6.51403 26.4431 7.80842 27.3637 8.89253 26.7889L15 23.5786L21.1075 26.7889C22.1916 27.359 23.486 26.4431 23.2757 25.2141L22.1075 18.4151L27.0467 13.602C27.9346 12.7375 27.4439 11.2282 26.2196 11.0506L19.3925 10.0553L16.3411 3.86838C15.7944 2.76558 14.2103 2.75156 13.6589 3.86838Z"
                fill="#808080"
              />
            </svg>
            Highlights
          </button>

          <button
            onClick={() => {
              setObjectivesAreShown((prevValue) => !prevValue);
            }}
          >
            <svg
              width="33"
              height="30"
              viewBox="0 0 33 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.2486 4.62473C10.1887 4.5701 10.1175 4.52676 10.0392 4.49719C9.96084 4.46762 9.87685 4.45239 9.79202 4.45239C9.70719 4.45239 9.6232 4.46762 9.54485 4.49719C9.46651 4.52676 9.39536 4.5701 9.33548 4.62473L5.91516 7.71604L4.69592 6.63596C4.63604 6.58134 4.56489 6.538 4.48655 6.50842C4.4082 6.47885 4.32421 6.46363 4.23938 6.46363C4.15455 6.46363 4.07055 6.47885 3.99221 6.50842C3.91386 6.538 3.84271 6.58134 3.78283 6.63596L2.93957 7.40354C2.87948 7.45798 2.83181 7.52266 2.79928 7.59388C2.76675 7.6651 2.75 7.74146 2.75 7.81858C2.75 7.8957 2.76675 7.97206 2.79928 8.04328C2.83181 8.1145 2.87948 8.17919 2.93957 8.23362L5.49568 10.5481C5.62326 10.6583 5.79257 10.7198 5.9686 10.7198C6.14464 10.7198 6.31394 10.6583 6.44153 10.5481L7.27888 9.78538L11.1568 6.26047C11.2776 6.15054 11.3459 6.00174 11.3468 5.84634C11.3477 5.69094 11.2812 5.54148 11.1616 5.43039L10.2486 4.62473ZM10.2486 12.3977C10.1887 12.3431 10.1175 12.2997 10.0392 12.2701C9.96084 12.2406 9.87685 12.2254 9.79202 12.2254C9.70719 12.2254 9.6232 12.2406 9.54485 12.2701C9.46651 12.2997 9.39536 12.3431 9.33548 12.3977L5.91516 15.509L4.69592 14.4299C4.63604 14.3753 4.56489 14.332 4.48655 14.3024C4.4082 14.2728 4.32421 14.2576 4.23938 14.2576C4.15455 14.2576 4.07055 14.2728 3.99221 14.3024C3.91386 14.332 3.84271 14.3753 3.78283 14.4299L2.93957 15.196C2.87948 15.2505 2.83181 15.3152 2.79928 15.3864C2.76675 15.4576 2.75 15.534 2.75 15.6111C2.75 15.6882 2.76675 15.7646 2.79928 15.8358C2.83181 15.907 2.87948 15.9717 2.93957 16.0261L5.48923 18.3455C5.61673 18.4557 5.78594 18.5171 5.96189 18.5171C6.13783 18.5171 6.30705 18.4557 6.43455 18.3455L7.27781 17.5793L11.1557 14.053C11.2761 13.9438 11.3441 13.7958 11.3451 13.6413C11.346 13.4867 11.2797 13.3381 11.1606 13.2278L10.2486 12.3977ZM6.18747 20.8601C4.76467 20.8601 3.57766 21.9099 3.57766 23.2039C3.57766 24.4978 4.76574 25.5476 6.18747 25.5476C6.87124 25.5476 7.52699 25.3007 8.01049 24.8611C8.49398 24.4216 8.7656 23.8255 8.7656 23.2039C8.7656 22.5823 8.49398 21.9861 8.01049 21.5466C7.52699 21.107 6.87124 20.8601 6.18747 20.8601ZM29.3906 21.6414H13.9219C13.6939 21.6414 13.4754 21.7237 13.3142 21.8702C13.153 22.0167 13.0625 22.2154 13.0625 22.4226V23.9851C13.0625 24.1923 13.153 24.391 13.3142 24.5375C13.4754 24.684 13.6939 24.7664 13.9219 24.7664H29.3906C29.6185 24.7664 29.8371 24.684 29.9983 24.5375C30.1595 24.391 30.25 24.1923 30.25 23.9851V22.4226C30.25 22.2154 30.1595 22.0167 29.9983 21.8702C29.8371 21.7237 29.6185 21.6414 29.3906 21.6414ZM29.3906 6.01633H13.9219C13.6939 6.01633 13.4754 6.09864 13.3142 6.24516C13.153 6.39167 13.0625 6.59038 13.0625 6.79758V8.36009C13.0625 8.56729 13.153 8.766 13.3142 8.91251C13.4754 9.05903 13.6939 9.14134 13.9219 9.14134H29.3906C29.6185 9.14134 29.8371 9.05903 29.9983 8.91251C30.1595 8.766 30.25 8.56729 30.25 8.36009V6.79758C30.25 6.59038 30.1595 6.39167 29.9983 6.24516C29.8371 6.09864 29.6185 6.01633 29.3906 6.01633ZM29.3906 13.8288H13.9219C13.6939 13.8288 13.4754 13.9112 13.3142 14.0577C13.153 14.2042 13.0625 14.4029 13.0625 14.6101V16.1726C13.0625 16.3798 13.153 16.5785 13.3142 16.725C13.4754 16.8715 13.6939 16.9538 13.9219 16.9538H29.3906C29.6185 16.9538 29.8371 16.8715 29.9983 16.725C30.1595 16.5785 30.25 16.3798 30.25 16.1726V14.6101C30.25 14.4029 30.1595 14.2042 29.9983 14.0577C29.8371 13.9112 29.6185 13.8288 29.3906 13.8288Z"
                fill="#808080"
              />
            </svg>
            Add objectives
          </button>
        </div>
        <input
          type={"text"}
          placeholder="Course title"
          value={courseTitle}
          className={style.course_title}
          autoFocus
          onChange={(e) => {
            setCourseTitle(e.currentTarget.value);
          }}
        />
        {highlightsAreShown && (
          <Highlights highlights={highlights} setHighlights={setHighlights} />
        )}

        {objectivesAreShown ? (
          <Objectives
            objectives={objectives}
            setObjectives={setObjectives}
            setObjectivesAreShown={setObjectivesAreShown}
          />
        ) : (
          <RichTextEditor
            editorState={editorState}
            setEditorState={setEditorState}
            setHTMLValue={setHTMLValue}
            loading={loading}
            setLoading={setLoading}
            previewProps={previewProps}
          />
        )}
        <div className={style.btn_group}>
          <button
            onClick={() => {
              handleSubmit(true);
            }}
          >
            Publish
          </button>
          <button
            onClick={() => {
              handleSubmit(false);
            }}
          >
            Add to draft
          </button>
        </div>
      </div>
    </div>
  );
}

export default Editor;
