import { SortOrder } from 'mongoose';

export type TOptions = {
  _id?: SortOrder;
  name?: SortOrder;
  attack?: SortOrder;
  defense?: SortOrder;
};
