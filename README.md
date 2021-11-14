# DFKMate - DeFi Kingdoms Quest Helper 🎉
  >  Use at your own risk! The bot needs your private key to work, and can theoretically steal your funds. Ideally you should read the code to verify it for yourself.
  
  DFKMate starts and completes quests of all your heroes once their stamina is full.
  
  You need to have at least 10 ONE tokens in your wallet, and some heroes obviously.
  
  > Stamina recharges at a rate of 1 unit every 20 minutes. A full recharge takes 500 minutes, or ~8 hours.
  
  You should deploy this bot to a remote server to have it running 24/7. This might sound intimidating, but with Heroku it's easy and free. I'll be releasing a video explaining  this in detail soon.
  
## Installation
#### Prerequisites: [Node.js](https://nodejs.org/en/download/), [Git](https://git-scm.com/downloads)
  - Clone repo
    ```
    git pull https://github.com/Fadiii/DFKMate.git
    ```
  - Install dependencies
    ```
    npm install
    ```
  - Add your wallet private key to the *.env* file

    Check this link if you're not sure [how to get your private key in MetaMask](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).
  - Start the bot
    ```
    node index.js
    ```
