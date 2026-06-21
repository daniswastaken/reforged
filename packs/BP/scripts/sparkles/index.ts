/*
** 2026-06-21
**
** In place of a legal notice, here is a blessing:
**
**    May you do good and not evil.
**    May you find forgiveness for yourself and forgive others.
**    May you share freely, never taking more than you give.
**
*************************************************************************
** This file contain the scripts used for spawning the sparkle particles
** around dropped items. It provide a delay mechanics for a newly
** dropped item so the particles doesn't trigger instantly for artistic
** choice. This script also contain a memory leak prevention.
*/

/*
**
** Honors
**
*************************************************************************
** daniswastaken
** Why Not OSS
*/

import { world, system } from "@minecraft/server";

export function initializeSparkles() {
    // Map to track when items were first seen to implement delay
    const itemSpawnTimes = new Map();

    system.runInterval(() => {
        const dimensions: any = new Set();
        for (const player of world.getAllPlayers()) {
            dimensions.add(player.dimension);
        }

        const currentTime = Date.now();
        const currentItemIds = new Set();

        for (const dimension of dimensions) {
            const items = dimension.getEntities({ type: "minecraft:item" });

            for (const item of items) {
                currentItemIds.add(item.id);

                // If new item, record spawn time
                if (!itemSpawnTimes.has(item.id)) {
                    itemSpawnTimes.set(item.id, currentTime);
                }

                try {
                    // 1.5 second delay (1500ms)
                    if (currentTime - itemSpawnTimes.get(item.id) < 1500)
                        continue;

                    if (!item.isOnGround && !item.isInWater) continue;

                    const location = {
                        x: item.location.x,
                        y: item.location.y + 0.05,
                        z: item.location.z,
                    };
                    dimension.spawnParticle("wn:sparkles", location);
                } catch (e) {
                    // Ignore if item is invalid or dimension is unloaded
                }
            }
        }

        // Cleanup untracked items to prevent memory leak
        for (const id of itemSpawnTimes.keys()) {
            if (!currentItemIds.has(id)) {
                itemSpawnTimes.delete(id);
            }
        }
    }, 15);
}
