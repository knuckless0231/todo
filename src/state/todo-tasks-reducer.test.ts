import {AddTodolistAC, todolistsReducer} from "./todolists-reducer";
import {TasksStateType, TodolistType} from "../App";
import {taskReducer} from "./task-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = AddTodolistAC('new todolist')

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todoListID)
    expect(idFromTodolists).toBe(action.todoListID)
})