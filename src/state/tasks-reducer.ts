import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    id: string,
    todoId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todoId: string
}
export type ChangeTaskStatusACType = {
    type: 'CHANGE-TASK-STATUS',
    id: string, isDone: boolean, todoId: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusACType | ChangeTodolistFilterActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoId]: state[action.todoId].filter(el => el.id !== action.id)
            }
        case 'ADD-TASK':
            const newTask = {id: '4', title: action.title, isDone: false}
            return {
                ...state,
                [action.todoId]: {newTask, ...state[action.todoId]}
            }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(el =>
                    el.id === action.id ? {...el, isDone: action.isDone} : el
                )
            }
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state];
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (id: string, todoId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', id, todoId}
}
export const addTaskAC = (title: string, todoId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title, todoId}
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todoId: string): ChangeTaskStatusACType => {
    return { type: 'CHANGE-TASK-STATUS', id, isDone, todoId}
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId}
}
