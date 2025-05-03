"use client";


interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return <div className={`${className} bg-[#F2F5F7] dark:bg-gray-900 `}>{children}</div>;
}
