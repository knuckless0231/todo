import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {AddTodolistAC, AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


const initialState: TasksStateType = {}


export const taskReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state,[action.todoListID]:state[action.todoListID].filter(f=>f.id !== action.taskID)}

        case "ADD-TASK" :
            const newTask = {id:v1(),title:action.title,isDone:false}
            return {...state,[action.todoListID]:[newTask,...state[action.todoListID]]}
        case "CHANGE-TASK-STATUS":
            return {...state,[action.todoListID]:state[action.todoListID]
                    .map(m=>m.id === action.taskID ? {...m,isDone:action.isDone}: m)}

        case "CHANGE-TASK-TITLE":
            return {...state,[action.todoListID]:state[action.todoListID]
                    .map(m=>m.id === action.taskID ? {...m,title:action.title}: m)}

        case "ADD-TODOLIST":
            return {...state,[action.todoListID]:[]}

        case "REMOVE-TODOLIST": {

            let deleteTodo = {...state}
            delete deleteTodo[action.id]
           return deleteTodo
        }

        default:
          return state
    }
}

type ActionsType = removeTaskType | addTaskType | changeTaskStatusType
    | changeTaskTitleType| AddTodolistActionType | RemoveTodolistActionType

// AddTodolistActionType берётся из AddtodoReducer ив внутри

export type removeTaskType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todoListID: string, taskID:string) => {
    return { type: 'REMOVE-TASK',todoListID,taskID} as const
}

export type addTaskType = ReturnType<typeof addTaskAC>

export const addTaskAC = (todoListID:string,title:string) => {
    return{type: 'ADD-TASK',todoListID,title}as const
}

export type changeTaskStatusType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (todoListID: string, taskID:string,isDone:boolean) => {
    return{type:'CHANGE-TASK-STATUS',todoListID,taskID,isDone}as const
}

export type changeTaskTitleType = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (todoListID:string, taskID:string,title:string ) => {
    return{type:'CHANGE-TASK-TITLE',todoListID,taskID,title}as const
}
