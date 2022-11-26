import { KeyboardEvent, useEffect, useState } from 'react';
import { RatingProps } from './Rating.props';
import StarIcon from './Star.svg';
import cn from 'classnames';
import styles from './Rating.module.css';

export const Rating = ({ isEditable = false, rating, setRating, ...props }: RatingProps): JSX.Element => {

  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  const changeDisplay = (data: number) => {
    if (!isEditable) {
      return;
    }
    constructRating(data)
  }

  const handleRating = (data: number) => {
    if (!isEditable || !setRating) {
      return;
    }
    setRating(data)
  }

  const handleRatingSpace = (data: number, e: KeyboardEvent<SVGAElement>) => {
    if (e.code != 'Space' || !setRating) {
      return;
    }
    setRating(data)
  }

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((item: JSX.Element, index: number) => {
      return (
        <span
          className={cn(styles.star, {
          [styles.filled]: index < currentRating,
          [styles.editable]: isEditable,
          })}
          key={index}
        >
          <StarIcon
            onMouseEnter={changeDisplay.bind(null, index + 1)}
            onMouseLeave={changeDisplay.bind(null, rating)}
            onClick={handleRating.bind(null, index + 1)}
            tabIndex={isEditable ? 0 : -1}
            onKeyDown={(e: KeyboardEvent<SVGAElement>) => isEditable && handleRatingSpace(index + 1, e)}
          />
        </span>

      ) 
    })
    setRatingArray(updatedArray);
  };

  return (
    <div className={styles.ratingBlock} {...props}>
      {ratingArray.map((item, index) => item)}
    </div>
  )
};