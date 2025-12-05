import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { PizzaGrade } from '../types';
import type { Order, SubTask } from '../types';

const STORAGE_KEY = 'pizack_orders';

interface PizzaContextType {
  orders: Order[];
  addOrder: (title: string, description?: string) => void;
  addSubTask: (orderId: string, title: string) => void;
  toggleSubTask: (orderId: string, subTaskId: string) => void;
  completeOrder: (orderId: string) => void;
  deleteOrder: (orderId: string) => void;
  getPizzaGrade: (subTaskCount: number) => PizzaGrade;
}

const PizzaContext = createContext<PizzaContextType | undefined>(undefined);

export function PizzaProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const addOrder = (title: string, description?: string) => {
    const newOrder: Order = {
      id: crypto.randomUUID(),
      title,
      description,
      subTasks: [],
      createdAt: Date.now(),
      status: 'cooking',
    };
    setOrders((prev) => [...prev, newOrder]);
  };

  const addSubTask = (orderId: string, title: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const newSubTask: SubTask = {
          id: crypto.randomUUID(),
          title,
          isCompleted: false,
        };
        return { ...order, subTasks: [...order.subTasks, newSubTask] };
      })
    );
  };

  const toggleSubTask = (orderId: string, subTaskId: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        return {
          ...order,
          subTasks: order.subTasks.map((task) =>
            task.id === subTaskId ? { ...task, isCompleted: !task.isCompleted } : task
          ),
        };
      })
    );
  };

  const completeOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: 'completed', completedAt: Date.now() } : order
      )
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const getPizzaGrade = (subTaskCount: number): PizzaGrade => {
    if (subTaskCount >= 6) return PizzaGrade.Gold;
    if (subTaskCount >= 3) return PizzaGrade.Red;
    return PizzaGrade.Green;
  };

  return (
    <PizzaContext.Provider
      value={{
        orders,
        addOrder,
        addSubTask,
        toggleSubTask,
        completeOrder,
        deleteOrder,
        getPizzaGrade,
      }}
    >
      {children}
    </PizzaContext.Provider>
  );
}

export function usePizzaStore() {
  const context = useContext(PizzaContext);
  if (context === undefined) {
    throw new Error('usePizzaStore must be used within a PizzaProvider');
  }
  return context;
}
