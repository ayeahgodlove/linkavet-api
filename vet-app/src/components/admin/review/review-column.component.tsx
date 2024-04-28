import { ColumnsType } from "antd/es/table";
import { IReview } from "../../../models/review.model";

export const reviewTableColumns: ColumnsType<IReview> = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '20rem',
        filtered: true,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        filtered: true,
    },
    {
        title: 'CREATED_AT',
        dataIndex: 'createdAt',
        key: 'createdAt',
        filtered: true,
    },
]
