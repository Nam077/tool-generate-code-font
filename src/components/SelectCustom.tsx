import React, { FunctionComponent, useCallback, useMemo, useRef, useState } from 'react';
import { Button, Divider, Form, Input, InputRef, Select, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface OwnProps {
    items: string[];
    name: string;
    defaultValue: string;
    isCanNotAddItem?: boolean;

    change: string;
    onchangeOption: (name: string, value: string) => void;
}

type Props = OwnProps;
let index = 0;
export const SelectCustom: FunctionComponent<Props> = (props) => {
    const [items, setItems] = useState(props.items);
    const [name, setName] = useState('');
    const inputRef = useRef<InputRef>(null);
    const onChangeSelect = (value: string) => {
        props.onchangeOption(props.change, value);
    };
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const addItem = useCallback(
        (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
            e.preventDefault();
            setItems([...items, name || `New item ${index++}`]);
            setName('');
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        },
        [items, name, inputRef],
    );
    const memoizedOptions = useMemo(() => {
        return items.map((item) => ({ label: item, value: item }));
    }, [items]);
    return (
        <Form layout={'vertical'}>
            <Form.Item label={props.name}>
                <Select
                    showSearch
                    allowClear
                    onChange={onChangeSelect}
                    size={'large'}
                    placeholder={props.name}
                    defaultValue={props.defaultValue}
                    dropdownRender={(menu) => (
                        <>
                            {menu}
                            {!props.isCanNotAddItem && (
                                <>
                                    <Divider style={{ margin: '8px 0' }} />
                                    <Space style={{ padding: '0 8px 4px' }}>
                                        <Input
                                            placeholder="Please enter item"
                                            ref={inputRef}
                                            value={name}
                                            onChange={onNameChange}
                                        />
                                        <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                            Add item
                                        </Button>
                                    </Space>
                                </>
                            )}
                        </>
                    )}
                    options={memoizedOptions}
                />
            </Form.Item>
        </Form>
    );
};
