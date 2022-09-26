import axios from "axios"

const errorMiddleware = (store: any) => (next: any) => (action: any) => {
    if ( action.type === 'statuses/addStatus') {
        const getStatusAdded = async () => {
            const {data} = await axios.get(`http://localhost:5000/jiraStatuses`);
            console.log(data);
        }
        console.log(getStatusAdded());
        console.log('wohoooo this is the action that you called ')
    } else {
        console.log(`you called this action : ${action}`)
        console.log("store", store)
        console.log("next", next)
        console.log("action", action)
    }
}

export default errorMiddleware;