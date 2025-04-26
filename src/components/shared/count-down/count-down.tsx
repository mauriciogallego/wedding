import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

const Countdown = () => {
  const weddingDate = new Date("2026-03-21T16:00:00-04:00");

  return (
    <FlipClockCountdown
      to={weddingDate.getTime()}
      labels={["DAYS", "HOURS", "MINUTES", "SECONDS"]}
      labelStyle={{
        fontSize: "12px",
        color: "#f3e8ffb3",
      }}
      digitBlockStyle={{
        width: 32,
        height: 50,
        fontSize: 30,
        color: "#ffffff",
      }}
      dividerStyle={{
        color: "transparent",
        height: "1px",
      }}
      separatorStyle={{
        size: "4px",
        color: "#f3e8ffb3",
      }}
    />
  );
};

export default Countdown;
