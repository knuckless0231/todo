import { TasksStateType } from '../App'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./task-reducer";
import {AddTodolistAC, RemoveTodolistAC} from "./todolists-reducer";
import {v1} from "uuid";

let todoListID1:string
let todoListID2:string
let startState: TasksStateType

beforeEach(()=>{

    todoListID1 = v1()
    todoListID2 = v1()

    startState = {
        todoListID1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        todoListID2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }
})


test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC( todoListID2,'2')

    const endState = taskReducer(startState, action)

    expect(endState).toEqual({
        todoListID1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        todoListID2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
})

test('correct task should be added to correct array', () => {

    const action = addTaskAC(todoListID2,'juce')

    const endState = taskReducer(startState, action)

    expect(endState[todoListID1].length).toBe(3)
    expect(endState[todoListID2].length).toBe(4)
    expect(endState[todoListID2][0].id).toBeDefined()
    expect(endState[todoListID2][0].title).toBe('juce')
    expect(endState[todoListID2][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC(todoListID2,'2', false)

    const endState = taskReducer(startState, action)

    expect(endState[todoListID2][1].isDone).toBe(false)
    // expect().toBe()
})

test('correct title should be changed', () => {


    const action = changeTaskTitleAC(todoListID2,'2', 'sas')

    const endState = taskReducer(startState, action)

    expect(endState[todoListID2][1].title).toBe('sas')
})

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = AddTodolistAC("new todolist");

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != todoListID1 && k != todoListID2);
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = RemoveTodolistAC(todoListID2)

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todoListID2]).not.toBeDefined()
})