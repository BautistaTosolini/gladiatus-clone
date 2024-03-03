'use client'

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ItemInterface } from '@/lib/interfaces/item.interface';
import DropCell from '@/components/overview/DropCell';
import DraggableItem from '@/components/overview/DraggableItem';
import InventoryCell from '@/components/overview/InventoryCell';
import { moveItem } from '@/lib/utils/inventory/moveItem';
import { useRouter } from 'next/navigation';
import { moveItemAction } from '@/lib/actions/item/moveItem.action';

const Inventory = ({ characterInventory }: { characterInventory: (ItemInterface | null | string)[][] }) => {
  const [inventory, setInventory] = useState(characterInventory);
  const [isItemDragging, setIsItemDragging] = useState(false);
  const router = useRouter();

  const handleDropItem = async (x: number, y: number, item: ItemInterface) => {
    const oldInventory = inventory;
    const updatedInventory = moveItem({ inventory, item, x, y });

    if (!updatedInventory) return;

    // Replace the item "_id" with the populated object.
    updatedInventory[x][y] = item;
  
    setInventory(updatedInventory);
    router.refresh();

    await moveItemAction({ itemId: item._id, x, y })
      .catch(() => {
        setInventory(oldInventory);
      })
  };

  // Generates the visual grid in the inventory, the invisible divs inside the DropCell components are the ones who detects the drag and drop.
  const generateVisualCells = () => {
    const cells = [];

    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 5; y++) {
        cells.push(<div key={x} className={`border border-cream2`}></div>);
      }
    }

    return cells;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='relative w-[380px] h-[330px] my-1 text-brown2'>
        <div className='brown-card h-[250px] rounded-sm'>
          <div className='w-full h-full grid grid-rows-5 grid-cols-8'>
            {generateVisualCells()}
          </div>
          {inventory.map((row, rowIndex) => (
            inventory[rowIndex].map((cell, cellIndex) => (
              <div key={cellIndex}>
                {!inventory[rowIndex][cellIndex] ?
                  <DropCell
                    x={rowIndex}
                    y={cellIndex}
                    handleDropItem={handleDropItem}
                    key={cellIndex}
                  >
                    <div
                      className={`absolute w-[43.5px] h-[43.5px] bg-black opacity-25 ${isItemDragging && inventory[rowIndex][cellIndex] === null && 'bg-green opacity-25'}`}
                      style={{
                        top: `${cellIndex * 14.78 + 1.8}%`,
                        left: `${rowIndex * 12.35 + 1}%`,
                      }}
                    />
                  </DropCell>
                  :
                  typeof inventory[rowIndex][cellIndex] === 'object' ?
                    <DraggableItem 
                      item={inventory[rowIndex][cellIndex] as ItemInterface} 
                      rowIndex={rowIndex}
                      cellIndex={cellIndex}
                      onDrag={setIsItemDragging}
                    />
                    :
                    null
                }
              </div>
            ))
          ))}
        </div>  
      </div>
    </DndProvider>
  );
}

export default Inventory;
