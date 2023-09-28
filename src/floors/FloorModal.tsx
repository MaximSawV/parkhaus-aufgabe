import {Button, Card, Modal} from 'antd';
import {Floor} from '../App';
import React, {useEffect, useState} from 'react';
import FloorEditForm from "./floorEditForm";

interface FloorModalProps {
	addFloor: (floor: Floor) => void,
	closeModal: () => void,
	isModalOpen: boolean,
	handleCancel: () => void
	floors: Record<string, Floor>
	setFloors: (floors: Record<string, Floor>) => void
}

const tabList = [
	{
		key: 'add',
		label: 'Hinzufügen'
	},
	{
		key: 'edit',
		label: 'Bearbeiten'
	},
]
export default function FloorModal(props: FloorModalProps) {

	const {isModalOpen, handleCancel, closeModal} = props;
	const [activeTabKey, setActiveTabKey] = useState<string>('add');
	const [selectedFloor, setSelectedFloor] = useState<Floor|null>(null)
	const [editFloor, setEditFloor] = useState<Floor|null>(null)

	useEffect(() => {
		if (selectedFloor !== null) {
			setEditFloor({...selectedFloor})
		}
	}, [selectedFloor])

	const contentList: Record<string, React.ReactNode> = {
		edit: <FloorEditForm floors={props.floors} setSelectedFloor={setSelectedFloor} selectedFloor={selectedFloor} editFloor={editFloor} setEditFloor={setEditFloor}/>,
		add: <p>content2</p>,
	};

	const onTabChange = (key: string) => {
		setActiveTabKey(key);
	};


	const deleteFloor = () => {
		if (selectedFloor) {
			const changeFloors = {...props.floors}
			changeFloors[selectedFloor.color].isActive = false;
			props.setFloors(changeFloors);
		}
	}

	const saveChanges = () => {
		if (editFloor) {
			const changedFloors = props.floors;
			if (props.floors[editFloor.color]) {
				changedFloors[editFloor.color] = editFloor;
			}
			props.setFloors(changedFloors);
		}
	}

	return (
		<>
			<Modal
				style={{padding: 0}}
				bodyStyle={{padding: 0}}
				closeIcon={false}
				open={isModalOpen}
				footer={<></>}
			>
				<Card
					title="Stockwerke verwalten"
					tabList={tabList}
					activeTabKey={activeTabKey}
					onTabChange={onTabChange}
					actions={[
						<Button type={'primary'} onClick={closeModal}>
							Speichern
						</Button>,
						<Button type={'primary'} danger onClick={handleCancel}>
							Abbrechen
						</Button>,
					]}
				>
					{contentList[activeTabKey]}
				</Card>
			</Modal>
		</>
	)
}