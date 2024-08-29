import {list, check, todo, home} from "./icons"

const menu = [
    {
        id: 1,
        title: "All tasks",
        icon: home,
        link: "/"
    },
    {
        id: 2,
        title: "Important!",
        icon: list,
        link: "/important"
    },
    {
        id: 3,
        title: "Completed tasks",
        icon: check,
        link: "/completed"
    },
    {
        id: 4,
        title: "Still open",
        icon: todo,
        link: "/incompleted"
    },
    
]
export default menu;