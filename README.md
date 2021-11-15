# DFKMate - DeFi Kingdoms Quest Helper 🎉
  >  The bot needs your private key to work and has access to your assets. Ideally you should read the code to verify for yourself that nothing dodgy is going on.
  
  DFKMate starts and completes quests of all your heroes once their stamina is full.
  
  You need to have at least 10 ONE tokens in your wallet, and at least 1 hero.
  
  > Stamina recharges at a rate of 1 unit every 20 minutes. A full recharge takes 500 minutes, or ~8 hours.
  
  You should deploy this bot to a remote server to have it running 24/7. This might sound intimidating, but with Heroku it's easy and free. I'll be releasing a video explaining  this in detail soon.
  
## Installation
#### Prerequisites: [Node.js](https://nodejs.org/en/download/), [Git](https://git-scm.com/downloads)
  - Clone repo
    ```
    git clone https://github.com/Fadiii/DFKMate.git
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
