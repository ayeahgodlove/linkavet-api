export interface IResponseBase {
    success: boolean
    message: string
    validationErrors: string[]
}

export const emptyResponseBase: IResponseBase = {
    success: false,
    message: '',
    validationErrors: [],
}
