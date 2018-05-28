export const updateObject = (oldObject, updatedPropertires) => {
    return {
        ...oldObject,
        ...updatedPropertires
    }
}