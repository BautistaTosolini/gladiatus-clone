import Image from 'next/image';

interface InventoryCellProps {
  cellIndex: number,
  rowIndex: number,
}

const InventoryCell = ({ cellIndex, rowIndex }: InventoryCellProps) => {
  return (
    // <Image
    //   className={`rounded-sm absolute`}
    //   style={{
    //     top: `${cellIndex * 14.5 + 2.9}%`,
    //     left: `${rowIndex * 12.5 + 1}%`,
    //   }}
    //   src={'/items/empty.jpg'}
    //   width={40}
    //   height={40}
    //   alt='empty inventory slot'
    // />
    <div
      className={`rounded-sm absolute w-[40px] h-[40px]`}
      style={{
        top: `${cellIndex * 14.5 + 2.9}%`,
        left: `${rowIndex * 12.5 + 1}%`,
      }}
    />
  );
}

export default InventoryCell;