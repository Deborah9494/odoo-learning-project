/** @odoo-module */
export const rewards = [
    {
        description: "Get 1 click",
        apply(clicker) {
            clicker.increment(1);
        },
        maxLevel: 3,
    },
    {
        description: "Get 10 clicks",
        apply(clicker) {
            clicker.increment(10);
        },
        minLevel: 3,
        maxLevel: 4,
    },
    {
        description: "Increase bot power!",
        apply(clicker) {
            clicker.power += 1;
        },
        minLevel: 3,
    },
];

// function checkRewards(reward, level) {
//     if (
//         reward.minLevel !== undefined &&
//         reward.maxLevel !== undefined
//     ) {
//         return reward.minLevel <= level && level <= reward.maxLevel;
//     }

//     if (reward.minLevel !== undefined) {
//         return reward.minLevel <= level;
//     }

//     if (reward.maxLevel !== undefined) {
//         return level <= reward.maxLevel;
//     }

//     return true;
// }

// export function getReward(level) {
//     const availableRewards = rewards.filter(
//         // Take one reward, and return the result of checkRewards(reward, level)
//         (reward) => checkRewards(reward, level)
//     );

//     return choose(availableRewards);
// }