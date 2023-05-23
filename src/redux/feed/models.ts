export interface FeedOrder {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}

export interface FeedMessage {
  success: boolean;
  orders: FeedOrder[];
  total: number;
  totalToday: number;
}
