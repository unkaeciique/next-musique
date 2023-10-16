export default function SidebarItem({ text, Icon, active }) {
  return (
    <div className="menuHoverEffect flex items-center text-gray-700 justify-center xl:justify-start text-lg space-x-3">
      <Icon className="h-7" fill={`${active && "#0ea5e9"}`} />
      <span
        className={`${active && "font-bold text-sky-500"} hidden xl:inline`}
      >
        {text}
      </span>
    </div>
  );
}
