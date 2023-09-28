import {Button, Card, Modal} from 'antd';
import {Floor, Group} from '../App';
import React, {useState} from 'react';

interface GroupModalProps {
	addGroup: (group: Group) => void,
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
export default function GroupModal(props: GroupModalProps) {

	const {isModalOpen, handleCancel, addGroup, closeModal} = props;
	const [activeTabKey, setActiveTabKey] = useState<string>('add');

	const contentList: Record<string, React.ReactNode> = {
		edit: <p>content1</p>,
		add: <p>content2</p>,
	};

	const onTabChange = (key: string) => {
		setActiveTabKey(key);
	};

	return (
		<Modal
			style={{padding: 0}}
			bodyStyle={{padding: 0}}
			closeIcon={false}
			open={isModalOpen}
			footer={<></>}
		>
			<Card
				title="Gruppen verwalten"
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
	)
}