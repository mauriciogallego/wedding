import { SvgProps } from "@/types";

const Envelop = ({ width, height, className }: SvgProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 9C2 6.23858 4.23858 4 7 4H17C19.7614 4 22 6.23858 22 9V15C22 17.7614 19.7614 20 17 20H7C4.23858 20 2 17.7614 2 15V9ZM7 6C5.34315 6 4 7.34315 4 9V15C4 16.6569 5.34315 18 7 18H17C18.6569 18 20 16.6569 20 15V9C20 7.34315 18.6569 6 17 6H7Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.21913 8.37531C6.56414 7.94404 7.19343 7.87412 7.6247 8.21913L10.1259 10.2201C11.2216 11.0966 12.7784 11.0966 13.8741 10.2201L16.3753 8.21913C16.8066 7.87412 17.4359 7.94404 17.7809 8.37531C18.1259 8.80657 18.056 9.43586 17.6247 9.78087L15.1235 11.7818C13.2974 13.2427 10.7026 13.2427 8.87652 11.7818L6.37531 9.78087C5.94404 9.43586 5.87412 8.80657 6.21913 8.37531Z"
    />
  </svg>
);

export default Envelop;
