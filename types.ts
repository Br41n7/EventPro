
export enum EventStatus {
  PLANNING = 'Planning',
  CONFIRMED = 'Confirmed',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  dueDate: string;
}

export interface BudgetCategory {
  name: string;
  allocated: number;
  spent: number;
}

export interface Event {
  id: string;
  name: string;
  clientName: string;
  clientPhone: string; // Added for WhatsApp integration
  date: string;
  venue: string;
  status: EventStatus;
  budget: number;
  tasks: Task[];
  description: string;
  categories: BudgetCategory[];
}

export interface DashboardStats {
  totalEvents: number;
  upcomingEvents: number;
  totalRevenue: number;
  activeClients: number;
}
