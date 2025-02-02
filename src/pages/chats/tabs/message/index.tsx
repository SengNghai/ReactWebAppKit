import { Button, Card, List, Toast, Image } from 'antd-mobile'
import { AddSquareOutline, LeftOutline, MoreOutline } from 'antd-mobile-icons'
import { useNavigate } from "react-router";

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import i18n from '@emoji-mart/data/i18n/zh.json'

import styles from './index.module.less'

export const users = [
    {
        id: '1',
        avatar:
            'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
        name: 'Novalee Spicer',
        description: 'Deserunt dolor ea eaque eos',
    },
    {
        id: '2',
        avatar:
            'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
        name: 'Sara Koivisto',
        description: 'Animi eius expedita, explicabo',
    },
    {
        id: '3',
        avatar:
            'https://images.unsplash.com/photo-1542624937-8d1e9f53c1b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
        name: 'Marco Gregg',
        description: 'Ab animi cumque eveniet ex harum nam odio omnis',
    },
    {
        id: '4',
        avatar:
            'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
        name: 'Edith Koenig',
        description: 'Commodi earum exercitationem id numquam vitae',
    },
]


export default function Message() {
    const navigate = useNavigate();

    const onLeftClick = () => {
        console.log('点击了卡片左区域')
        navigate(-1);
    }

    const onRightClick = () => {
        console.log('点击了卡片右区域')
    }

    return (
        <div className={styles.message}>
            <Card
                icon={<LeftOutline onClick={onLeftClick} style={{ fontSize: 25, marginLeft: 12 }} />}
                title={<div style={{ fontWeight: 'normal' }}>卡片标题</div>}
                extra={<MoreOutline onClick={onRightClick} style={{  fontSize: 25, marginRight: 12 }} />}
                style={{ borderRadius: 16, padding: 0 }}
            >
                <div className={'content'}>
                    <List>
                        <List.Item
                            prefix={
                                <Image
                                    src={users[0].avatar}
                                    style={{ borderRadius: 5, marginTop: 12 }}
                                    fit='cover'
                                    width={50}
                                    height={50}
                                />
                            }
                            description={(
                                <Card
                                    style={{ borderRadius: 5, marginRight: 62, backgroundColor: '#2d2f2d', color: 'white' }}
                                >
                                    <div>
                                        <p>
                                            Used alongside an alignment keyword. Regardless of the relative sizes of the item and alignment container and whether overflow which causes data loss might happen, the given alignment value is honored.
                                        </p>
                                    </div>
                                </Card>

                            )}
                        >
                            <div style={{ fontSize: 12, textAlign: 'left', marginLeft: 12 }}>{users[0].name}</div>
                        </List.Item>
                        <List.Item
                            extra={
                                <Image
                                    src={users[0].avatar}
                                    style={{ borderRadius: 5, marginTop: 12 }}
                                    fit='cover'
                                    width={50}
                                    height={50}
                                />
                            }
                            description={(
                                <Card
                                    style={{ borderRadius: 5, marginLeft: 62, backgroundColor: 'green', color: 'white' }}
                                >
                                    <div>
                                        <p>
                                            Used alongside an alignment keyword. Regardless of the relative sizes of the item and alignment container and whether overflow which causes data loss might happen, the given alignment value is honored.
                                        </p>
                                    </div>
                                </Card>

                            )}
                        >
                            <div style={{ fontSize: 12, textAlign: 'right', marginRight: 12 }}>{users[0].name}</div>
                        </List.Item>
                    </List>
                </div>
                <div className={'footer'} onClick={e => e.stopPropagation()}>
                    <Picker data={data} i18n={i18n} onEmojiSelect={console.log} />
                    <Button
                        color='primary'
                        onClick={() => {
                            Toast.show('点击了底部按钮')
                        }}
                    >
                        底部按钮
                    </Button>
                    <AddSquareOutline />
                </div>
            </Card>
        </div>
    );
}
