export type AddTodoRequestBody = {
    title: string
    status: 'PENDING' | 'DOING' | 'COMPLETE'
}