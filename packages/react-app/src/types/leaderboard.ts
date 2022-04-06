interface Stats {
  hits: string;
  kills: string;
  wins: string;
  earnings: string;
  suicides: string;
  round_wins: string;
  xp: string;
  time_played: string;
  matches: string;
  deaths: string;
  rounds: string;
}
export interface DataType {
  rank: number;
  user_id: string;
  score: string;
  stats: Stats;
}

export interface TableRowType {
  key: string;
  display: string;
}
export interface TableType {
  key: string;
  display: string;
  rows: TableRowType[];
}

export type Order = 'asc' | 'desc';

export interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string;
  rows: TableRowType[];
}

export interface TableProps {
  selectedTable: TableType;
  rows: Array<Object>;
}
