import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Camera, Plus, LogOut, Check } from 'lucide-react';

// Mock Data
const MOCK_USER = {
    id: 'user-1',
    name: '田中 太郎',
    icon: '👨‍🍳',
    email: 'tanaka@example.com',
};

const MOCK_TEAMS = [
    { id: 'team-1', name: '株式会社ピザック 開発部', role: 'Manager', active: true },
    { id: 'team-2', name: '趣味の個人開発', role: 'Owner', active: false },
    { id: 'team-3', name: 'ハッカソンチームA', role: 'Member', active: false },
];

export function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(MOCK_USER);
    const [teams, setTeams] = useState(MOCK_TEAMS);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(user.name);

    const handleSaveProfile = () => {
        setUser(prev => ({ ...prev, name: editName }));
        setIsEditing(false);
    };

    const handleSwitchTeam = (teamId: string) => {
        setTeams(prev => prev.map(t => ({
            ...t,
            active: t.id === teamId
        })));
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            {/* Profile Section */}
            <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
                    <User className="w-6 h-6" />
                    プロフィール設定
                </h2>

                <div className="flex items-start gap-8">
                    <div className="relative group cursor-pointer">
                        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-6xl border-4 border-white shadow-md">
                            {user.icon}
                        </div>
                        <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">表示名</label>
                            {isEditing ? (
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="flex-1 px-3 py-2 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-orange-500 font-bold text-gray-800"
                                    />
                                    <button
                                        onClick={handleSaveProfile}
                                        className="bg-orange-600 text-white px-4 rounded-lg hover:bg-orange-700 transition-colors"
                                    >
                                        <Check className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between group">
                                    <p className="text-2xl font-bold text-gray-800">{user.name}</p>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="text-sm text-orange-600 font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        編集
                                    </button>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">メールアドレス</label>
                            <p className="text-gray-600 font-mono">{user.email}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Teams Section */}
            <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black text-gray-800 flex items-center gap-2">
                        <span className="text-2xl">🏢</span>
                        所属チーム
                    </h2>
                    <button
                        onClick={() => navigate('/team-select')}
                        className="text-sm font-bold text-orange-600 hover:bg-orange-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                    >
                        <Plus className="w-4 h-4" />
                        チームを追加
                    </button>
                </div>

                <div className="space-y-3">
                    {teams.map((team) => (
                        <div
                            key={team.id}
                            onClick={() => handleSwitchTeam(team.id)}
                            className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between group ${team.active
                                    ? 'border-orange-500 bg-orange-50 shadow-sm'
                                    : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-3 h-3 rounded-full ${team.active ? 'bg-orange-500' : 'bg-gray-300'}`} />
                                <div>
                                    <p className={`font-bold ${team.active ? 'text-gray-900' : 'text-gray-600'}`}>
                                        {team.name}
                                    </p>
                                    <p className="text-xs text-gray-400 font-bold">{team.role}</p>
                                </div>
                            </div>

                            {team.active && (
                                <span className="text-xs font-bold text-orange-600 bg-white px-2 py-1 rounded border border-orange-200">
                                    選択中
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <div className="text-center">
                <button
                    onClick={() => navigate('/login')}
                    className="text-gray-400 hover:text-red-500 font-bold text-sm flex items-center justify-center gap-2 mx-auto transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    ログアウト
                </button>
            </div>
        </div>
    );
}
