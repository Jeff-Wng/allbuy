// function used in Reducers for easier updates to state
export const updateObject = (oldObject, updatedPropertires) => {
    return {
        ...oldObject,
        ...updatedPropertires
    }
}