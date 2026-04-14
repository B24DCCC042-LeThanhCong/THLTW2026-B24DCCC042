export type Status = 'OPEN' | 'CLOSED' | 'PAUSED';

export interface Course {
  id: number;
  name: string;
  teacher: string;
  students: number;
  status: Status;
  description?: string;
}