import { Icon } from "@iconify/react";
type IconsProps={
  icon: string;
  className?: string;
  width?: string;
  rotate?: number;
  hFlip?: boolean;
  vFlip?: boolean;
}
const Icons = ({ icon, className, width, rotate, hFlip, vFlip }:IconsProps) => {
  return (
    <>
      <Icon
        width={width}
        rotate={rotate}
        hFlip={hFlip}
        icon={icon}
        className={className}
        vFlip={vFlip}
      />
    </>
  );
};

export default Icons;
