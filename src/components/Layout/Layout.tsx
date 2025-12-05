import { HelpCircle } from 'lucide-react';
import { Outlet, NavLink as RouterNavLink } from 'react-router-dom';
import { usePizzaStore } from '../../hooks/usePizzaStore';

function NavLink({ to, icon, label }: { to: string; icon: string; label: string }) {
    return (
        <RouterNavLink
            to={to}
            className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${isActive
                    ? 'bg-white text-orange-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                }`
            }
        >
            <span>{icon}</span>
            <span>{label}</span>
        </RouterNavLink>
    );
}

export function Layout() {
    const { orders } = usePizzaStore();
    const completedOrders = orders.filter((o) => o.status === 'completed');

    return (
        <div className="min-h-screen bg-orange-50 font-sans text-gray-900">
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-3xl">🍕</span>
                                <h1 className="text-2xl font-black text-orange-600 tracking-tight hidden sm:block">Pizack</h1>
                            </div>

                            {/* Navigation */}
                            <nav className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg ml-4">
                                <NavLink to="/kitchen" icon="🍳" label="マイキッチン" />
                                <NavLink to="/team" icon="🏢" label="チーム" />
                                <NavLink to="/history" icon="📜" label="履歴" />
                            </nav>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Rule Tooltip */}
                            <div className="relative group">
                                <HelpCircle className="w-6 h-6 text-gray-400 hover:text-orange-500 cursor-help transition-colors" />
                                <div className="absolute left-0 top-full mt-2 w-72 bg-white p-4 rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <h3 className="font-bold text-gray-700 mb-2 border-b pb-1">キッチンのルール</h3>
                                    <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                                        <li>1 機能 = 1 ピザ</li>
                                        <li>タスクを具材に分解しよう</li>
                                        <li><span className="text-green-600 font-bold">緑の箱</span>: 1-2 タスク (おやつ)</li>
                                        <li><span className="text-red-600 font-bold">赤の箱</span>: 3-5 タスク (標準)</li>
                                        <li><span className="text-yellow-600 font-bold">金の箱</span>: 6+ タスク (デラックス)</li>
                                    </ul>
                                </div>
                            </div>

                            {/* End Day Button */}
                            <RouterNavLink
                                to="/result"
                                className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-700 transition-colors shadow-sm flex items-center gap-2"
                            >
                                <span>🏁</span>
                                営業終了
                            </RouterNavLink>
                        </div>
                    </div>

                    <div className="text-sm font-medium text-gray-500">
                        配達済み: <span className="text-orange-600 font-bold">{completedOrders.length}</span> 枚
                    </div>
                </div>
            </header>

            <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
}
