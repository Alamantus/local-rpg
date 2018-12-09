# Local RPG Platform

[![Read our Contribution Guidelines](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](./CONTRIBUTION.md) [![GitHub issues](https://img.shields.io/github/issues/Alamantus/local-rpg.svg)](https://github.com/Alamantus/local-rpg/issues) [![Join the chat at https://gitter.im/local-rpg/Lobby](https://badges.gitter.im/local-rpg/Lobby.svg)](https://gitter.im/local-rpg/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [<img height='20' style='border:0px;height:20px;' src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=0' border='0' alt='Buy Me a Coffee at ko-fi.com' />](https://ko-fi.com/alamantus)

## Goal
To have a locally hosted pen and paper RPG experience using laptops and various other devices connected via wifi. The Dungeon/Game Master will use a laptop or desktop computer to manage and display character and monster info, maps, and various other assets. All players can roll dice (and the DM/GM can create custom dice), and display their rolls.

### Proposed Names

* Local RPG
* LARP

### Features
- Custom Forms (for Character Sheets)
  - forms can be saved to Master computer
  - completed forms can be saved to Master computer
- Dice rolling
  - various dice types of n size
  - Master computer can roll dice "privately", and then display the result, for dramatic effect
- "Whisper" chat
  - private chat system between players and DM
- Character Management
  - GM can view/manage player and non-player characters sheets
  - players can edit custom forms as character sheets
- Notes
  - unlimited, dated, titled notes

### Stretch Features
- Custom Dice
  - custom dice with custom sides and size
- Item Management
  - store every item and description entered so it can be re-used or passed from character to character while allowing edits to propogate to everywhere the item is used
  - give/take items from characters by dragging the item entry to the character
  - allow "inventory" macro within custom character sheets for displaying character items.
- Asset Sharing
  - GM can share images or other arbitrary files with their players
- Custom Effects
  - Master computer can choose various players' screens and change the display to represent damage, game effects, and so on

### Super Stretchy Features
- Web Hosting
  - A website for using the program without a host computer and being on the same network as the host.
- Maps
  - grid-based map creation for the GM
  - layers and optional backgrounds
  - player-controlled pieces to move around

## Usage

_Every time you pull from the repo, be sure to re-run the install step in case something got added to the project._

### Install

`yarn` will install all the required `node_modules` and allow you to build and run the app.

We use [Yarn](https://yarnpkg.com) as our package manager—please avoid using `npm install`. NPM is only used to run scripts instead of installing and managing dependencies.

### Build and Run

`npm run start` will build the host and client and start running the host Electron app.  
`npm run dev` will start webpack watchers and the host Electron app, which will refresh on every change to `build` folder.

Access player client by going to localhost at the port you entered or using the "Players connect to" url on the Electron app while the device is connected to the same WiFi/network as the host.

## Contribution

Please see the [`CONTRIBUTION.md`](./CONTRIBUTION.md) for instructions on how to contribute to this project.

Any interactions or contributions to the project must follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

## License

We use the [GNU GPLv3](./LICENSE.txt) license for this project.
