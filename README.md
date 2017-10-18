# Local RPG Platform

[![Read our Contribution Guidelines](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](./CONTRIBUTION.md) [![GitHub version](https://badge.fury.io/gh/boennemann%2Fbadges.svg)](http://badge.fury.io/gh/Alamantus%2Flocal-rpg) [![Join the chat at https://gitter.im/local-rpg/Lobby](https://badges.gitter.im/local-rpg/Lobby.svg)](https://gitter.im/local-rpg/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Goal
To have a locally hosted pen and paper RPG experience using laptops and various other devices connected via wifi. The Dungeon/Game Master will use a laptop or desktop computer to manage and display character and monster info, maps, and various other assets. All players can roll dice (and the DM/GM can create custom dice), and display their rolls.

### Features
- Custom Forms (for Character Sheets)
  - forms can be saved to Master computer
  - completed forms can be saved to Master computer
- Dice rolling
  - various dice types of n size
  - custom dice with custom sides and size
  - Master computer can roll dice "privately", and then display the result, for dramatic effect
- Asset Management
  - an "asset window", which is viewable by all players, and managed by the Master computer
  - updates dynamically on change
- Map
  - draggable tiled map for use in the "asset window"

### Stretch Features
- Custom Effects
  - Master computer can choose various players' screens and change the display to represent damage, game effects, and so on
- "Whisper" chat
  - private chat system between players and DM

## Usage

_Every time you pull from the repo, be sure to re-run the install step in case something got added to the project._

### Install

`npm install` or `yarn` will install all the required `node_modules` and allow you to build and run the app.

### Build and Run

`npm run start` will build the host and client and start running the host Electron app.  
`npm run dev` will start webpack watchers and the host Electron app, which will refresh on every change to `build` folder.

Access client by going to localhost (or host computer's local IP address on network) at port 3000

## Contribution

Please see the [`CONTRIBUTION.md`](./CONTRIBUTION.md) for instructions on how to contribute to this project.

Any interactions or contributions to the project must follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

## License

We use the [GNU GPLv3](./LICENSE.txt) license for this project.
