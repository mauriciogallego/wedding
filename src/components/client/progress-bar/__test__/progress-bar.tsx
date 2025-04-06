"use client";

const ProgressBar = ({ completedSegments = 2, totalSegments = 5 }) => {
  return (
    <div className="flex gap-1 p-2 bg-transparent border border-white shadow-inner w-full  mx-auto">
      {[...Array(totalSegments)].map((_, index) => (
        <div
          key={index}
          className={`flex-1 h-10 transition-all duration-300 ${
            index < completedSegments
              ? "bg-green-500 border-2 border-green-500"
              : "bg-white border-2 border-white"
          }`}
        ></div>
      ))}
    </div>
  );
};

export default ProgressBar;
