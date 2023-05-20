export const saveSate = (state) => {
    try{
        const serializedState = JSON.stringify(state)
        localStorage.setItem('store', serializedState)
    }catch(e){
        throw e
    }
}

export const loadState = () => {
    try{
        const serializedState = localStorage.getItem('store')
        return serializedState != null ? JSON.parse(serializedState) : undefined
    }catch(e){
        throw e
    }

}

export const clearState = () => {
    try{
        localStorage.clear()
    }catch(e){
        throw e
    }
}