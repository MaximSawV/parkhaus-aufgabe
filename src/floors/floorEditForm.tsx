import {Floor} from "../App";
import {Button, ColorPicker, Form, InputNumber, Select} from "antd";
import {ReactNode, useEffect, useState} from "react";

interface FloorFormProps {
    floors: Record<string, Floor>
    setSelectedFloor: (floor: Floor|null) => void
    selectedFloor: Floor|null
    editFloor: Floor|null
    setEditFloor: (floor: Floor|null) => void
}
export default function FloorEditForm(props: FloorFormProps) {

    const [form] = Form.useForm<Floor>()

    const {Option} = Select;

    const onChange = (value: number|null) => {
        if (props.editFloor) {

        }
    }

    const getOptions = () => {
        const output: any[] = [];
        for (const [color, floor] of Object.entries(props.floors)) {
            output.push(
                <Option value={color}><p style={{background: color, width: 100, height: 30, margin: 0, padding: 0}} />
                </Option>
            )
        }

        return output
    }

    return (
        <div>
            <Select
                onSelect={(value) => props.setSelectedFloor(props.floors[value])}
                style={{width: "fit-content", minWidth: 150}}>
                {getOptions()}
            </Select>
            <Form.Item label={'Parkplätze'}>
                <InputNumber min={0} name={'parkingLots'} onChange={onChange}/>
            </Form.Item>
            { props.selectedFloor && (
                <Button danger>Delete</Button>
            )}
        </div>
    )
}