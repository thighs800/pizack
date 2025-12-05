import { useState } from 'react';
import { DeliveryTower } from '../components/Kitchen/DeliveryTower';
import type { Order } from '../types';
import { Heart, Trophy } from 'lucide-react';

// Mock Data Generator
const generateMockOrders = (count: number): Order[] => {
    return Array.from({ length: count }).map((_, i) => ({
        id: `mock-${i}`,
        title: `完了タスク ${i + 1}`,
        description: '',
        subTasks: Array.from({ length: Math.floor(Math.random() * 5) + 2 }), // Random subtasks
        createdAt: Date.now(),
        status: 'completed',
        completedAt: Date.now(),
    } as Order));
};

const MOCK_MEMBERS = [
    { id: 1, name: '田中 太郎', role: 'Manager', orders: generateMockOrders(8), likes: 12 },
    { id: 2, name: '鈴木 花子', role: 'Developer', orders: generateMockOrders(5), likes: 8 },
    { id: 3, name: '佐藤 次郎', role: 'Designer', orders: generateMockOrders(12), likes: 24 },
    { id: 4, name: '山田 健太', role: 'Developer', orders: generateMockOrders(3), likes: 5 },
];

export function TeamDashboard() {
    const [members, setMembers] = useState(MOCK_MEMBERS);

    const handleLike = (memberId: number) => {
        setMembers(prev => prev.map(m =>
            m.id === memberId ? { ...m, likes: m.likes + 1 } : m
        ));
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-gray-800 flex items-center gap-3">
                        <span className="text-3xl">🏢</span>
                        株式会社ピザック 開発部
                    </h1>
                    <p className="text-gray-500 mt-1 ml-11">メンバー: 4名 | 本日の総配達数: {members.reduce((acc, m) => acc + m.orders.length, 0)}枚</p>
                </div>
                <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    チームランク: ゴールド
                </div>
            </div>

            {/* Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {members.map((member) => (
                    <div key={member.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-[500px]">
                        {/* Member Header */}
                        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg text-gray-800">{member.name}</h3>
                                <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                                    {member.role}
                                </span>
                            </div>
                            <button
                                onClick={() => handleLike(member.id)}
                                className="flex flex-col items-center group"
                            >
                                <div className="p-2 rounded-full bg-pink-50 text-pink-400 group-hover:bg-pink-100 group-hover:text-pink-500 transition-colors">
                                    <Heart className="w-5 h-5 fill-current" />
                                </div>
                                <span className="text-xs font-bold text-pink-500">{member.likes}</span>
                            </button>
                        </div>

                        {/* Tower Area */}
                        <div className="flex-1 p-4 bg-orange-50/30 overflow-hidden">
                            <DeliveryTower orders={member.orders} compact={true} />
                        </div>

                        {/* Footer Stats */}
                        <div className="p-3 bg-white border-t text-center text-sm text-gray-600">
                            本日: <span className="font-bold text-orange-600">{member.orders.length}</span> 枚
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
