import { DataType, Order } from 'types/leaderboard';
import { LEADERBOARD_SCORE_API_URL } from 'constants/leaderboard';

export const fetchScores = async (scoreType: string, count: number): Promise<DataType[]> => {
  const res = await fetch(`${LEADERBOARD_SCORE_API_URL as string}?score_type=${scoreType}`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await res.json();
  // console.log('=============json data: ', json);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return json;
};

function descendingComparator(a: DataType, b: DataType, orderBy: any) {
  const [numberOfA, numberOfB] =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    orderBy !== 'rank' ? [parseInt(a.stats[orderBy], 10), parseInt(b.stats[orderBy], 10)] : [a.rank, b.rank];
  if (numberOfB < numberOfA) {
    return -1;
  }
  if (numberOfB > numberOfA) {
    return 1;
  }
  return 0;
}

export const getComparator = <Key extends keyof any>(
  order: Order,
  orderBy: Key,
): ((a: DataType, b: DataType) => number) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
export const stableSort = <T>(array: readonly T[], comparator: (a: T, b: T) => number): T[] => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};
