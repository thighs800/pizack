import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, ArrowRight } from 'lucide-react';

export function TeamSelect() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'create' | 'join'>('create');
    const [teamName, setTeamName] = useState('');
    const [inviteCode, setInviteCode] = useState('');

    const handleCreateTeam = () => {
        if (!teamName.trim()) return;
        // Mock team creation
        localStorage.setItem('pizack_team', JSON.stringify({ name: teamName, role: 'owner' }));
        navigate('/kitchen');
    };

    const handleJoinTeam = () => {
        if (!inviteCode.trim()) return;
        // Mock team joining
        localStorage.setItem('pizack_team', JSON.stringify({ code: inviteCode, role: 'member' }));
        navigate('/kitchen');
    };

    return (
        <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4">
            <div className="text-center mb-8">
                <span className="text-5xl block mb-4">🤝</span>
                <h1 className="text-3xl font-black text-gray-800 tracking-tight mb-2">チームを選択</h1>
                <p className="text-gray-600">仲間と一緒にピザ作りを始めましょう</p>
            </div>

            <div className="bg-white p-2 rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                {/* Tabs */}
                <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab('create')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'create'
                                ? 'bg-white text-orange-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <Plus className="w-4 h-4" />
                        チームを作成
                    </button>
                    <button
                        onClick={() => setActiveTab('join')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'join'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <Users className="w-4 h-4" />
                        チームに参加
                    </button>
                </div>

                <div className="px-6 pb-6">
                    {activeTab === 'create' ? (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">チーム名</label>
                                <input
                                    type="text"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    placeholder="例: 株式会社ピザック 開発部"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                                />
                            </div>
                            <div className="bg-orange-50 p-4 rounded-lg text-sm text-orange-800 border border-orange-100">
                                <p className="font-bold mb-1">💡 ヒント</p>
                                チームを作成すると、他のメンバーを招待するためのコードが発行されます。
                            </div>
                            <button
                                onClick={handleCreateTeam}
                                disabled={!teamName.trim()}
                                className="w-full py-3 px-4 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                            >
                                チームを作成して開始
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">招待コード</label>
                                <input
                                    type="text"
                                    value={inviteCode}
                                    onChange={(e) => setInviteCode(e.target.value)}
                                    placeholder="例: PIZZA-1234"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-mono"
                                />
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 border border-blue-100">
                                <p className="font-bold mb-1">💡 ヒント</p>
                                チームの管理者から共有された招待コードを入力してください。
                            </div>
                            <button
                                onClick={handleJoinTeam}
                                disabled={!inviteCode.trim()}
                                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                            >
                                チームに参加して開始
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
