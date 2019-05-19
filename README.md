# What is this?
Just another **WIP** that will never be finished.

But, basically, a generic set of characters, classes, weapons, powers, that can be used to craft a combat game of any sorts.

It could be used on a turns combat system, platformer, zelda-like, etc.

Current implementation uses a DOM renderer to display a list of characters on both Parties. Buttons can be used to simulate the attacks.

The MVC parttern is used to allow for changing the style of game/rendering on different frameworks (now using DOM rendering with Handlebars templates, but could be easily switched to use Phaser by only changing the View layer).

## Launching

`npm run start`

# TODO

## Characters
Warrior - High health and mid damage
Mage - Low health and area damage
Rogue - Mid health and high defense
Cleric - Mid health and healing

### Leveling up
XP system
Health increases
Special damage increases

### Inventory
Loot/Shopping system
Damage increases
Defense increases
Grab loot and modal asks if you want to switch

### Special attacks
Warrior - Super attack (+ Increase group morale)
Mage - Fireball (+ Protective Barrier)
Rogue - Paralysing attacks (+ Special breaking)
Cleric - Healing (+ Reviving)

## Enemies
Orcs
Dragons
Giant Bats
Slime
Skeleton
Zombie

## Combat
When it finishes, handles winner/loser

## Currency
Money for the Party
Define money drop for each character (min, max and percentage)

## Display
Confirmation modal (with a template and callback to continue the action once it's confirmed)
