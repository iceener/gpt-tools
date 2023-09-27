export const getTasksSchema = {
    "name": "getTasks",
    "description": "Get (unfinished) tasks from Todoist",
    "parameters": {
        "type": "object",
        "properties": {}
    }
}

export const addTasksSchema = {
    "name": "addTasks",
    "description": "Add multiple tasks to Todoist",
    "parameters": {
        "type": "object",
        "properties": {
            "tasks": {
                "type": "array",
                "description": "List of tasks that needs to be added to the Todoist",
                "items": {
                    "type": "object",
                    "properties": {
                        "content": {
                            "type": "string",
                            "description": "Format: task description"
                        },
                        "due_string": {
                            "type": "string",
                            "description": "Natural language date user mentions, defaults to 'today' (examples: monday at 5 pm etc.)"
                        }
                    }
                }
            }
        }
    }
}

export const finishTasksSchema = {
    "name": "closeTasks",
    "description": "Finish/Complete tasks in Todoist",
    "parameters": {
        "type": "object",
        "properties": {
            "tasks": {
                "type": "array",
                "description": "List of IDs of tasks that needs to be finished/completed",
                "items": {
                    "type": "number",
                }
            }
        }
    }
}

export const updateTasksSchema = {
    "name": "updateTasks",
    "description": "Update existing tasks in Todoist based on the current tasks mentioned in the conversation.",
    "parameters": {
        "type": "object",
        "properties": {
            "tasks": {
                "type": "array",
                "description": "List of tasks that needs to be updated in the Todoist",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "number",
                            "description": "ID of the task to update"
                        },
                        "content": {
                            "type": "string",
                            "description": "Format: task description"
                        },
                        "due_string": {
                            "type": "string",
                            "description": "Natural language date user mentions, defaults to 'today' (examples: monday, monday at 5 pm etc.)"
                        }
                    }
                }
            }
        }
    }
}