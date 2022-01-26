export type CreateAction = <Type, Payload>(type: Type, payload: Payload) => { type: Type; payload: Payload }

const createAction: CreateAction = (type, payload) => ({ type, payload })

export default createAction
