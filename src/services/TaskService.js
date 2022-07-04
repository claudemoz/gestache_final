import axios from 'axios'

const JSON_BIN_SECRET = import.meta.env.VITE_JSON_BIN_SECRET
let API = null;
UpdateAxiosApi();


// récupération de toutes les tâches
export async function getAll(){
    const res = await API.get('/latest')
    return res.data.record
}

// Mise à jour de toutes les tâches
export async function updateAll(newTask){
    const res = await API.put('/', newTask)
}

export async function UpdateAxiosApi(){
    API = axios.create({
    baseURL: 'https://api.jsonbin.io/v3/b/' + localStorage.getItem('JsonBinID'),
    headers: { 'X-Master-Key': localStorage.getItem('JsonBinKey') }
});
}
