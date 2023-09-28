import React, {ReactNode, useState} from 'react';
import './App.css';
import {Button, Card, FloatButton} from 'antd';
import {
	EditOutlined,
	GroupOutlined,
	LockOutlined,
	UnlockOutlined,
	UnorderedListOutlined,
} from '@ant-design/icons';
import FloorModal from './floors/FloorModal';
import GroupModal from './groups/GroupModal';

export interface Floor {
	color: string;
	isOpen: boolean;
	parkingLots: number;
	parkingLotsInUse: number;
	isActive: boolean;
}

export interface Group {
	id: number;
	floors: string[];
	isOpen: boolean;
	isActive: boolean;
}

const exampleFloors: Record<string, Floor> = {
	'yellow': { color: 'yellow', isOpen: true, parkingLots: 10, parkingLotsInUse: 0, isActive: true},
	'lime': { color: 'lime', isOpen: true, parkingLots: 15, parkingLotsInUse: 10, isActive: true},
	'orange': { color: 'orange', isOpen: false, parkingLots: 20, parkingLotsInUse: 5, isActive: true},
};

const exampleGroups: Record<number, Group> = {
	1: {
		id: 1,
		floors: ['yellow', 'orange'],
		isOpen: true,
		isActive: true
	},
};


function App() {

	const [floors, setFloors] = useState<Record<string, Floor>>(exampleFloors);
	const [groups, setGroups] = useState<Record<number, Group>>(exampleGroups);
	const [isFloorModalOpen, setIsFloorModalOpen] = useState(false);
	const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);


	const showFloorModal = () => {
		setIsFloorModalOpen(true);
	};

	const showGroupModal = () => {
		setIsGroupModalOpen(true);
	};

	const handleFloorModalOk = () => {
		setIsFloorModalOpen(false);
	};

	const handleGroupModalOk = () => {
		setIsGroupModalOpen(false);
	};

	const handleFloorModalCancel = () => {
		setIsFloorModalOpen(false);
	};

	const handleGroupModalCancel = () => {
		setIsGroupModalOpen(false);
	};

	const addFloor = (newFloor: Floor) => {
		const changedFloors: typeof exampleFloors = { ...floors };
		changedFloors[newFloor.color] = newFloor;
		setFloors(changedFloors);
	};

	const addGroup = (newGroup: Group) => {
		const changedGroups: typeof exampleGroups = { ...groups };
		changedGroups[newGroup.id] = newGroup;
		setGroups(changedGroups);
	}

	const toggleFloor = (color: string, open: boolean | null = null) => {
		const changedFloors: typeof exampleFloors = { ...floors };
		if (open !== null) {
			changedFloors[color].isOpen = open;
		} else {
			changedFloors[color].isOpen = !changedFloors[color].isOpen;
		}
		setFloors(changedFloors);
	};

	const toggleGroup = (groupId: number, open: boolean) => {
		const changedGroups: typeof exampleGroups = { ...groups };

		for (const floorColor of changedGroups[groupId].floors) {
			toggleFloor(floorColor, open);
		}

		changedGroups[groupId].isOpen = open;
		setGroups(changedGroups);
	};

	const renderFloors = () => {
		const output: ReactNode[] = [];
		let count = 1;
		for (const [color, floor] of Object.entries(floors)) {
			if (!floor.isActive) {
				continue;
			}
			output.push(
				(
					<Card
						title={<p>Stockwerk: {count}</p>}
						style={{ margin: 10 }}
						headStyle={{ background: color }}
						actions={[
							<Button
								type="primary"
								shape="round"
								icon={floor.isOpen ? <LockOutlined/> : <UnlockOutlined/>}
								onClick={() => {
									toggleFloor(color);
								}}
							>
								{floor.isOpen ? 'Schließen' : 'Öffnen'}
							</Button>
						]}
					>
						Freie Parkfläche: {floor.parkingLots - floor.parkingLotsInUse}/{floor.parkingLots}
					</Card>
				),
			);
			count++;
		}

		return output;
	};

	const renderGroups = () => {
		const output: ReactNode[] = [];
		for (const [id, group] of Object.entries(groups)) {
			if(!group.isActive) {
				continue;
			}
			output.push(
				(
					<>
						<Card
							key={id}
							style={{margin: 10}}
							actions={[
								<Button
									type={'primary'}
									icon={<UnlockOutlined />}
									onClick={() => {
										toggleGroup(group.id, true);
									}}
								>
									Öffnen
								</Button>,
								<Button
									type={'primary'}
									icon={<UnlockOutlined />}
									onClick={() => {
										toggleGroup(group.id, false);
									}}
								>
									Schließen
								</Button>
							]}
							title={<p>Gruppe: {id}</p>}
						>
							<div>
								<p>Stockwerke: </p>
								{group.floors.map((color) => {
									return (
										<div key={color} style={{height: 20, width: 100,
											borderRadius: 15, background: color }} />
									);
								})}
							</div>
						</Card>
					</>
				),
			);
		}
		return output;
	};

	return (
		<div style={{ height: '100vh', width: '100vw', display: 'flex' }}>
			<div style={{ display: 'grid', gridTemplateColumns: 'auto auto', columnGap: '10px' }}>
				<Card title={'Stockwerke'} style={{ width: 400 }}>
					{renderFloors()}
				</Card>
				<Card title={'Gruppen'} style={{ width: 400 }}>
					{renderGroups()}
				</Card>
			</div>
			<FloatButton.Group
				trigger="hover"
				type="primary"
				style={{ right: 94 }}
				icon={<EditOutlined />}
			>
				<FloatButton onClick={showFloorModal} icon={<UnorderedListOutlined />}/>
				<FloatButton onClick={showGroupModal} icon={<GroupOutlined />} />
			</FloatButton.Group>
			<FloorModal addFloor={addFloor} closeModal={() => setIsFloorModalOpen(false)}
						isModalOpen={isFloorModalOpen} handleCancel={handleFloorModalCancel}
						floors={floors} setFloors={setFloors}
			/>
			<GroupModal addGroup={addGroup} closeModal={() => setIsGroupModalOpen(false)}
						isModalOpen={isGroupModalOpen} handleCancel={handleGroupModalCancel}
			/>
		</div>
	);
}

export default App;
