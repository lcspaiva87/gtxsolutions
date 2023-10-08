type backgroundProps = "bg-cyan-200" | "bg-gray-200" | "bg-yellow-200" |"bg-red-200"| "bg-green-200"
type colorCicleProps = "bg-cyan-400" | "bg-gray-400" | "bg-yellow-400" |"bg-red-400"| "bg-green-400"
type StatusProps={
  label:string;
  background:backgroundProps;
  colorCicle: colorCicleProps
}
export function Status ({background,colorCicle,label }:StatusProps){
  return(
    <span className={`${background} p-2 rounded-md flex items-center gap-2  `}> <div className={` w-3 h-3 rounded-full ${colorCicle}`} />{label}</span>
  )
}
