import { ChatOpenAI } from "langchain/chat_models/openai";
import {HumanMessage, SystemMessage} from "langchain/schema";
import {currentDate, parseFunctionCall, rephrase} from "./helper.ts";
import {addTasks, closeTasks, getTasks, updateTasks} from "./todoist.ts";
import {addTasksSchema, finishTasksSchema, getTasksSchema, updateTasksSchema} from "./schema";

const model = new ChatOpenAI({modelName: "gpt-4-0613"})
    .bind({functions: [getTasksSchema, addTasksSchema, finishTasksSchema, updateTasksSchema]});

const tools: any = {getTasks, addTasks, closeTasks, updateTasks}

const act = async (query: string) => {
    console.log('User: ' + query);
    const tasks = await getTasks();
    const conversation = await model.invoke([
        new SystemMessage(`
            Fact: Today is ${currentDate()}
            Current tasks: ###${tasks.map((task: any) => task.content + ' (ID: ' + task.id + ')').join(', ')}###`),
        new HumanMessage(query),
    ]);
    const action = parseFunctionCall(conversation);

    if (action) {
        console.log(action);
        const response = await tools[action.name](action.args.tasks);
        return await rephrase(response, query);
    }

    return conversation.content;
}

console.log('AI: ' + await act('I need to write a newsletter about gpt-4 on Monday at 11 am, can you add it?'));
console.log('AI: ' + await act('Need to buy milk today, add it to my tasks'));
console.log('AI: ' + await act('Ouh I forgot! Beside milk I need to buy sugar. Update my tasks please.'));
console.log('AI: ' + await act('Get my tasks again.'));