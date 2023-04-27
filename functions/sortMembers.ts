// Sorts the team meambers from greatest to least by their total points
export function compareMembersTotalPoints(a, b) {
  if (a.total_points < b.total_points) {
    return 1;
  }

  if (a.total_points > b.total_points) {
    return -1;
  }

  return 0;
}
