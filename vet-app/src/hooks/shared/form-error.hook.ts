import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import * as formErrorActions from '../../redux/shared/form-error.slice'
import { IRootState } from 'redux/store'
import { IResponseBase } from 'models/response-base.model'
const useFormErrors = () => {
    const formError = useSelector<IRootState, IResponseBase>(
        (state) => state.formError
    )

    const dispatch = useDispatch()
    const setformError = useCallback(
        (formErrorObj: IResponseBase) => {
            dispatch(formErrorActions.setFormError(formErrorObj))
        },
        [dispatch]
    )

    return {
        formError,
        setformError,
    }
}

export { useFormErrors }
