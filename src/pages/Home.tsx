import React, { FunctionComponent, useState } from 'react';
import { Button, Col, Form, List, Row, Input, Popconfirm, message } from 'antd';
import { SelectCustom } from '../components/SelectCustom';
import data from '../data/data.json';
const { TextArea } = Input;
import { ToolService } from '../services/tool.service';
import Example from '../components/Example';

interface OwnProps {}

interface DataGlyph {
    name: string;
    data: string[];
}

type Props = OwnProps;
type Character = 'A' | 'E' | 'I' | 'O' | 'U' | 'Y' | 'i' | 'Ư,Ơ' | 'D,d';
type MakeHorn = 'Cả Hai' | 'Chữ Hoa' | 'Chữ Thường' | 'Không Tạo';
type CreateDotlessi = 'Tạo' | 'Không tạo';
const dataGlyph = data as DataGlyph[];
const getDataByName = (name: string) => dataGlyph.filter((item) => item.name.toLowerCase() === name.toLowerCase())[0].data;

export interface Option {
    character: Character;
    grave: string;
    graveComb: string;
    acute: string;
    acuteComb: string;
    tilde: string;
    tildeComb: string;
    dotbelow: string;
    dotbelowComb: string;
    hoi: string;
    hoiComb: string;
    breve: string;
    breveComb: string;
    horn: string;
    hornComb: string;
    dotlessi: string;
    hyphen: string;
    hyphenComb: string;
    features: string;
    makeHorn: MakeHorn;
    createDotlessi: CreateDotlessi;
    circumflex: string;
    circumflexComb: string;
}

type DataSelect = {
    name: string;
    data: string[];
    change: string;
    defaultValueIndex?: number;

    isCanNotAddItem?: boolean;
};
const dataSelect: DataSelect[] = [
    {
        name: 'Kiểu chữ',
        data: getDataByName('character'),
        change: 'character',
        isCanNotAddItem: true,
    },
    {
        name: 'Dấu Huyền',
        data: getDataByName('grave'),
        change: 'grave',
    },
    {
        name: 'Dấu Sắc',
        data: getDataByName('acute'),
        change: 'acute',
    },
    {
        name: 'Dấu Ngữa',
        data: getDataByName('tilde'),
        change: 'tilde',
    },
    {
        name: 'Dấu Hỏi',
        data: getDataByName('hoi'),
        change: 'hoi',
    },
    {
        name: 'Dấu Nặng',
        data: getDataByName('dotbelow'),
        change: 'dotbelow',
    },
    {
        name: 'Dấu Â',
        data: getDataByName('circumflex'),
        change: 'circumflex',
    },
    {
        name: 'Dấu Ă',
        data: getDataByName('breve'),
        change: 'breve',
    },
    {
        name: 'Dấu Huyền 2',
        data: getDataByName('grave'),
        change: 'graveComb',
        defaultValueIndex: 2,
    },
    {
        name: 'Dấu Sắc 2',
        data: getDataByName('acute'),
        change: 'acuteComb',
        defaultValueIndex: 2,
    },
    {
        name: 'Dấu Ngã 2',
        data: getDataByName('tilde'),
        change: 'tildeComb',
        defaultValueIndex: 2,
    },
    {
        name: 'Dấu Hỏi 2',
        data: getDataByName('hoi'),
        change: 'hoiComb',
        defaultValueIndex: 2,
    },
    {
        name: 'Dấu Móc Hoa',
        data: getDataByName('horn'),
        change: 'hoiComb',
    },
    {
        name: 'Dấu Móc Thường',
        data: getDataByName('horn'),
        change: 'hornComb',
    },
    {
        name: 'Tạo Horn',
        data: getDataByName('makeHorn'),
        change: 'makeHorn',
        isCanNotAddItem: true,
    },
    {
        name: 'Kiểu Features',
        data: getDataByName('features'),
        change: 'features',
    },
    {
        name: 'Dấu Đ Hoa',
        data: getDataByName('hyphen'),
        change: 'hyphen',
    },
    {
        name: 'Dấu Đ Thường',
        data: getDataByName('hyphen'),
        change: 'hyphenComb',
    },
    {
        name: 'Dotlessi',
        data: getDataByName('dotlessi'),
        change: 'dotlessi',
    },
    {
        name: 'Tạo Dotlessi',
        data: getDataByName('createDotlessi'),
        change: 'createDotlessi',
        isCanNotAddItem: true,
    },
];

const initialOption: Option = {
    acute: getDataByName('acute')[0],
    acuteComb: getDataByName('acute')[0],
    breve: getDataByName('breve')[0],
    breveComb: getDataByName('breve')[0],
    createDotlessi: 'Tạo',
    dotbelow: getDataByName('dotbelow')[0],
    dotbelowComb: getDataByName('dotbelow')[0],
    dotlessi: getDataByName('dotlessi')[0],
    features: getDataByName('features')[0],
    grave: getDataByName('grave')[0],
    graveComb: getDataByName('grave')[0],
    hoi: getDataByName('hoi')[0],
    hoiComb: getDataByName('hoi')[0],
    horn: getDataByName('horn')[0],
    hornComb: getDataByName('horn')[0],
    hyphen: getDataByName('hyphen')[0],
    hyphenComb: getDataByName('hyphen')[0],
    makeHorn: 'Cả Hai',
    character: 'A',
    tilde: getDataByName('tilde')[0],
    tildeComb: getDataByName('tilde')[0],
    circumflex: getDataByName('circumflex')[0],
    circumflexComb: getDataByName('circumflex')[0],
};

export const Home: FunctionComponent<Props> = (props) => {
    const [option, setOption] = useState<Option>(initialOption);
    const [string, setString] = React.useState('');
    const [result, setResult] = useState<string>('');
    const [hide, setHide] = useState<boolean>(false);
    const onchangeOption = (name: string, value: string) => {
        setOption((prevOption) => ({
            ...prevOption,
            [name]: value,
        }));
    };

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setString(e.target.value);
    };
    const changeString = (value: string) => {
        setString(value);
    };
    const generateCode = () => {
        const resultGenerate = new ToolService(option, string).generateCode();
        if (resultGenerate.error == false && resultGenerate.data) {
            setResult(resultGenerate.data || '');
            message.success(resultGenerate.message);
        } else {
            message.error(resultGenerate.message);
        }
    };
    const makeHorn = (makeWithHorn: boolean) => {
        const resultGenerate = new ToolService(option, string).generateHornMultiple(makeWithHorn);
        if (!resultGenerate.error && resultGenerate.data) {
            setResult(resultGenerate.data || '');
        }
    };
    const makeDotlessi = () => {
        const resultGenerate = new ToolService(option, string).generateDotlessiMultiple();
        if (!resultGenerate.error && resultGenerate.data) {
            setResult(resultGenerate.data || '');
        }
    };
    const filterGlyph = () => {
        const resultGenerate = new ToolService(option, string).filterGlyph();
        if (!resultGenerate.error && resultGenerate.data) {
            setResult(resultGenerate.data || '');
        }
    };

    return (
        <div>
            <Row style={{ marginBottom: 20 }}>
                <Col span={24}>
                    <Form layout={'vertical'}>
                        <Form.Item label="Ký tự" required>
                            <>
                                <TextArea
                                    showCount
                                    style={{ height: 120, marginBottom: 24 }}
                                    onChange={onChange}
                                    value={string}
                                    placeholder="Nhập ký tự cần tạo"
                                />
                            </>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Row gutter={16} style={{ marginBottom: 20 }}>
                <Col span={4}>
                    <Button onClick={() => generateCode()} style={{ width: '100%' }} type={'primary'} size={'large'}>
                        Tạo Mã
                    </Button>
                </Col>
                <Col span={4}>
                    <Button onClick={() => filterGlyph()} style={{ width: '100%' }} type={'primary'} size={'large'}>
                        Lọc Glyph
                    </Button>
                </Col>
                <Col span={4}>
                    <Button style={{ width: '100%' }} type={'primary'} size={'large'}>
                        Tạo Dotlessi
                    </Button>
                </Col>
                <Col span={4}>
                    <Popconfirm
                        onConfirm={() => {
                            makeHorn(true);
                        }}
                        onCancel={() => {
                            makeHorn(false);
                        }}
                        title="Tạo Horn"
                        description="Bạn muốn tạo horn không?"
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button style={{ width: '100%' }} type={'primary'} size={'large'}>
                            Tạo Horn
                        </Button>
                    </Popconfirm>
                </Col>
                <Col span={4}>
                    <Button
                        onClick={() => {
                            navigator.clipboard.writeText(result);
                            message.success('Copy thành công');
                        }}
                        style={{ width: '100%' }}
                        type={'primary'}
                        size={'large'}
                    >
                        Sao Chép
                    </Button>
                </Col>
                <Col span={4}>
                    <Button
                        onClick={() => {
                            setHide(!hide);
                        }}
                        style={{ width: '100%' }}
                        type={'primary'}
                        size={'large'}
                    >
                        {!hide ? 'Ẩn' : 'Hiện'} Thanh Công Cụ
                    </Button>
                </Col>
            </Row>
            {!hide && (
                <List
                    style={{ marginBottom: 20 }}
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 4,
                        xxl: 3,
                    }}
                    dataSource={dataSelect}
                    renderItem={(item) => (
                        <List.Item style={{ padding: 0 }}>
                            <SelectCustom
                                onchangeOption={onchangeOption}
                                defaultValue={item.data[item.defaultValueIndex || 0]}
                                items={item.data}
                                name={item.name}
                                change={item.change}
                                isCanNotAddItem={item.isCanNotAddItem}
                            />
                        </List.Item>
                    )}
                />
            )}
            <Row>
                <Col span={24}>
                    <Form layout={'vertical'}>
                        <Form.Item label="Kết quả" required>
                            <TextArea value={result} size={'large'} style={{ height: 220 }} placeholder="Kết quả" />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};
