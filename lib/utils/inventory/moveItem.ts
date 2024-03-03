import { ItemInterface } from '@/lib/interfaces/item.interface';
import { canInsertItem } from '@/lib/utils/inventory/canInsertItem';
import { insertItem } from '@/lib/utils/inventory/insertItem';

interface MoveItemParams {
  inventory: (ItemInterface | null | string)[][],
  item: ItemInterface,
  x: number,
  y: number,
}

export function moveItem({ inventory, item, x, y }: MoveItemParams) {
  if (!canInsertItem({ inventory, item, x, y })) return null;

  // Remove the initial item position by removing the "_id" and "id" cells.
  for (let i = 0; i < inventory.length; i++) {
    for (let j = 0; j < inventory[i].length; j++) {
      const currentItem = inventory[i][j];
      if (currentItem && ((typeof currentItem !== 'string' && currentItem?._id.toString() == item._id.toString()) || currentItem == item.id)) {
        inventory[i][j] = null;
      }
    }
  }

  // Insert the item in the new position.
  const updatedInventory = insertItem({ inventory, item, x, y });

  return updatedInventory;
}