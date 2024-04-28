import { FormInstance } from 'antd'
import { UpdateMode } from '../../models/shared/update-mode.enum'
import moment from 'moment'
import { FieldData } from 'rc-field-form/lib/interface'

export const useFormInit = () => {
    function initFormData<T>(
        form: FormInstance<any>,
        formMode: UpdateMode,
        obj: T,
        dateColumns?: Array<string>
    ) {
        let keys = Object.keys(obj as any)
        if (dateColumns && dateColumns.length > 0) {
            keys = keys.filter((key) => !dateColumns.includes(key))
        }

        if (formMode === UpdateMode.ADD) {
            form.resetFields()
        }

        if (formMode === UpdateMode.EDIT) {
            const fieldData: FieldData[] = []
            keys.map((key) => {
                fieldData.push({
                    name: [key],
                    value: obj[key as keyof T],
                })
            })

            if (dateColumns && dateColumns.length > 0) {
                dateColumns.map((col) => {
                    fieldData.push({
                        name: [col],
                        value: moment(obj[col as keyof T]!!),
                    })
                })
            }
            form.setFields(fieldData)
        }
    }

    return {
        initFormData,
    }
}
