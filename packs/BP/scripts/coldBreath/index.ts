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
** This file contain the scripts used for the Cold Breathing particles
** feature. It works by checking where the player is currently located.
** If the player are on cold biome or high altitude and currently not
** moving, then spawn the cold breathing particles on player's head level
** and facing direction.
*/

/*
**
** Honors
**
*************************************************************************
** daniswastaken
** Why Not OSS
*/

import { world, system, MolangVariableMap } from "@minecraft/server";

const COLD_BIOMES = [
    // Frozen Biomes (Temp <= 0)
    "minecraft:frozen_ocean",
    "minecraft:deep_frozen_ocean",
    "minecraft:frozen_river",
    "minecraft:ice_plains",
    "minecraft:ice_mountains",
    "minecraft:ice_plains_spikes",
    "minecraft:legacy_frozen_ocean",
    "minecraft:frozen_peaks",
    "minecraft:jagged_peaks",
    "minecraft:snowy_slopes",
    "minecraft:grove",

    // Cold Biomes (Temp <= 0.25)
    "minecraft:cold_beach",
    "minecraft:cold_taiga",
    "minecraft:cold_taiga_hills",
    "minecraft:cold_taiga_mutated",
    "minecraft:cold_ocean",
    "minecraft:deep_cold_ocean",
    "minecraft:taiga",
    "minecraft:taiga_hills",
    "minecraft:taiga_mutated",
    "minecraft:redwood_taiga_mutated",
    "minecraft:extreme_hills",
    "minecraft:extreme_hills_plus_trees",
    "minecraft:extreme_hills_edge",
    "minecraft:extreme_hills_mutated",
    "minecraft:extreme_hills_plus_trees_mutated",
    "minecraft:stone_beach",
    "minecraft:dripstone_caves",
];

export function initializeColdBreath() {
    system.runInterval(() => {
        for (const player of world.getPlayers()) {
            // Biome check
            const biomeId = player.dimension.getBiome(player.location).id;
            const isColdBiome = COLD_BIOMES.includes(biomeId);
            const isHighAltitude = player.location.y > 120; // Cold at high altitudes

            if (!isColdBiome && !isHighAltitude) continue;

            // Motion check
            const velocity = player.getVelocity();
            const isMoving =
                Math.abs(velocity.x) > 0.01 ||
                Math.abs(velocity.y) > 0.01 ||
                Math.abs(velocity.z) > 0.01;
            if (isMoving) continue;

            const view = player.getViewDirection();
            const head = player.getHeadLocation();

            // Offset by 0.5 blocks in view direction
            const spawnPos = {
                x: head.x + view.x * 0.5,
                y: head.y + view.y * 0.5,
                z: head.z + view.z * 0.5,
            };

            const molang = new MolangVariableMap();
            molang.setFloat("variable.dir_x", view.x);
            molang.setFloat("variable.dir_y", view.y);
            molang.setFloat("variable.dir_z", view.z);

            player.dimension.spawnParticle("wn:cold_breath", spawnPos, molang);
        }
    }, 40); // Summon particles every 2 seconds
}
