import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";

interface LikeProps {
  onLikeClicked: () => void;
}

const Like = ({ onLikeClicked }: LikeProps) => {
  const [isFilled, updateFill] = useState(false);

  const toggle = () => {
    updateFill(!isFilled);
    onLikeClicked();
  };

  return (
    <>
      {!isFilled ? (
        <AiOutlineHeart
          color="#ff6b81"
          size={20}
          onClick={toggle}
        ></AiOutlineHeart>
      ) : (
        <AiFillHeart color="#ff6b81" size={20} onClick={toggle}></AiFillHeart>
      )}
    </>
  );
};

export default Like;
