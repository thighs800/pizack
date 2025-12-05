export const PizzaGrade = {
    Green: 'green', // 1-2 subtasks
    Red: 'red',     // 3-5 subtasks
    Gold: 'gold',   // 6+ subtasks
} as const;

export type PizzaGrade = typeof PizzaGrade[keyof typeof PizzaGrade];

export interface SubTask {
    id: string;
    title: string;
    isCompleted: boolean;
}

export interface Order {
    id: string;
    title: string;
    description?: string;
    subTasks: SubTask[];
    createdAt: number;
    completedAt?: number;
    status: 'cooking' | 'completed';
}

export type PizzaTopping = 'sauce' | 'cheese' | 'basil' | 'pepperoni' | 'mushroom' | 'olive';
