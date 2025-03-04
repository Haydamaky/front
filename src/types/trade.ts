export interface TradeData {
  offerFieldsIndexes: number[];
  wantedFieldsIndexes: number[];
  offeredMoney: number;
  wantedMoney: number;
  toUserId: string;
  fromUserId: string;
}

export interface TradeDataLocal {
  offerFieldsIndexes: number[];
  wantedFieldsIndexes: number[];
  toUserId: string;
}
