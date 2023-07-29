interface ShowMoreButtonProps {
  isShowMore: boolean;
  onShowMoreButtonClicked: () => void;
}

const ShowMoreButton = ({
  isShowMore,
  onShowMoreButtonClicked,
}: ShowMoreButtonProps) => {
  return (
    <button onClick={onShowMoreButtonClicked}>
      {isShowMore ? "More" : "Less"}
    </button>
  );
};

export default ShowMoreButton;
