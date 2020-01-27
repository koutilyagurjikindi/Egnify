const StoreInitialState={
    addtocart:[]
}

const Storereducer=(state=StoreInitialState,action)=>{
    switch (action.type) {
        case "STORE":
            return Object.assign({}, state, action.payload)
        default:
            return  {...state}
    }
}

export {StoreInitialState,Storereducer}