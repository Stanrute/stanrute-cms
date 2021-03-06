import React, { useState } from "react";
import style from "./index.module.css";
import { Input } from "../../../../components";

function Password({ onChange, error, showParagraph }) {
  const [isPasswordType, setIsPasswordType] = useState(true);
  return (
    <div>
      <div className={style.password}>
        <Input
          type={isPasswordType ? "password" : "text"}
          required={true}
          name="password"
          onChange={onChange}
          error={error}
        />
        <span
          onClick={() => {
            setIsPasswordType((prevValue) => !prevValue);
          }}
        >
          {isPasswordType ? (
            <svg
              className={style.toggle}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 12C10.5304 12 11.0391 11.7893 11.4142 11.4142C11.7893 11.0391 12 10.5304 12 10C12 9.46957 11.7893 8.96086 11.4142 8.58579C11.0391 8.21071 10.5304 8 10 8C9.46957 8 8.96086 8.21071 8.58579 8.58579C8.21071 8.96086 8 9.46957 8 10C8 10.5304 8.21071 11.0391 8.58579 11.4142C8.96086 11.7893 9.46957 12 10 12Z"
                fill="#9B9B9B"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.458008 10C1.73201 5.943 5.52201 3 10 3C14.478 3 18.268 5.943 19.542 10C18.268 14.057 14.478 17 10 17C5.52201 17 1.73201 14.057 0.458008 10ZM14 10C14 11.0609 13.5786 12.0783 12.8284 12.8284C12.0783 13.5786 11.0609 14 10 14C8.93914 14 7.92173 13.5786 7.17158 12.8284C6.42143 12.0783 6.00001 11.0609 6.00001 10C6.00001 8.93913 6.42143 7.92172 7.17158 7.17157C7.92173 6.42143 8.93914 6 10 6C11.0609 6 12.0783 6.42143 12.8284 7.17157C13.5786 7.92172 14 8.93913 14 10Z"
                fill="#9B9B9B"
              />
            </svg>
          ) : (
            <svg
              className={style.toggle}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.70704 2.29298C3.51844 2.11082 3.26584 2.01003 3.00364 2.01231C2.74144 2.01458 2.49063 2.11975 2.30522 2.30516C2.11981 2.49057 2.01465 2.74138 2.01237 3.00358C2.01009 3.26578 2.11088 3.51838 2.29304 3.70698L16.293 17.707C16.4816 17.8891 16.7342 17.9899 16.9964 17.9877C17.2586 17.9854 17.5095 17.8802 17.6949 17.6948C17.8803 17.5094 17.9854 17.2586 17.9877 16.9964C17.99 16.7342 17.8892 16.4816 17.707 16.293L16.234 14.82C17.7916 13.5781 18.9433 11.8999 19.542 9.99998C18.268 5.94298 14.478 2.99998 10 2.99998C8.43247 2.99785 6.88654 3.36583 5.48804 4.07398L3.70804 2.29298H3.70704ZM7.96804 6.55298L9.48204 8.06798C9.82113 7.97793 10.1779 7.97853 10.5167 8.06971C10.8555 8.16089 11.1644 8.33946 11.4125 8.58755C11.6606 8.83563 11.8391 9.14452 11.9303 9.48331C12.0215 9.8221 12.0221 10.1789 11.932 10.518L13.446 12.032C13.897 11.268 14.0812 10.3758 13.9697 9.49566C13.8581 8.61554 13.4572 7.79747 12.8299 7.17016C12.2025 6.54284 11.3845 6.14187 10.5044 6.03033C9.62425 5.91878 8.73202 6.10299 7.96804 6.55398V6.55298Z"
                fill="#9B9B9B"
              />
              <path
                d="M12.454 16.697L9.75001 13.992C8.77769 13.9311 7.86103 13.5174 7.17206 12.8286C6.4831 12.1398 6.06918 11.2233 6.00801 10.251L2.33501 6.578C1.49022 7.58402 0.852357 8.74692 0.458008 10C1.73201 14.057 5.52301 17 10 17C10.847 17 11.669 16.895 12.454 16.697Z"
                fill="#9B9B9B"
              />
            </svg>
          )}
        </span>
      </div>
      {showParagraph && error && (
        <p className={"error"}>*Credentials invalid</p>
      )}
    </div>
  );
}

export default Password;
