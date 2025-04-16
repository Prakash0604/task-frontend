interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
}: ContainerProps) => {
  return <div className={`${className}`}>{children}</div>;
};

export default Container;
