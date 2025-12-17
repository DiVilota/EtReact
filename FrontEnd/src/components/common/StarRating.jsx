import { useState } from "react";

const StarRating = ({
  rating = 0,
  onRatingChange = null,
  maxStars = 5,
  size = "md",
  readonly = false,
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  };

  const sizeClass = sizes[size] || sizes.md;

  const handleClick = (value) => {
    if (!readonly && onRatingChange) onRatingChange(value);
  };

  const renderStar = (index) => {
    const value = index + 1;
    const isFilled = value <= (hoverRating || rating);

    return (
      <button
        key={index}
        type="button"
        onClick={() => handleClick(value)}
        onMouseEnter={() => !readonly && setHoverRating(value)}
        onMouseLeave={() => !readonly && setHoverRating(0)}
        disabled={readonly}
        className={`
          ${sizeClass}
          transition-all duration-200
          ${readonly ? "cursor-default" : "cursor-pointer hover:scale-110"}
          ${isFilled ? "text-neon-pink drop-shadow-neon-pink" : "text-gray-600"}
          focus:outline-none
        `}
        aria-label={`${value} estrella${value > 1 ? "s" : ""}`}
      >
        {isFilled ? "★" : "☆"}
      </button>
    );
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(maxStars)].map((_, index) => renderStar(index))}

      {readonly && rating > 0 && (
        <span className="ml-2 text-sm text-neon-cyan font-mono">
          {Number(rating).toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;
