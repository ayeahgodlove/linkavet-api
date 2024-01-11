import { Button, Card, Empty } from 'antd'
import React from 'react'

interface Props {
    title: string
    showButton?: boolean
    handleClick?: () => void
    buttonLabel?: string;
    children?: React.ReactNode
}

export const NoContent: React.FunctionComponent<Props> = ({
    title,
    handleClick,
    showButton = false,
    buttonLabel,
    children
}) => {
    return (
        <Card bordered={false} size="small" style={{ borderRadius: 0}}>
            <div
                style={{
                    minHeight: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Empty description={title} style={{ marginBottom: '1em' }} />
                {children}

                {showButton && (
                    <Button type="primary" onClick={handleClick}>
                        {buttonLabel}
                    </Button>
                )}
            </div>
        </Card>
    )
}
