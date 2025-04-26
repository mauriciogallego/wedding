import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

const Countdown = () => {
  const weddingDate = new Date("2026-03-21T16:00:00-04:00");

  return (
    <FlipClockCountdown
      to={weddingDate.getTime()}
      labels={["DAYS", "HOURS", "MINUTES", "SECONDS"]}
      labelStyle={{
        fontSize: "10px",
        color: "#f3e8ff",
      }}
      digitBlockStyle={{
        width: 40,
        height: 70,
        fontSize: 50,
        color: "#ffffff",
        fontFamily: '"Playfair Display", serif',
      }}
      dividerStyle={{
        color: "transparent",
        height: "1px",
      }}
      separatorStyle={{
        size: "4px",
        color: "#f3e8ff",
      }}
    />
  );
};

export default Countdown;
