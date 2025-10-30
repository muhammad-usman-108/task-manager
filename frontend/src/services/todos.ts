const url = 'http://localhost:8080/api/tasks';

export async function getTasks() {
    const response = await fetch(url);

    if (!response.ok) throw Error('The API is not working and getting status not ok !');

    const result = await response.json();
    return result;
}