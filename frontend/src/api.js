const url = "http://localhost";
const port = 8000;

const api = {
    getItems: () => fetch(`${url}:${port}/api/items`),
    addListItem: (text) => fetch(`${url}:${port}/api/item`, {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify ({text})
    }),
    removeListItem: (id) => fetch(`${url}:${port}/api/item/${id}`, {
        headers: { 'Content-Type': 'application/json'},
        method: 'DELETE', 
    }),
    editListItem: ({text, isCompleted, id}) => fetch(`http://localhost:8000/api/item/${id}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PUT', 
        body: JSON.stringify ({text, isCompleted})})
}

export default api;