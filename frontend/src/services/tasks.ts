const url = 'http://localhost:8080/api/tasks';

export async function getTasks(pageNumber: number, pageSize: number) {
    const response = await fetch(`${url}?page=${pageNumber}&size=${pageSize}`);

    if (!response.ok) throw Error('The API is not working and getting status not ok !');

    const result = await response.json();
    return result;
}

export async function createTask(task: { name: string; description: string; status: string }) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });

    if (!response.ok) {
        throw new Error(`Failed to create task. Status: ${response.status}`);
    }

    const result = await response.json();
    return result; 
}


export async function updateTask(data: { id: number; updatedTask: { name: string; description: string; status: string } }) {
    const response = await fetch(`${url}/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data.updatedTask),
    });

    if (!response.ok) {
        throw new Error(`Failed to update task. Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
}

export async function deleteTask(id: number) {
    const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to delete task. Status: ${response.status}`);
    }

    try {
        const result = await response.json();
        return result;
    } catch {
        return { message: 'Task deleted successfully' };
    }
}
