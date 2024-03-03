import { ItemInterface } from '@/lib/interfaces/item.interface';
import Image from 'next/image';
import { useDrag } from 'react-dnd';

interface HandleDraggableItemProps {
  item: ItemInterface,
  cellIndex: number,
  rowIndex: number,
  onDrag: (isDragging: boolean) => void;
}

const DraggableItem = ({ item, cellIndex, rowIndex, onDrag}: HandleDraggableItemProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    item: item,
    collect: (monitor) => {
      onDrag(!!monitor.isDragging());
      return {
        isDragging: !!monitor.isDragging(),
      };
    },
  }));

  const width = 40 * item.width - 5; 
  const height = 40 * item.height - 5;

  return (
    <Image
      src={`/items/${item.image}.webp`}
      width={width}
      height={height}
      alt={item.name}
      style={{
        top: `${cellIndex * 14.5 + 2.9}%`,
        left: `${rowIndex * 12.5 + 1}%`,
      }}
      className='absolute hover:cursor-pointer hover:brightness-125'
      ref={drag}
    />
  );
};

export default DraggableItem;
