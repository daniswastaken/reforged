/*
** 2026-06-20
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
import { initializeStarterKits } from "./starterKit/index"; // Import starter kits

/*
** This section is intended for initializing and running all previously
** imported scripts.
*/
initializeStarterKits();