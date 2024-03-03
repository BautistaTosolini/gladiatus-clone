import { ItemInterface } from '@/lib/interfaces/item.interface';
import { canInsertItem } from '@/lib/utils/inventory/canInsertItem';

interface InsertItemParams {
  inventory: (ItemInterface | null | string)[][],
  item: ItemInterface,
  x: number,
  y: number,
}

export function insertItem({ inventory, item, x, y }: InsertItemParams) {
  if (!canInsertItem({ inventory, item, x, y })) return null;

  for (let i = 0; i < item.width; i++) {
    for (let j = 0; j < item.height; j++) {
      // If the position its the initial one, set the item "_id" which can be used to be fetched in the DB.
      if (i == 0 && j == 0) {
        inventory[x][y] = item._id;
      // If not, save the item "id" so a the cell will be saved for the item.
      } else {
        inventory[x + i][j + y] = item.id;
      }
    }
  }

  return inventory;
}