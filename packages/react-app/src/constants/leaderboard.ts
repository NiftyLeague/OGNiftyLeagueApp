export const LEADERBOARD_SCORE_API_URL = 'https://odgwhiwhzb.execute-api.us-east-1.amazonaws.com/prod/scores';
export const tables = [
  {
    key: 'win_rate',
    display: 'WIN RATE',
    rows: [
      { key: 'round_wins', display: 'WIN RATE' },
      { key: 'matches', display: 'MATCHES PLAYED' },
    ],
  },
  {
    key: 'xp',
    display: 'TOP EARNERS',
    rows: [
      { key: 'round_wins', display: 'TOTAL NFTL EARNED' },
      { key: 'matches', display: 'MATCHES PLAYED' },
      { key: 'avg', display: 'AVG, NFTL/MATCH' },
      { key: 'kills', display: 'KILLS' },
    ],
  },
  {
    key: 'kills',
    display: 'TOP KILLS',
    rows: [
      { key: 'matches', display: 'MATCHES PLAYED' },
      { key: 'kills', display: 'KILLS' },
    ],
  },
];
