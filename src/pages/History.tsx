import { Calendar, ChevronRight, Trophy } from 'lucide-react';

// Mock Data
const MOCK_HISTORY = [
    { date: '2023/12/05', pizzas: 12, score: 1540, rank: 'S' },
    { date: '2023/12/04', pizzas: 8, score: 980, rank: 'A' },
    { date: '2023/12/03', pizzas: 15, score: 1890, rank: 'SS' },
    { date: '2023/12/02', pizzas: 5, score: 620, rank: 'B' },
    { date: '2023/12/01', pizzas: 10, score: 1200, rank: 'S' },
];

const getRankColor = (rank: string) => {
    switch (rank) {
        case 'SS': return 'text-yellow-500 bg-yellow-100';
        case 'S': return 'text-orange-500 bg-orange-100';
        case 'A': return 'text-green-500 bg-green-100';
        case 'B': return 'text-blue-500 bg-blue-100';
        default: return 'text-gray-500 bg-gray-100';
    }
};

export function History() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-black text-gray-800 flex items-center gap-3">
                    <span className="text-3xl">📜</span>
                    営業履歴
                </h1>
                <p className="text-gray-500 mt-1 ml-11">過去の成果を振り返りましょう</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-1 divide-y divide-gray-100">
                    {MOCK_HISTORY.map((item, index) => (
                        <div key={index} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3 text-gray-600 font-mono font-bold">
                                    <Calendar className="w-5 h-5 text-gray-400" />
                                    {item.date}
                                </div>

                                <div className="flex items-center gap-8">
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase">Pizzas</p>
                                        <p className="font-bold text-gray-800">{item.pizzas} <span className="text-xs font-normal text-gray-400">枚</span></p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase">Score</p>
                                        <p className="font-bold text-gray-800">{item.score.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className={`px-3 py-1 rounded-full font-black text-sm ${getRankColor(item.rank)} flex items-center gap-1`}>
                                    <Trophy className="w-3 h-3" />
                                    Rank {item.rank}
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
