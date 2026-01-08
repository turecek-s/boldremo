interface BrandNameProps {
  className?: string;
}

export const BrandName = ({ className = "" }: BrandNameProps) => {
  return (
    <span className={className}>
      <span className="font-extrabold">Bold</span>
      <span className="font-medium">REMO</span>
    </span>
  );
};
