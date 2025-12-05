import { usePizzaStore } from '../hooks/usePizzaStore';
import { OrderManager } from '../components/Kitchen/OrderManager';
import { RecipeCard } from '../components/Kitchen/RecipeCard';
import { DeliveryTower } from '../components/Kitchen/DeliveryTower';

export function Kitchen() {
    const { orders } = usePizzaStore();
    const activeOrders = orders.filter((o) => o.status === 'cooking');

    return (
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">

            {/* Left Column (20%): Order Manager */}
            {/* Sticky only on large screens to prevent overlap on mobile */}
            <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-24">
                <OrderManager />
            </div>

            {/* Center Column (60%): Active Orders (Cutting Boards) */}
            <div className="lg:col-span-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-2xl">🔪</span> まな板 (調理中)
                </h2>

                {activeOrders.length === 0 ? (
                    <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
                        <span className="text-4xl block mb-4">😴</span>
                        <h3 className="text-lg font-medium text-gray-900">キッチンは静かです</h3>
                        <p className="text-gray-500 mt-1">新しいオーダーを追加して調理を始めましょう！</p>
                    </div>
                ) : (
                    // Grid View for Active Orders - Added 2xl:grid-cols-3 for wide screens
                    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                        {activeOrders.map((order) => (
                            <RecipeCard key={order.id} order={order} />
                        ))}
                    </div>
                )}
            </div>

            {/* Right Column (20%): Delivery Tower */}
            {/* Sticky only on large screens */}
            <div className="lg:col-span-2 h-auto lg:h-[calc(100vh-8rem)] lg:sticky lg:top-24">
                <DeliveryTower />
            </div>
        </div>
    );
}
