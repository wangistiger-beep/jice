import { useState, useEffect } from 'react'
import { supabase, type Task } from './lib/supabase'
import './App.css'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDescription, setNewTaskDescription] = useState('')

  useEffect(() => {
    fetchTasks()
  }, [])

  async function fetchTasks() {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setTasks(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  async function addTask() {
    if (!newTaskTitle.trim()) return

    try {
      const { error } = await supabase
        .from('tasks')
        .insert([
          { title: newTaskTitle, description: newTaskDescription }
        ])

      if (error) throw error

      setNewTaskTitle('')
      setNewTaskDescription('')
      fetchTasks()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add task')
    }
  }

  async function toggleTask(id: string, completed: boolean) {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ completed: !completed })
        .eq('id', id)

      if (error) throw error

      fetchTasks()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task')
    }
  }

  async function deleteTask(id: string) {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)

      if (error) throw error

      fetchTasks()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task')
    }
  }

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading tasks...</div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Task Manager</h1>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        <div className="add-task">
          <input
            type="text"
            placeholder="Task title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <input
            type="text"
            placeholder="Task description"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="tasks">
          {tasks.length === 0 ? (
            <div className="empty">No tasks yet. Add one above!</div>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
                <div className="task-content">
                  <h3>{task.title}</h3>
                  {task.description && <p>{task.description}</p>}
                  <small>{new Date(task.created_at).toLocaleDateString()}</small>
                </div>
                <div className="task-actions">
                  <button
                    className="toggle"
                    onClick={() => toggleTask(task.id, task.completed)}
                  >
                    {task.completed ? '↺' : '✓'}
                  </button>
                  <button
                    className="delete"
                    onClick={() => deleteTask(task.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App
