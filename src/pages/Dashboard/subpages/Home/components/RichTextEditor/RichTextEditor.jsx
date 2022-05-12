import React, { useState, useEffect } from "react";
import { Editor, RichUtils, getDefaultKeyBinding } from "draft-js";
import style from "./index.module.css";
import { stateToHTML } from "draft-js-export-html";
import ControlButton from "../ControlButton/ControlButton";
import "draft-js/dist/Draft.css";
import Image from "../Image/Image";

function RichTextEditor({ editorState, setEditorState, setHTMLValue }) {
  const [controls, _] = useState([
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.91341 17V15.938L4.79541 15.812C5.02341 15.764 5.17341 15.686 5.24541 15.578C5.31741 15.458 5.35341 15.224 5.35341 14.876V6.398C5.35341 6.086 5.31141 5.876 5.22741 5.768C5.15541 5.648 4.99941 5.57 4.75941 5.534L3.91341 5.408V4.346H9.29541V5.408L8.41341 5.552C8.19741 5.588 8.05341 5.666 7.98141 5.786C7.90941 5.906 7.87341 6.134 7.87341 6.47V9.836H13.1474V6.398C13.1474 6.098 13.1054 5.894 13.0214 5.786C12.9494 5.666 12.7934 5.588 12.5534 5.552L11.7254 5.408V4.346H17.0894V5.408L16.2074 5.534C15.9914 5.57 15.8414 5.648 15.7574 5.768C15.6854 5.888 15.6494 6.116 15.6494 6.452V14.948C15.6494 15.26 15.6914 15.47 15.7754 15.578C15.8594 15.686 16.0154 15.764 16.2434 15.812L17.0894 15.938V17H11.7254V15.938L12.5894 15.812C12.8054 15.764 12.9494 15.686 13.0214 15.578C13.1054 15.458 13.1474 15.224 13.1474 14.876V11.24H7.87341V14.948C7.87341 15.26 7.90941 15.47 7.98141 15.578C8.06541 15.686 8.22141 15.764 8.44941 15.812L9.29541 15.938V17H3.91341Z"
            fill="#66FFBE"
          />
        </svg>
      ),
      isBlock: true,
      style: "header-one",
    },
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.87239 17V15.938L5.75439 15.812C5.98239 15.764 6.13239 15.686 6.20439 15.578C6.27639 15.458 6.31239 15.224 6.31239 14.876V6.38C6.31239 6.08 6.27039 5.876 6.18639 5.768C6.11439 5.648 5.95839 5.57 5.71839 5.534L4.87239 5.408V4.346H9.98439C11.1004 4.346 12.0004 4.46 12.6844 4.688C13.3804 4.916 13.8904 5.252 14.2144 5.696C14.5504 6.128 14.7184 6.668 14.7184 7.316C14.7184 7.808 14.6044 8.252 14.3764 8.648C14.1484 9.032 13.8364 9.362 13.4404 9.638C13.0444 9.902 12.6004 10.094 12.1084 10.214V10.304C13.1644 10.412 13.9804 10.724 14.5564 11.24C15.1444 11.744 15.4384 12.452 15.4384 13.364C15.4384 14.132 15.2344 14.786 14.8264 15.326C14.4304 15.866 13.8424 16.28 13.0624 16.568C12.2824 16.856 11.3224 17 10.1824 17H4.87239ZM9.94839 15.758C10.5724 15.758 11.0884 15.668 11.4964 15.488C11.9164 15.296 12.2344 15.02 12.4504 14.66C12.6664 14.288 12.7744 13.832 12.7744 13.292C12.7744 12.764 12.6664 12.338 12.4504 12.014C12.2344 11.678 11.9164 11.432 11.4964 11.276C11.0884 11.108 10.5844 11.024 9.98439 11.024C9.49239 11.024 9.10839 11.048 8.83239 11.096V15.668C8.96439 15.704 9.12639 15.728 9.31839 15.74C9.51039 15.752 9.72039 15.758 9.94839 15.758ZM9.69639 9.872C10.2124 9.872 10.6444 9.782 10.9924 9.602C11.3524 9.422 11.6284 9.158 11.8204 8.81C12.0244 8.462 12.1264 8.042 12.1264 7.55C12.1264 7.082 12.0424 6.704 11.8744 6.416C11.7184 6.116 11.4664 5.9 11.1184 5.768C10.7704 5.624 10.3084 5.552 9.73239 5.552H8.83239V9.836C8.94039 9.848 9.06039 9.86 9.19239 9.872C9.33639 9.872 9.50439 9.872 9.69639 9.872Z"
            fill="#66FFBE"
          />
        </svg>
      ),
      isBlock: false,
      style: "BOLD",
    },
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.25423 17V15.938L8.19023 15.812C8.41823 15.764 8.56823 15.68 8.64023 15.56C8.71223 15.44 8.74823 15.218 8.74823 14.894V6.398C8.74823 6.086 8.70623 5.876 8.62223 5.768C8.55023 5.648 8.38823 5.57 8.13623 5.534L7.25423 5.408V4.346H12.7442V5.408L11.8082 5.552C11.5922 5.576 11.4482 5.654 11.3762 5.786C11.3042 5.906 11.2682 6.134 11.2682 6.47V14.948C11.2682 15.26 11.3042 15.47 11.3762 15.578C11.4482 15.686 11.6042 15.764 11.8442 15.812L12.7442 15.938V17H7.25423Z"
            fill="#66FFBE"
          />
        </svg>
      ),

      isBlock: false,
      style: "ITALIC",
    },
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.7712 9.99998H14.167V7.91665C14.167 6.76756 15.1012 5.83331 16.2503 5.83331H16.5107C16.9437 5.83331 17.292 5.48501 17.292 5.05206V3.48956C17.292 3.05662 16.9437 2.70831 16.5107 2.70831H16.2503C13.3727 2.70831 11.042 5.03904 11.042 7.91665V15.7291C11.042 16.5918 11.7419 17.2916 12.6045 17.2916H16.7712C17.6338 17.2916 18.3337 16.5918 18.3337 15.7291V11.5625C18.3337 10.6998 17.6338 9.99998 16.7712 9.99998ZM7.39616 9.99998H4.79199V7.91665C4.79199 6.76756 5.72624 5.83331 6.87533 5.83331H7.13574C7.56869 5.83331 7.91699 5.48501 7.91699 5.05206V3.48956C7.91699 3.05662 7.56869 2.70831 7.13574 2.70831H6.87533C3.99772 2.70831 1.66699 5.03904 1.66699 7.91665V15.7291C1.66699 16.5918 2.36686 17.2916 3.22949 17.2916H7.39616C8.25879 17.2916 8.95866 16.5918 8.95866 15.7291V11.5625C8.95866 10.6998 8.25879 9.99998 7.39616 9.99998Z"
            fill="#66FFBE"
          />
        </svg>
      ),

      isBlock: true,
      style: "blockquote",
    },
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.2989 7.70155C14.2438 9.64846 14.2171 12.7698 12.3106 14.6869C12.307 14.6908 12.3028 14.695 12.2989 14.6989L10.1114 16.8864C8.18203 18.8158 5.04308 18.8155 3.11401 16.8864C1.18465 14.9574 1.18465 11.8181 3.11401 9.88905L4.32189 8.68117C4.6422 8.36086 5.19382 8.57375 5.21036 9.02642C5.23145 9.60331 5.33491 10.1829 5.52579 10.7426C5.59044 10.9321 5.54425 11.1417 5.40265 11.2833L4.97664 11.7094C4.06433 12.6217 4.03572 14.1071 4.93904 15.0284C5.85128 15.9587 7.35069 15.9642 8.26993 15.045L10.4574 12.8578C11.3751 11.9401 11.3713 10.4569 10.4574 9.54302C10.3369 9.42277 10.2156 9.32935 10.1208 9.26408C10.0537 9.21803 9.99837 9.15695 9.95911 9.0857C9.91985 9.01446 9.89778 8.93502 9.89466 8.85373C9.88177 8.50976 10.0036 8.1553 10.2755 7.88349L10.9608 7.1981C11.1405 7.01838 11.4225 6.99631 11.6309 7.14176C11.8695 7.30841 12.0931 7.49573 12.2989 7.70155V7.70155ZM16.8866 3.11361C14.9575 1.18451 11.8186 1.18425 9.88923 3.11361L7.70173 5.3011C7.69782 5.30501 7.69359 5.30924 7.69001 5.31315C5.78357 7.2302 5.75684 10.3516 7.70173 12.2985C7.90755 12.5043 8.13108 12.6916 8.36973 12.8582C8.57813 13.0037 8.86009 12.9816 9.03978 12.8019L9.72513 12.1165C9.99694 11.8447 10.1188 11.4903 10.1059 11.1463C10.1028 11.065 10.0807 10.9855 10.0415 10.9143C10.0022 10.8431 9.94685 10.782 9.87979 10.7359C9.78499 10.6707 9.66364 10.5772 9.54317 10.457C8.62933 9.54315 8.62549 8.05989 9.54317 7.14221L11.7307 4.95504C12.6499 4.03581 14.1493 4.04134 15.0615 4.97164C15.9649 5.89287 15.9363 7.37835 15.0239 8.29065L14.5979 8.71666C14.4563 8.85826 14.4101 9.06789 14.4748 9.25741C14.6657 9.81711 14.7691 10.3967 14.7902 10.9736C14.8068 11.4263 15.3584 11.6391 15.6787 11.3188L16.8866 10.111C18.816 8.18196 18.816 5.04264 16.8866 3.11361V3.11361Z"
            fill="#66FFBE"
          />
        </svg>
      ),

      isBlock: false,
      style: "LINK",
    },
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.22949 3.22919C2.92046 3.22919 2.61837 3.32083 2.36141 3.49252C2.10446 3.66421 1.90419 3.90823 1.78593 4.19374C1.66767 4.47925 1.63673 4.79342 1.69702 5.09652C1.75731 5.39961 1.90612 5.67802 2.12464 5.89654C2.34316 6.11506 2.62157 6.26388 2.92466 6.32416C3.22776 6.38445 3.54193 6.35351 3.82744 6.23525C4.11295 6.11699 4.35697 5.91672 4.52866 5.65977C4.70035 5.40281 4.79199 5.10072 4.79199 4.79169C4.79199 4.37729 4.62737 3.97986 4.33435 3.68683C4.04132 3.39381 3.64389 3.22919 3.22949 3.22919ZM3.22949 8.43752C2.92046 8.43752 2.61837 8.52916 2.36141 8.70085C2.10446 8.87254 1.90419 9.11657 1.78593 9.40208C1.66767 9.68759 1.63673 10.0018 1.69702 10.3049C1.75731 10.6079 1.90612 10.8864 2.12464 11.1049C2.34316 11.3234 2.62157 11.4722 2.92466 11.5325C3.22776 11.5928 3.54193 11.5618 3.82744 11.4436C4.11295 11.3253 4.35697 11.1251 4.52866 10.8681C4.70035 10.6111 4.79199 10.3091 4.79199 10C4.79199 9.58562 4.62737 9.18819 4.33435 8.89517C4.04132 8.60214 3.64389 8.43752 3.22949 8.43752ZM3.22949 13.6459C2.92046 13.6459 2.61837 13.7375 2.36141 13.9092C2.10446 14.0809 1.90419 14.3249 1.78593 14.6104C1.66767 14.8959 1.63673 15.2101 1.69702 15.5132C1.75731 15.8163 1.90612 16.0947 2.12464 16.3132C2.34316 16.5317 2.62157 16.6805 2.92466 16.7408C3.22776 16.8011 3.54193 16.7702 3.82744 16.6519C4.11295 16.5337 4.35697 16.3334 4.52866 16.0764C4.70035 15.8195 4.79199 15.5174 4.79199 15.2084C4.79199 14.794 4.62737 14.3965 4.33435 14.1035C4.04132 13.8105 3.64389 13.6459 3.22949 13.6459ZM17.8128 14.1667H7.39616C7.25803 14.1667 7.12555 14.2216 7.02788 14.3192C6.9302 14.4169 6.87533 14.5494 6.87533 14.6875V15.7292C6.87533 15.8673 6.9302 15.9998 7.02788 16.0975C7.12555 16.1951 7.25803 16.25 7.39616 16.25H17.8128C17.951 16.25 18.0834 16.1951 18.1811 16.0975C18.2788 15.9998 18.3337 15.8673 18.3337 15.7292V14.6875C18.3337 14.5494 18.2788 14.4169 18.1811 14.3192C18.0834 14.2216 17.951 14.1667 17.8128 14.1667ZM17.8128 3.75002H7.39616C7.25803 3.75002 7.12555 3.80489 7.02788 3.90257C6.9302 4.00024 6.87533 4.13272 6.87533 4.27085V5.31252C6.87533 5.45065 6.9302 5.58313 7.02788 5.68081C7.12555 5.77848 7.25803 5.83335 7.39616 5.83335H17.8128C17.951 5.83335 18.0834 5.77848 18.1811 5.68081C18.2788 5.58313 18.3337 5.45065 18.3337 5.31252V4.27085C18.3337 4.13272 18.2788 4.00024 18.1811 3.90257C18.0834 3.80489 17.951 3.75002 17.8128 3.75002V3.75002ZM17.8128 8.95835H7.39616C7.25803 8.95835 7.12555 9.01323 7.02788 9.1109C6.9302 9.20858 6.87533 9.34105 6.87533 9.47919V10.5209C6.87533 10.659 6.9302 10.7915 7.02788 10.8891C7.12555 10.9868 7.25803 11.0417 7.39616 11.0417H17.8128C17.951 11.0417 18.0834 10.9868 18.1811 10.8891C18.2788 10.7915 18.3337 10.659 18.3337 10.5209V9.47919C18.3337 9.34105 18.2788 9.20858 18.1811 9.1109C18.0834 9.01323 17.951 8.95835 17.8128 8.95835Z"
            fill="#66FFBE"
          />
        </svg>
      ),

      isBlock: true,
      style: "unordered-list-item",
    },
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.67773 14.72L4.2474 14.0641C4.36077 13.9377 4.42003 13.7718 4.41244 13.6022V13.4944C4.41244 13.2552 4.28744 13.125 4.04329 13.125H2.18783C2.11876 13.125 2.05252 13.1524 2.00368 13.2013C1.95485 13.2501 1.92741 13.3163 1.92741 13.3854V13.9062C1.92741 13.9753 1.95485 14.0415 2.00368 14.0904C2.05252 14.1392 2.11876 14.1666 2.18783 14.1666H2.93099C2.80471 14.2939 2.68518 14.4276 2.57292 14.5674L2.3903 14.7952C2.26009 14.9603 2.2194 15.125 2.29915 15.2796L2.33333 15.3424C2.43099 15.5299 2.53809 15.5989 2.7321 15.5989H2.88607C3.22233 15.5989 3.40495 15.6784 3.40495 15.8948C3.40495 16.0485 3.26823 16.1624 2.9375 16.1624C2.76469 16.161 2.59375 16.1266 2.43392 16.0608C2.22266 15.9345 2.05176 15.9469 1.92611 16.1624L1.74414 16.4655C1.62305 16.665 1.6403 16.847 1.82975 16.9844C2.08073 17.137 2.49316 17.2916 3.03418 17.2916C4.14616 17.2916 4.61296 16.5511 4.61296 15.8554C4.61198 15.3873 4.31608 14.8867 3.67773 14.72ZM17.8128 8.95831H7.39616C7.25803 8.95831 7.12555 9.01318 7.02788 9.11086C6.9302 9.20854 6.87533 9.34101 6.87533 9.47914V10.5208C6.87533 10.6589 6.9302 10.7914 7.02788 10.8891C7.12555 10.9868 7.25803 11.0416 7.39616 11.0416H17.8128C17.951 11.0416 18.0834 10.9868 18.1811 10.8891C18.2788 10.7914 18.3337 10.6589 18.3337 10.5208V9.47914C18.3337 9.34101 18.2788 9.20854 18.1811 9.11086C18.0834 9.01318 17.951 8.95831 17.8128 8.95831ZM17.8128 3.74998H7.39616C7.25803 3.74998 7.12555 3.80485 7.02788 3.90253C6.9302 4.0002 6.87533 4.13268 6.87533 4.27081V5.31248C6.87533 5.45061 6.9302 5.58309 7.02788 5.68076C7.12555 5.77844 7.25803 5.83331 7.39616 5.83331H17.8128C17.951 5.83331 18.0834 5.77844 18.1811 5.68076C18.2788 5.58309 18.3337 5.45061 18.3337 5.31248V4.27081C18.3337 4.13268 18.2788 4.0002 18.1811 3.90253C18.0834 3.80485 17.951 3.74998 17.8128 3.74998ZM17.8128 14.1666H7.39616C7.25803 14.1666 7.12555 14.2215 7.02788 14.3192C6.9302 14.4169 6.87533 14.5493 6.87533 14.6875V15.7291C6.87533 15.8673 6.9302 15.9998 7.02788 16.0974C7.12555 16.1951 7.25803 16.25 7.39616 16.25H17.8128C17.951 16.25 18.0834 16.1951 18.1811 16.0974C18.2788 15.9998 18.3337 15.8673 18.3337 15.7291V14.6875C18.3337 14.5493 18.2788 14.4169 18.1811 14.3192C18.0834 14.2215 17.951 14.1666 17.8128 14.1666ZM2.18783 6.87498H4.27116C4.34023 6.87498 4.40646 6.84754 4.4553 6.7987C4.50414 6.74987 4.53158 6.68363 4.53158 6.61456V6.09373C4.53158 6.02466 4.50414 5.95842 4.4553 5.90959C4.40646 5.86075 4.34023 5.83331 4.27116 5.83331H3.75033V2.96873C3.75033 2.89966 3.72289 2.83342 3.67405 2.78459C3.62521 2.73575 3.55898 2.70831 3.48991 2.70831H2.70866C2.66039 2.7084 2.61309 2.7219 2.57205 2.74731C2.53101 2.77271 2.49784 2.80903 2.47624 2.85219L2.21582 3.37303C2.19597 3.41269 2.18658 3.45678 2.18855 3.50109C2.19051 3.5454 2.20376 3.58848 2.22704 3.62624C2.25032 3.664 2.28286 3.69518 2.32157 3.71684C2.36028 3.73849 2.40388 3.7499 2.44824 3.74998H2.70866V5.83331H2.18783C2.11876 5.83331 2.05252 5.86075 2.00368 5.90959C1.95485 5.95842 1.92741 6.02466 1.92741 6.09373V6.61456C1.92741 6.68363 1.95485 6.74987 2.00368 6.7987C2.05252 6.84754 2.11876 6.87498 2.18783 6.87498ZM2.06055 12.0833H4.27116C4.34023 12.0833 4.40646 12.0559 4.4553 12.007C4.50414 11.9582 4.53158 11.892 4.53158 11.8229V11.3021C4.53158 11.233 4.50414 11.1668 4.4553 11.1179C4.40646 11.0691 4.34023 11.0416 4.27116 11.0416H3.01204C3.11914 10.7067 4.58561 10.4336 4.58561 9.2044C4.58561 8.25844 3.77181 7.91665 3.13802 7.91665C2.44271 7.91665 2.03776 8.24217 1.82096 8.527C1.67871 8.70896 1.72331 8.87986 1.91211 9.02732L2.19141 9.25128C2.37402 9.39972 2.54948 9.33168 2.71615 9.17185C2.79836 9.0913 2.909 9.04639 3.02409 9.04685C3.13249 9.04685 3.32617 9.09763 3.32617 9.33168C3.32715 9.74575 1.66699 10.0426 1.66699 11.5817V11.7119C1.66699 11.9531 1.83236 12.0833 2.06055 12.0833Z"
            fill="#66FFBE"
          />
        </svg>
      ),

      isBlock: true,
      style: "ordered-list-item",
    },

    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.3337 6.35415V15.7291C18.3337 16.5918 17.6338 17.2916 16.7712 17.2916H3.22949C2.36686 17.2916 1.66699 16.5918 1.66699 15.7291V6.35415C1.66699 5.49152 2.36686 4.79165 3.22949 4.79165H6.09408L6.49447 3.72068C6.72233 3.11196 7.30501 2.70831 7.95606 2.70831H12.0413C12.6924 2.70831 13.2751 3.11196 13.5029 3.72068L13.9066 4.79165H16.7712C17.6338 4.79165 18.3337 5.49152 18.3337 6.35415ZM13.9066 11.0416C13.9066 8.8867 12.1553 7.1354 10.0003 7.1354C7.84538 7.1354 6.09408 8.8867 6.09408 11.0416C6.09408 13.1966 7.84538 14.9479 10.0003 14.9479C12.1553 14.9479 13.9066 13.1966 13.9066 11.0416ZM12.8649 11.0416C12.8649 12.6204 11.5791 13.9062 10.0003 13.9062C8.42155 13.9062 7.13574 12.6204 7.13574 11.0416C7.13574 9.46287 8.42155 8.17706 10.0003 8.17706C11.5791 8.17706 12.8649 9.46287 12.8649 11.0416Z"
            fill="#66FFBE"
          />
        </svg>
      ),
      isBlock: false,
      style: "IMAGE",
    },
  ]);

  const [placeholderIsHidden, setPlaceholderIsHidden] = useState(false);

  useEffect(() => {
    let contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      let styleType = contentState.getBlockMap().first().getType();
      if (
        styleType === "unordered-list-item" ||
        styleType === "ordered-list-item"
      ) {
        setPlaceholderIsHidden(true);
      } else {
        setPlaceholderIsHidden(false);
      }
    }
  }, [editorState]);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      setHTMLValue(stateToHTML(newState.getCurrentContent()));
      return true;
    }
    return false;
  };

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
        setHTMLValue(stateToHTML(newEditorState.getCurrentContent()));
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  const mediaBlockRenderer = (block) => {
    if (block.getType() === "atomic") {
      return {
        component: Image,
        editable: false,
      };
    }

    return null;
  };

  return (
    <div
      className={`${style.editor} ${
        placeholderIsHidden ? style.no_placeholder : ""
      }`}
    >
      <div className={style.toolbar}>
        <p className={style.write}>
          <svg
            width="28"
            height="25"
            viewBox="0 0 28 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.8259 7.86256L22.7416 9.73844C22.5291 9.9297 22.1855 9.9297 21.973 9.73844L16.9543 5.22166C16.7418 5.03041 16.7418 4.72115 16.9543 4.5299L19.0387 2.65401C19.8841 1.89308 21.2586 1.89308 22.1086 2.65401L24.8259 5.09959C25.6759 5.86052 25.6759 7.09755 24.8259 7.86256ZM15.1639 6.1413L3.29096 16.8269L2.33244 21.771C2.20133 22.4383 2.84787 23.0162 3.58937 22.9022L9.08275 22.0355L20.9557 11.3498C21.1682 11.1586 21.1682 10.8493 20.9557 10.6581L15.937 6.1413C15.72 5.95004 15.3764 5.95004 15.1639 6.1413V6.1413ZM7.9253 15.9114C7.67662 15.6876 7.67662 15.3295 7.9253 15.1057L14.8881 8.83916C15.1368 8.61535 15.5346 8.61535 15.7833 8.83916C16.032 9.06296 16.032 9.42105 15.7833 9.64485L8.82051 15.9114C8.57184 16.1352 8.17397 16.1352 7.9253 15.9114V15.9114ZM6.2931 19.3336H8.46333V20.8107L5.54709 21.2705L4.14096 20.005L4.65187 17.3803H6.2931V19.3336Z"
              fill="white"
            />
          </svg>
          Write
        </p>
        <div className={style.icons}>
          {controls.map((control) => (
            <ControlButton
              control={control}
              editorState={editorState}
              setEditorState={setEditorState}
              key={control.style}
              setHTMLValue={setHTMLValue}
            />
          ))}
        </div>
        <p className={style.preview}>
          <svg
            width="23"
            height="25"
            viewBox="0 0 23 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.3633 8.449C11.0148 8.455 10.6688 8.5159 10.336 8.62985C10.49 8.92764 10.5719 9.26386 10.5741 9.60641C10.5741 9.8724 10.5265 10.1358 10.4339 10.3815C10.3414 10.6273 10.2058 10.8506 10.0348 11.0386C9.86381 11.2267 9.66082 11.3759 9.43742 11.4777C9.21402 11.5795 8.97458 11.6319 8.73277 11.6319C8.42136 11.6295 8.1157 11.5393 7.84499 11.37C7.6314 12.1848 7.6563 13.0529 7.91614 13.8513C8.17599 14.6497 8.65761 15.3379 9.29279 15.8185C9.92797 16.299 10.6845 16.5476 11.4552 16.5289C12.226 16.5102 12.9718 16.2253 13.5871 15.7144C14.2025 15.2035 14.6561 14.4926 14.8837 13.6824C15.1113 12.8722 15.1014 12.0038 14.8554 11.2001C14.6094 10.3964 14.1398 9.69828 13.513 9.20452C12.8863 8.71077 12.1342 8.44645 11.3633 8.449V8.449ZM20.7185 11.9719C18.9354 8.14482 15.4053 5.55548 11.3633 5.55548C7.3212 5.55548 3.79011 8.14663 2.00796 11.9722C1.93274 12.1359 1.89355 12.3167 1.89355 12.5001C1.89355 12.6835 1.93274 12.8643 2.00796 13.028C3.7911 16.8551 7.3212 19.4444 11.3633 19.4444C15.4053 19.4444 18.9364 16.8532 20.7185 13.0276C20.7938 12.864 20.8329 12.6831 20.8329 12.4998C20.8329 12.3164 20.7938 12.1355 20.7185 11.9719V11.9719ZM11.3633 17.7083C8.11954 17.7083 5.14579 15.719 3.53989 12.4999C5.14579 9.28089 8.11922 7.2916 11.3633 7.2916C14.6073 7.2916 17.5807 9.28089 19.1866 12.4999C17.581 15.719 14.6073 17.7083 11.3633 17.7083Z"
              fill="#66FFBE"
            />
          </svg>
          Preview
        </p>
      </div>
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={mapKeyToEditorCommand}
        blockRendererFn={mediaBlockRenderer}
        onChange={(state) => {
          setEditorState(state);
          setHTMLValue(stateToHTML(state.getCurrentContent()));
        }}
        placeholder="Write course..."
      />
    </div>
  );
}

export default RichTextEditor;