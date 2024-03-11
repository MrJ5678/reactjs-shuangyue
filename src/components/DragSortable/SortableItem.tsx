import React, { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type PropsType = {
  id: string
  children: JSX.Element
}

const SortableItem: FC<PropsType> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: '1px  solid   #ccc',
    margin: '10px 0',
    background: '#f1f1f1'
  }
  return <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
    {children}
  </div>
}

export default SortableItem