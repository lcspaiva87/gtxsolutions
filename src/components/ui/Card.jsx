import useSkin from "@/hooks/useSkin";

export const Card = ({
  children,
  className = "custom-class  bg-white ",
  bodyClass = "p-6",

}) => {
  const [skin] = useSkin();

  return (
    <div
      className={`
        card rounded-md   dark:bg-slate-800   ${
          skin === "bordered"
            ? " border border-slate-200 dark:border-slate-700"
            : "shadow-base"
        }

    ${className}
        `}
    >

      <main className={`card-body ${bodyClass}`}>{children}</main>
    </div>
  );
};


