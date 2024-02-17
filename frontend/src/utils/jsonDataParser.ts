
export const parseData = (json: {
    data: any
})=>{
    return json.data;
}

export const parseGenericFromData = <T>(json: {
    data: T
}) => {
    return json.data;
}