export function calculateNewRating(currentTotal, newRating, numRatings) {
  const newTotal = currentTotal + newRating;
  const newNumRatings = numRatings + 1;
  const newAverageRating = newTotal / newNumRatings;
  return newAverageRating;
}