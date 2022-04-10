export default function Reducer(state, action) {
    switch (action.type) {
        case 'setData':
            return { formData: action.payload };

        case 'deleteForm':
            let arrayAfterFilter = state.formData.filter(el => el._id !== action.payload)
            return { formData: arrayAfterFilter };

        case 'oneForm':
            console.log(action.payload)
            return { currentFormData: action.payload };

        case 'deleteField':
            console.log(action.payload)
            let deleteArray = state.currentFormData.fields.filter(el => el._id !== action.payload)
            let newObj = {}
            newObj['name'] = state.currentFormData.name
            newObj['fields'] = deleteArray
            return { currentFormData: newObj };

        default:
            throw new Error();
    }
}