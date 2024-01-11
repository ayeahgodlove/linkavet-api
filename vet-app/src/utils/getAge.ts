import moment from 'moment'

export const getAge = (dob: Date) => {
    const a = moment(dob)
    const b = moment(new Date())
    const years = b.diff(a, 'year')
    const months = b.diff(a, 'months')
    if (years < 5) {
        return `${years} year${years > 1 ? 's' : ''} ${months} months`
    }

    return `${years}`
}
