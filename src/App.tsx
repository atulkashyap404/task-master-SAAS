import { AddTodoDialog } from '@/components/AddTodoDialog';
import { TodoList } from '@/components/TodoList';
import { TodoStats } from '@/components/TodoStats';
import { useTodos } from '@/hooks/useTodos';
import { CheckSquare } from 'lucide-react';

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center gap-2 font-semibold">
            <CheckSquare className="h-6 w-6" />
            <span>TaskMaster</span>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <AddTodoDialog onAddTodo={addTodo} />
        </div>

        <div className="mt-8">
          <TodoStats todos={todos} />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Your Tasks</h2>
          <div className="mt-4">
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;