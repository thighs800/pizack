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
            <span className="hidden lg:inline">{label}</span>
        </RouterNavLink>
    );
}

export function Layout() {
    const { orders } = usePizzaStore();
    const completedOrders = orders.filter((o) => o.status === 'completed');

    return (
        <div className="min-h-screen bg-orange-50 font-sans text-gray-900">
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center relative">
                    {/* Left: Logo & Team Switcher */}
                    <div className="flex items-center gap-4 lg:gap-6 z-20">
                        <div className="flex items-center gap-2 shrink-0">
                            <span className="text-3xl">🍕</span>
                            <h1 className="text-2xl font-black text-orange-600 tracking-tight hidden xl:block">Pizack</h1>
                        </div>

                        {/* Team Switcher */}
                        <div className="relative group cursor-pointer shrink-0">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors max-w-[160px] sm:max-w-[240px]">
                                <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                                <span className="font-bold text-sm text-gray-700 truncate">株式会社ピザック 開発部</span>
                                <span className="text-xs text-gray-400 shrink-0">▼</span>
                            </div>

                            {/* Dropdown */}
                            <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                                <div className="p-2 border-b border-gray-100">
                                    <p className="text-xs font-bold text-gray-400 px-2 py-1">チーム切替</p>
                                </div>
                                <div className="p-1">
                                    <button className="w-full text-left px-3 py-2 rounded-lg bg-orange-50 text-orange-700 font-bold text-sm flex items-center justify-between">
                                        <span className="truncate">株式会社ピザック 開発部</span>
                                        <span className="text-orange-500 shrink-0">✓</span>
                                    </button>
                                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-600 font-bold text-sm flex items-center justify-between">
                                        <span className="truncate">趣味の個人開発</span>
                                    </button>
                                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-600 font-bold text-sm flex items-center justify-between">
                                        <span className="truncate">ハッカソンチームA</span>
                                    </button>
                                </div>
                                <div className="p-2 border-t border-gray-100 bg-gray-50">
                                    <RouterNavLink to="/team-select" className="block w-full text-center py-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 border border-orange-200 rounded bg-white hover:bg-orange-50 transition-colors">
                                        + チームを追加
                                    </RouterNavLink>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Center: Navigation */}
                    {/* Always visible, labels hidden on small screens */}
                    <nav className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <NavLink to="/kitchen" icon="🍳" label="マイキッチン" />
                        <NavLink to="/team" icon="🏢" label="チーム" />
                        <NavLink to="/history" icon="📜" label="履歴" />
                    </nav>

                    {/* Right: Stats & Actions */}
                    <div className="flex items-center gap-2 sm:gap-4 z-20">
                        {/* Delivery Count */}
                        <div className="hidden xl:flex flex-col items-end mr-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Today's Delivery</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-orange-600">{completedOrders.length}</span>
                                <span className="text-xs font-bold text-gray-500">枚</span>
                            </div>
                        </div>

                        {/* End Day Button */}
                        <RouterNavLink
                            to="/result"
                            className="bg-gray-800 text-white w-10 h-10 sm:w-auto sm:px-4 sm:py-2 rounded-full sm:rounded-lg text-sm font-bold hover:bg-gray-700 transition-colors shadow-sm flex items-center justify-center gap-2 shrink-0"
                            title="営業終了"
                        >
                            <span>🏁</span>
                            <span className="hidden sm:inline">営業終了</span>
                        </RouterNavLink>

                        {/* Rule Tooltip */}
                        <div className="relative group shrink-0">
                            <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-help">
                                <HelpCircle className="w-6 h-6 text-gray-400 group-hover:text-orange-500" />
                            </div>
                            <div className="absolute right-0 top-full mt-2 w-72 bg-white p-4 rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
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

                        {/* User Profile Link */}
                        <RouterNavLink
                            to="/profile"
                            className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-xl border-2 border-white shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer shrink-0"
                            title="プロフィール設定"
                        >
                            👨‍🍳
                        </RouterNavLink>
                    </div>
                </div>
            </header>

            <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
}
