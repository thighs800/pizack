import { useNavigate } from 'react-router-dom';
import { usePizzaStore } from '../hooks/usePizzaStore';
import { Trophy, ArrowRight, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export function Result() {
    const navigate = useNavigate();
    const { orders } = usePizzaStore();
    const completedOrders = orders.filter((o) => o.status === 'completed');

    const totalPizzas = completedOrders.length;
    const totalToppings = completedOrders.reduce((acc, o) => acc + o.subTasks.length, 0);

    // Calculate score (simple mock logic)
    const score = totalPizzas * 100 + totalToppings * 10;

    return (
        <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Confetti / Background decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-4xl"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: -50,
                            rotate: 0
                        }}
                        animate={{
                            y: window.innerHeight + 50,
                            rotate: 360
                        }}
                        transition={{
                            duration: Math.random() * 2 + 3,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                    >
                        {['🍕', '🎉', '✨', '🧀'][Math.floor(Math.random() * 4)]}
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg text-center relative z-10 border-4 border-orange-200"
            >
                <div className="mb-6">
                    <span className="text-6xl block mb-2">🧑‍🍳</span>
                    <h1 className="text-3xl font-black text-gray-800 tracking-tight">本日の営業終了！</h1>
                    <p className="text-gray-500 font-bold mt-2">お疲れ様でした！素晴らしい仕事ぶりです。</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                        <p className="text-sm text-gray-500 font-bold mb-1">配達したピザ</p>
                        <p className="text-4xl font-black text-orange-600">{totalPizzas}<span className="text-base font-normal text-gray-400 ml-1">枚</span></p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                        <p className="text-sm text-gray-500 font-bold mb-1">トッピング総数</p>
                        <p className="text-4xl font-black text-yellow-600">{totalToppings}<span className="text-base font-normal text-gray-400 ml-1">個</span></p>
                    </div>
                </div>

                <div className="bg-gray-900 text-white p-6 rounded-xl mb-8 relative overflow-hidden group">
                    <div className="relative z-10">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Score</p>
                        <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                            {score.toLocaleString()}
                        </p>
                    </div>
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Trophy className="w-24 h-24 text-yellow-400" />
                    </div>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => navigate('/history')}
                        className="w-full py-3 px-4 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        履歴を確認する
                    </button>
                    <button
                        onClick={() => navigate('/kitchen')}
                        className="w-full py-3 px-4 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        次の営業へ (キッチンに戻る)
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
