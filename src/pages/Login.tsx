import { useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Mock login for now
        navigate('/team-select');
    };

    return (
        <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4">
            <div className="text-center mb-8">
                <span className="text-6xl block mb-4">🍕</span>
                <h1 className="text-4xl font-black text-orange-600 tracking-tight mb-2">Pizack</h1>
                <p className="text-gray-600">チームでピザを焼き上げる、タスク管理アプリ</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">ログイン</h2>

                <div className="space-y-4">
                    <button
                        onClick={handleLogin}
                        className="w-full py-3 px-4 bg-white border-2 border-gray-200 rounded-lg font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-3"
                    >
                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                        Googleでログイン
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">または</span>
                        </div>
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full py-3 px-4 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        ゲストとして始める
                    </button>
                </div>

                <p className="mt-6 text-center text-xs text-gray-400">
                    ログインすることで、利用規約とプライバシーポリシーに同意したことになります。
                </p>
            </div>
        </div>
    );
}
