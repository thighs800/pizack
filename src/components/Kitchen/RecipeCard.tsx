import React, { useState } from 'react';
import { Trash2, Check, Plus, ChefHat } from 'lucide-react';
import { usePizzaStore } from '../../hooks/usePizzaStore';
import { PizzaBuilder } from './PizzaBuilder';
import type { Order } from '../../types';

interface RecipeCardProps {
    order: Order;
}

export function RecipeCard({ order }: RecipeCardProps) {
    const { addSubTask, toggleSubTask, completeOrder, deleteOrder } = usePizzaStore();
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;
        addSubTask(order.id, newTaskTitle);
        setNewTaskTitle('');
    };

    const isAllCompleted = order.subTasks.length > 0 && order.subTasks.every((t) => t.isCompleted);

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
            {/* Visual Side - Top */}
            <div className="p-6 bg-gray-50 flex items-center justify-center border-b border-gray-100">
                <PizzaBuilder order={order} />
            </div>

            {/* Details Side - Bottom */}
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 break-words">{order.title}</h3>
                        {order.description && <p className="text-gray-500 text-sm mt-1 break-words">{order.description}</p>}
                    </div>
                    <button
                        onClick={() => deleteOrder(order.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors shrink-0 ml-2"
                        title="削除"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>

                {/* Subtasks List */}
                <div className="flex-1 space-y-2 mb-4 overflow-y-auto max-h-60">
                    {order.subTasks.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors cursor-pointer"
                            onClick={() => toggleSubTask(order.id, task.id)}
                        >
                            <div
                                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 ${task.isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'
                                    }`}
                            >
                                {task.isCompleted && <Check className="w-3.5 h-3.5" />}
                            </div>
                            <span className={`text-sm break-words ${task.isCompleted ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                                {task.title}
                            </span>
                        </div>
                    ))}
                    {order.subTasks.length === 0 && (
                        <p className="text-gray-400 text-sm italic text-center py-4">具材がありません。タスクを追加して調理を開始してください！</p>
                    )}
                </div>

                {/* Add Task Form */}
                <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="具材 (子タスク) を追加..."
                        className="flex-1 rounded-md border-gray-300 border shadow-sm p-2 text-sm focus:border-orange-500 focus:ring-orange-500 min-w-0"
                    />
                    <button
                        type="submit"
                        className="p-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors shrink-0"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </form>

                {/* Action Button */}
                <button
                    onClick={() => completeOrder(order.id)}
                    disabled={!isAllCompleted}
                    className={`w-full py-2 px-4 rounded-md font-bold flex items-center justify-center gap-2 transition-all ${isAllCompleted
                        ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-md transform hover:-translate-y-0.5'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    <ChefHat className="w-5 h-5" />
                    {isAllCompleted ? '焼き上げる！' : '調理中...'}
                </button>
            </div>
        </div>
    );
}
