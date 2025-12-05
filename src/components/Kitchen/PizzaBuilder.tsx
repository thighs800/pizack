import { motion } from 'framer-motion';
import { usePizzaStore } from '../../hooks/usePizzaStore';
import { PizzaGrade } from '../../types';
import type { Order } from '../../types';

interface PizzaBuilderProps {
    order: Order;
}

export function PizzaBuilder({ order }: PizzaBuilderProps) {
    const { getPizzaGrade } = usePizzaStore();
    const totalTasks = order.subTasks.length;
    const completedTasks = order.subTasks.filter((t) => t.isCompleted).length;
    const progress = totalTasks === 0 ? 0 : completedTasks / totalTasks;
    const grade = getPizzaGrade(totalTasks);

    // Box colors based on grade
    const boxColors = {
        [PizzaGrade.Green]: 'bg-green-100 border-green-300',
        [PizzaGrade.Red]: 'bg-red-100 border-red-300',
        [PizzaGrade.Gold]: 'bg-yellow-100 border-yellow-300',
    };

    const boxBorderColors = {
        [PizzaGrade.Green]: 'border-green-500',
        [PizzaGrade.Red]: 'border-red-500',
        [PizzaGrade.Gold]: 'border-yellow-500',
    };

    const boxLabels = {
        [PizzaGrade.Green]: 'Snack Box (小)',
        [PizzaGrade.Red]: 'Regular Box (中)',
        [PizzaGrade.Gold]: 'Deluxe Box (大)',
    };

    // Topping types for variety
    const toppingTypes = ['pepperoni', 'mushroom', 'olive', 'pepper', 'basil'];
    const getToppingStyle = (index: number) => {
        const type = toppingTypes[index % toppingTypes.length];
        switch (type) {
            case 'pepperoni': return 'bg-red-800 rounded-full';
            case 'mushroom': return 'bg-amber-200 rounded-t-lg rounded-b-sm';
            case 'olive': return 'bg-black rounded-full ring-2 ring-black ring-offset-1 ring-offset-orange-200'; // Ring to look like sliced olive
            case 'pepper': return 'bg-green-600 rounded-sm rotate-45';
            case 'basil': return 'bg-green-500 rounded-tr-lg rounded-bl-lg';
            default: return 'bg-orange-800 rounded-full';
        }
    };

    return (
        <div className={`relative w-64 h-64 rounded-xl border-4 ${boxColors[grade]} ${boxBorderColors[grade]} flex items-center justify-center overflow-hidden transition-colors duration-500`}>
            {/* Pizza Base (Dough) */}
            <motion.div
                className="w-48 h-48 bg-orange-200 rounded-full relative shadow-inner flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
            >
                {/* Sauce - appears at 10% progress */}
                {progress >= 0.1 && (
                    <motion.div
                        className="absolute w-44 h-44 bg-red-600 rounded-full opacity-90"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.9, scale: 1 }}
                    />
                )}

                {/* Cheese - appears at 30% progress */}
                {progress >= 0.3 && (
                    <motion.div
                        className="absolute w-40 h-40 bg-yellow-300 rounded-full opacity-80"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.8, scale: 1 }}
                    />
                )}

                {/* Toppings - Phyllotaxis (Golden Angle) Distribution */}
                {(() => {
                    // Flatten all toppings from completed tasks into a single list
                    const toppings = order.subTasks.flatMap((task, taskIndex) => {
                        if (!task.isCompleted) return [];
                        return [0, 1, 2].map(offset => ({ task, taskIndex, offset }));
                    });

                    // Generate a base random seed for the entire pizza (rotation offset)
                    const pizzaSeedStr = order.id;
                    let pizzaHash = 0;
                    for (let i = 0; i < pizzaSeedStr.length; i++) {
                        pizzaHash = ((pizzaHash << 5) - pizzaHash) + pizzaSeedStr.charCodeAt(i);
                        pizzaHash = pizzaHash & pizzaHash;
                    }
                    const pizzaRotationOffset = (Math.abs(pizzaHash) % 360) * (Math.PI / 180);

                    return toppings.map((item, index) => {
                        // Phyllotaxis algorithm
                        // Golden Angle = 137.508... degrees
                        const goldenAngle = 137.508 * (Math.PI / 180);

                        // r = c * sqrt(n)
                        // c determines the spacing between toppings. 
                        // Pizza radius is approx 70-80px.
                        const c = 14;

                        // Add 1 to index to avoid putting the first item exactly at center (0,0) if desired,
                        // or start from 0. 0 is fine.
                        const n = index;

                        const rBase = c * Math.sqrt(n + 1); // +1 to start slightly away from absolute center
                        const thetaBase = n * goldenAngle + pizzaRotationOffset;

                        // Add organic jitter (Blue Noise-ish)
                        // Use item specific hash for deterministic jitter
                        const itemSeedStr = item.task.id + item.offset;
                        let itemHash = 0;
                        for (let i = 0; i < itemSeedStr.length; i++) {
                            itemHash = ((itemHash << 5) - itemHash) + itemSeedStr.charCodeAt(i);
                            itemHash = itemHash & itemHash;
                        }
                        const itemSeed = Math.abs(itemHash);

                        // Jitter range: +/- 3px for position, +/- 180deg for rotation
                        const random = (seed: number) => {
                            const x = Math.sin(seed) * 10000;
                            return x - Math.floor(x);
                        };

                        const jitterX = (random(itemSeed) - 0.5) * 6;
                        const jitterY = (random(itemSeed + 1) - 0.5) * 6;
                        const rotation = random(itemSeed + 2) * 360;

                        // Calculate final position
                        // Limit max radius to keep inside pizza (approx 75px)
                        const rMax = 75;
                        const rFinal = Math.min(rBase, rMax - 5); // -5 padding

                        const x = rFinal * Math.cos(thetaBase) + jitterX;
                        const y = rFinal * Math.sin(thetaBase) + jitterY;

                        return (
                            <motion.div
                                key={`${item.task.id}-${item.offset}`}
                                className={`absolute w-5 h-5 shadow-sm z-10 ${getToppingStyle(item.taskIndex + item.offset)}`}
                                style={{ x, y, rotate: rotation }}
                                initial={{ scale: 0, y: -20 }}
                                animate={{ scale: 1, y: y, rotate: rotation }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            />
                        );
                    });
                })()}
            </motion.div>

            {/* Box Label */}
            <div className="absolute bottom-2 right-2 text-xs font-bold uppercase opacity-50 text-gray-700">
                {boxLabels[grade]}
            </div>
        </div>
    );
}
