import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import type { FirebaseError } from 'firebase/app';
import { auth } from '../lib/firebase';

export function Login() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            navigate('/team-select');
        } catch (err: unknown) {
            if ((err as { code?: string }).code) {
                const firebaseErr = err as FirebaseError;
                switch (firebaseErr.code) {
                    case 'auth/invalid-email':
                        setError('メールアドレスの形式が正しくありません。');
                        break;
                    case 'auth/user-disabled':
                        setError('このユーザーは無効化されています。');
                        break;
                    case 'auth/user-not-found':
                        setError('ユーザーが見つかりません。');
                        break;
                    case 'auth/wrong-password':
                        setError('パスワードが間違っています。');
                        break;
                    case 'auth/email-already-in-use':
                        setError('このメールアドレスは既に使用されています。');
                        break;
                    case 'auth/weak-password':
                        setError('パスワードは6文字以上で設定してください。');
                        break;
                    default:
                        setError('エラーが発生しました: ' + firebaseErr.message);
                }
            } else {
                setError('予期せぬエラーが発生しました。');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <span className="text-6xl block mb-2">🍕</span>
                    <h1 className="text-3xl font-black text-orange-600 tracking-tight">Pizack</h1>
                    <p className="text-gray-500 font-medium">
                        {isLogin ? 'おかえりなさい、シェフ！' : '新しいシェフの登録'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm font-bold border border-red-100 flex items-center gap-2">
                        <span>⚠️</span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">メールアドレス</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium"
                                placeholder="chef@pizack.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">パスワード</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium"
                                placeholder="••••••••"
                                minLength={6}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-600/20 transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {loading ? '処理中...' : (isLogin ? 'キッチンに入る' : 'シェフ登録する')}
                    </button>
                </form>

                <div className="text-center">
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError(null);
                        }}
                        className="text-sm font-bold text-gray-500 hover:text-orange-600 transition-colors"
                    >
                        {isLogin ? '新規登録はこちら' : 'ログインはこちら'}
                    </button>
                </div>
            </div>
        </div>
    );
}
