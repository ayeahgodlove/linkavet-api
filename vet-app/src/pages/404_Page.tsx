import { Button,  Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router'

const NotFoundPage: React.FC = () => {
    const router = useNavigate()
    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                display: 'grid',
                placeItems: 'center',
            }}
        >
             <Result
                // status="404"
                title="404"
                icon={<img src='./honey-man.png'alt='404 icon for page' />}
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button type="primary" onClick={() => router(-1)}>
                        Back Home
                    </Button>
                }
            />
        </div>
    )
}

export default NotFoundPage
