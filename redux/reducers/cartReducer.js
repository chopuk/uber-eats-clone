let defaultState = {
        selectedItems: { items: [], restaurantName: ''}
}

let cartReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            let newState = { ...state }
            if (action.payload.checkboxValue) {
                console.log('ADD TO CART')
                newState.selectedItems = {
                items: [...newState.selectedItems.items, action.payload.item],
                restaurantName: action.payload.restaurantName
                }
            } else {
                console.log('REMOVE FROM CART');
                newState.selectedItems = {
                items: [
                    ...newState.selectedItems.items.filter(
                    (item) => item.title !== action.payload.item.title
                    )
                ],
                restaurantName: action.payload.restaurantName
                }
            }
            console.log(JSON.stringify(newState), "👉")
            return newState
        }
    
        default:
        return state
    }
}
    
export default cartReducer