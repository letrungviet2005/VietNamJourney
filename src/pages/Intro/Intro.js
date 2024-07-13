import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./Intro.module.scss";
import { useNavigate } from "react-router-dom";
import Vimeo from "@vimeo/player";

const cx = classNames.bind(style);

function Intro() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleSkip = () => {
    setStep(step + 1);
  };

  useEffect(() => {
    if (step > 2) {
      navigate("/TrangChu"); // Replace '/TrangChu' with your target route
    }
  }, [step, navigate]);

  useEffect(() => {
    if (step === 1) {
      const iframe = document.querySelector('iframe');
      const player = new Vimeo(iframe);

      player.on('ended', () => {
        setStep(2);
      });

      // Cleanup function to remove event listener when component unmounts
      return () => {
        player.off('ended');
      };
    }
  }, [step]);


  const [displayedText, setDisplayedText] = useState("");
  const sloganText = "Hãy tham gia cùng chúng tôi bảo vệ môi trường";

  useEffect(() => {
    if (step === 2) {
      let index = -1;
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + sloganText[index]);
        index += 1;

        if (index >= sloganText.length-1) {
          clearInterval(interval);
        }
      }, 50); // Tốc độ hiển thị

      return () => clearInterval(interval);
    }
  }, [step, sloganText]); // Thêm sloganText vào dependencies

  return (
    <div className={cx("Intro")}>
      {step === 1 && (
        <div className={cx("video-container")}>
          <div>
            <iframe
              src="https://player.vimeo.com/video/983438389?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&autoplay=1&muted=1&controls=0"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              title="INTRO"
            ></iframe>
          </div>
          <button onClick={handleSkip} className={cx("skip-button")}>
            Skip <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      )}
      {step === 2 && (
        <div className={cx("slogan-container")}>
          <div className={cx("slogan")}>
            Môi trường của chúng ta đang đặt ở tình trạng báo động<br/>Chúng tôi cần sự góp sức của bạn
          </div>
          <div className={cx("slogan-text")}>
            {displayedText}
          </div>

          <button onClick={handleSkip} className={cx("join-button")}>
            Tham gia <i class="fa-solid fa-hand"></i>
          </button>
        </div>
      )}
      {/* {step === 3 && (
        <div className={cx("slogan-container")}>
          <h2>Our Mission</h2>
          <p>Connecting people and protecting the environment.</p>
          <button onClick={handleSkip} className={cx("skip-button")}>
            Continue
          </button>
        </div>
      )} */}
    </div>
  );
}

export default Intro;
