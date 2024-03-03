import { ItemInterface } from '@/lib/interfaces/item.interface';
import { useDrop } from 'react-dnd';

interface DropCellProps {
  x: number,
  y: number,
  handleDropItem: (x: number, y: number, item: ItemInterface) => void,
  children: React.ReactNode,
}

const DropCell = ({ x, y, handleDropItem, children }: DropCellProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item: ItemInterface) => handleDropItem(x, y, item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop}>
      {children}
    </div>
  );
};

export default DropCell;
