"use client";

const ProgressBar = ({ completedSegments = 2, totalSegments = 5 }) => {
  return (
    <div className="flex gap-1 p-2 bg-transparent border border-[#ffffff] shadow-inner w-full  mx-auto">
      {[...Array(totalSegments)].map((_, index) => (
        <div
          key={index}
          className={`flex-1 h-10 transition-all duration-300 ${
            index < completedSegments
              ? "bg-[#ffffff] border-2 border-[#ffffff]"
              : "bg-transparent border-2 border-transparent"
          }`}
        ></div>
      ))}
    </div>
  );
};

export default ProgressBar;
