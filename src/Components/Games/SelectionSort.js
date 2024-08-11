import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React from 'react'
import './../../Styles/Components/Games/SelectionSort.css'

const SelectionSort = ({gra}) => {

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition
	} = useSortable({
		id: gra.id
	})

	const sytle = {
		tranform : CSS.Transform.toString(transform),
		transition,
	}

    return (
		<div
			className='Card-Selection'
			style={sytle}
			ref={setNodeRef}	
			{...attributes}
			{...listeners}
		>{gra.name}</div>
    )
}

export default SelectionSort