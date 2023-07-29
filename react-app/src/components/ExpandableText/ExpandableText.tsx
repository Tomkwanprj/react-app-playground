import { ReactNode, useState } from "react";

interface ExpandableTextProps {
  maxChar?: number;
  children: string;
}

const ExpandableText = ({ maxChar = 100, children }: ExpandableTextProps) => {
  const [isShowMore, setIsShowMore] = useState(false);

  if (children.length <= maxChar) return <p>{children}</p>;

  const text = isShowMore ? children.substring(0, maxChar) + "..." : children;

  return (
    <p>
      {text}
      <button onClick={() => setIsShowMore(!isShowMore)}>
        {isShowMore ? "More" : "Less"}
      </button>
    </p>
  );
};

export default ExpandableText;
