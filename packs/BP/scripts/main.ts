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
** This file is an entry to every other scripts used in this projects.
** This file also contains initialization needed.
*/

/*
**
** Honors
**
*************************************************************************
** daniswastaken
*/

/*
** This section is intended for importing the needed modules.
*/
import { world, system } from "@minecraft/server";

/*
** This section is intended for importing other scripts.
*/
import { initializeStarterKits } from "./starterKit/index"; // Import Starter Kit
import { initializeDayToDay } from "./dayToDay/index"; // Import Day to Day
import { initializeSparkles } from "./sparkles/index"; // Import Sparkles
import { initializeTrailingTrails } from "./trailingTrails"; // Import Trailing Trails

/*
** This section is intended for initializing and running all previously
** imported scripts.
*/
initializeStarterKits();
initializeDayToDay();
initializeSparkles();
initializeTrailingTrails();
