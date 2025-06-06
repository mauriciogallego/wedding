import { SvgProps } from "@/types";

const Ring = ({ width, height, className }: SvgProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3,14A9,9,0,1,0,14.822,5.46l1.019-1.585a1,1,0,0,0,.031-1.032l-.75-1.333A1,1,0,0,0,14.25,1H9.75a1,1,0,0,0-.872.51l-.75,1.333a1,1,0,0,0,.031,1.032L9.178,5.46A9.011,9.011,0,0,0,3,14Zm8.282-8.966L10.167,3.3l.168-.3h3.33l.168.3L12.718,5.034C12.468,5.011,12.23,5,12,5S11.532,5.011,11.282,5.034ZM12,7a7,7,0,1,1-7,7A7.022,7.022,0,0,1,12,7Z" />
  </svg>
);

export default Ring;
