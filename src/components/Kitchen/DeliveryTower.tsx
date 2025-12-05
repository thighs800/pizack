import { motion } from 'framer-motion';
import { PizzaGrade } from '../../types';
import { usePizzaStore } from '../../hooks/usePizzaStore';
import { useEffect, useRef, useState } from 'react';

import type { Order } from '../../types';

interface DeliveryTowerProps {
    orders?: Order[];
    compact?: boolean;
}

export function DeliveryTower({ orders: propOrders, compact = false }: DeliveryTowerProps) {
    const { orders: storeOrders, getPizzaGrade } = usePizzaStore();
    const orders = propOrders || storeOrders;
    // Sort by completedAt ascending (Oldest first)
    // We want to stack from bottom to top.
    // Oldest at bottom, Newest at top.
    const completedOrders = orders
        .filter((o) => o.status === 'completed')
        .sort((a, b) => (a.completedAt || 0) - (b.completedAt || 0));

    const boxColors = {
        [PizzaGrade.Green]: 'bg-green-600 border-green-800',
        [PizzaGrade.Red]: 'bg-red-600 border-red-800',
        [PizzaGrade.Gold]: 'bg-yellow-500 border-yellow-700',
    };

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [hoveredOrder, setHoveredOrder] = useState<{ id: string; x: number; y: number } | null>(null);

    // Auto-scroll to top when new order is added
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [completedOrders.length]);

    const handleMouseEnter = (e: React.MouseEvent, orderId: string) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setHoveredOrder({
            id: orderId,
            x: rect.left,
            y: rect.top + rect.height / 2,
        });
    };

    const handleMouseLeave = () => {
        setHoveredOrder(null);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col relative">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">🗼</span> ピザタワー
            </h2>

            {/* 
        Scrollable container.
        flex-col-reverse makes items start from bottom.
        However, standard scrolling behavior with flex-col-reverse can be tricky.
        
        Alternative approach:
        Use flex-col and justify-end.
        This pushes items to the bottom if there are few.
        If there are many, they overflow top? No, they overflow bottom.
        
        We want:
        - Few items: Stacked at bottom.
        - Many items: Stacked from bottom, scrollable to see top (newest).
        
        If we use flex-col-reverse:
        - DOM order: Newest (last in array) is first child? No.
        - flex-col-reverse renders last child at TOP.
        - So if we have [Oldest, ..., Newest].
        - Last child (Newest) is at TOP.
        - First child (Oldest) is at BOTTOM.
        - This matches our visual requirement.
        
        Scrolling:
        - If content overflows, we want to scroll to see the top.
        - flex-col-reverse usually anchors scroll to bottom.
        
        Let's try standard flex-col-reverse with overflow-y-auto.
      */}

            <div
                ref={scrollContainerRef}
                className={`flex-1 bg-blue-50 rounded-lg border-b-8 border-gray-300 relative flex flex-col-reverse items-center overflow-y-auto min-h-0 ${compact ? 'p-2' : 'p-4'}`}
            >
                {completedOrders.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 opacity-50 pointer-events-none text-xs">
                        配達待ち...
                    </div>
                )}

                {/* 
           completedOrders is sorted Oldest -> Newest.
           flex-col-reverse puts the Last item (Newest) at the Top.
           First item (Oldest) at the Bottom.
           This is correct for a stack.
        */}
                {[...completedOrders].map((order) => {
                    const grade = getPizzaGrade(order.subTasks.length);
                    return (
                        <motion.div
                            key={order.id}
                            className={`${compact ? 'w-24 h-6 text-[10px]' : 'w-48 h-12 text-xs'} ${boxColors[grade]} border-b-4 rounded-sm shadow-lg mb-[-4px] z-10 flex items-center justify-center relative group shrink-0 cursor-pointer`}
                            initial={{ y: -500, opacity: 0, rotate: Math.random() * 4 - 2 }}
                            animate={{ y: 0, opacity: 1, rotate: Math.random() * 2 - 1 }}
                            transition={{ type: 'spring', bounce: 0.4 }}
                            whileHover={{ scale: 1.05, zIndex: 50 }}
                            onMouseEnter={(e) => handleMouseEnter(e, order.id)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="w-full h-full absolute top-0 left-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                            <span className="text-white font-bold truncate px-2 drop-shadow-md">
                                {order.title}
                            </span>
                        </motion.div>
                    );
                })}
            </div>

            {/* Tooltip Portal (Rendered outside overflow container) */}
            {hoveredOrder && (
                <div
                    className="fixed z-[9999] pointer-events-none"
                    style={{
                        left: hoveredOrder.x - 10,
                        top: hoveredOrder.y,
                        transform: 'translate(-100%, -50%)'
                    }}
                >
                    <div className="bg-gray-800 text-white text-xs p-2 rounded shadow-xl w-48 whitespace-normal break-words relative">
                        {(() => {
                            const order = orders.find(o => o.id === hoveredOrder.id);
                            if (!order) return null;
                            return (
                                <>
                                    <p className="font-bold mb-1">{order.title}</p>
                                    <p className="text-gray-400 text-[10px]">{new Date(order.completedAt || 0).toLocaleString('ja-JP')}</p>
                                    <p className="mt-1">{order.subTasks.length} 具材</p>
                                    {/* Triangle */}
                                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-8 border-transparent border-l-gray-800" />
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}
        </div>
    );
}
