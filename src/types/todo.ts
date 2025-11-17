// types/todo.ts
export interface Todo {
  id: number;
  title: string;
  description: string;
  priority: "low" | "moderate" | "extreme";
  is_completed: boolean;
  position: number;
  todo_date: string;
  created_at: string;
  updated_at: string;
}

export interface TodosResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Todo[];
}
