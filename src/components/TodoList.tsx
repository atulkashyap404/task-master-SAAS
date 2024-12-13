import { useState } from 'react';
import { format } from 'date-fns';
import { Todo, Priority, Category } from '@/types/todo';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2, Calendar, Search } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const categoryColors = {
  personal: 'bg-purple-100 text-purple-800',
  work: 'bg-green-100 text-green-800',
  shopping: 'bg-pink-100 text-pink-800',
  health: 'bg-teal-100 text-teal-800',
  other: 'bg-gray-100 text-gray-800',
};

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all');
  const [filterCategory, setFilterCategory] = useState<Category | 'all'>('all');
  const [filterCompleted, setFilterCompleted] = useState<'all' | 'completed' | 'active'>('all');

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = filterPriority === 'all' || todo.priority === filterPriority;
    const matchesCategory = filterCategory === 'all' || todo.category === filterCategory;
    const matchesCompleted =
      filterCompleted === 'all' ||
      (filterCompleted === 'completed' ? todo.completed : !todo.completed);

    return matchesSearch && matchesPriority && matchesCategory && matchesCompleted;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search todos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={filterPriority} onValueChange={(value) => setFilterPriority(value as Priority | 'all')}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterCategory} onValueChange={(value) => setFilterCategory(value as Category | 'all')}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="personal">Personal</SelectItem>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="shopping">Shopping</SelectItem>
            <SelectItem value="health">Health</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filterCompleted}
          onValueChange={(value) => setFilterCompleted(value as 'all' | 'completed' | 'active')}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredTodos.map((todo) => (
          <Card key={todo.id} className={todo.completed ? 'opacity-60' : ''}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => onToggle(todo.id)}
                    className="mt-1"
                  />
                  <div>
                    <CardTitle className={todo.completed ? 'line-through' : ''}>
                      {todo.title}
                    </CardTitle>
                    {todo.description && (
                      <CardDescription className="mt-1">
                        {todo.description}
                      </CardDescription>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(todo.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <Badge variant="secondary" className={priorityColors[todo.priority]}>
                  {todo.priority}
                </Badge>
                <Badge variant="secondary" className={categoryColors[todo.category]}>
                  {todo.category}
                </Badge>
                {todo.dueDate && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{format(todo.dueDate, 'PPP')}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredTodos.length === 0 && (
          <Card>
            <CardContent className="flex items-center justify-center p-6">
              <p className="text-muted-foreground">No todos found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}