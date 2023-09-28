import {Button, Card, Modal} from 'antd';
import {Floor} from '../App';
import React, {useState} from 'react';

interface FloorModalProps {
	addFloor: (floor: Floor) => void,
	closeModal: () => void,
	isModalOpen: boolean,
	handleCancel: () => void
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

const contentList: Record<string, React.ReactNode> = {
	edit: <p>content1</p>,
	add: <p>content2</p>,
};
export default function FloorModal(props: FloorModalProps) {

	const {isModalOpen, handleCancel, addFloor, closeModal} = props;
	const [activeTabKey, setActiveTabKey] = useState<string>('add');

	const onTabChange = (key: string) => {
		setActiveTabKey(key);
	};

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