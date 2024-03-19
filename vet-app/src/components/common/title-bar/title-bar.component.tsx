import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './title-bar.styles.scss'

type Props = {
    title: string | React.ReactNode
    subTitle?: string
    goBack?: boolean
    showButton?: boolean
    handleShow?: () => void
    buttonLabel?: string
    showExtra?: boolean
    extra?: React.ReactNode
    icon?: React.ReactNode
}

const TitleBar: React.FC<Props> = ({
    title,
    subTitle,
    goBack = false,
    showButton,
    handleShow,
    buttonLabel = 'Add Record',
    showExtra = false,
    extra,
    icon,
}) => {
    let router = useNavigate()
    const handleClick = () => {
        router(-1)
    }
    return (
        <>
            {goBack ? (
                <Button
                    type="link"
                    onClick={handleClick}
                    style={{
                        display: 'flex',
                        alignContent: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <span>
                        <ArrowLeftOutlined />
                    </span>{' '}
                    <span>Back</span>
                </Button>
            ) : (
                <></>
            )}
            <div
                style={{
                    margin: '0 0 1em 0',
                    padding: '.5em 1em',
                    background: '#fff',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <h2 style={{ marginBottom: 0, fontSize: '18px' }}>
                            {title}
                        </h2>
                        {subTitle}
                    </div>

                    <Space>
                        {showExtra && extra}
                        {showButton && (
                            <Button
                                type="primary"
                                htmlType={'button'}
                                onClick={handleShow}
                            >
                                <div
                                    style={{ display: 'flex', alignItems: 'center' }}
                                >
                                    {icon}{' '}
                                    <span
                                        className="button__text"
                                        style={{ marginLeft: 5 }}
                                    >
                                        {buttonLabel}
                                    </span>
                                </div>
                            </Button>
                        )}
                    </Space>
                </div>
            </div>
        </>
    )
}

export default TitleBar
