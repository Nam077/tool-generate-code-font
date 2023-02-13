import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;
type Props = {
    onChange: (value: string) => void;
};

const Example: React.FC<Props> = (props: Props) => {
    const [string, setString] = React.useState('');
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setString(e.target.value);
        props.onChange(e.target.value);
    };

    return (
        <>
            <TextArea showCount style={{ height: 120, marginBottom: 24 }} onChange={onChange} value={string} placeholder="can resize" />
            <TextArea showCount maxLength={100} style={{ height: 120, resize: 'none' }} onChange={onChange} placeholder="disable resize" />
        </>
    );
};

export default Example;
