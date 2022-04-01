export interface Account {
  address: string;
  balance?: number;
  created_at: number;
  id: string;
  update_counter?: number;
  updated_at?: number;
}

export interface Rental {
  name?: string;
  background: string;
  id: string;
  is_active: boolean;
  last_rented_at: number;
  multiplier: number;
  multipliers: number;
  price: number;
  price_daily: number;
  rental_count: number;
  stats: any;
  total_rented: number;
  tribe: string;
}

export type Rentals = { [key: string]: Rental };
