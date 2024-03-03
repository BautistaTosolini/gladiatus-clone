import { ItemInterface } from '@/lib/interfaces/item.interface';

interface CaninsertItemParams {
  inventory: (ItemInterface | null | string)[][],
  item: ItemInterface,
  x: number,
  y: number,
}

export function canInsertItem({ inventory, item, x, y }: CaninsertItemParams) {
  // Check if the position exceeds the inventory size.
  if (x > inventory.length || y > inventory[0].length) return false;

  for (let i = 0; i < item.width; i++) {
    for (let j = 0; j < item.height; j++) {
      // Check if the item exceeds the inventory size.
      if (x + i >= inventory.length || y + j >= inventory[0].length) return false;

      // Check if each cell that will occupy the inventory is free.
      if (inventory[x + i][y + j] !== null) return false;
    }
  }

  return true;
}