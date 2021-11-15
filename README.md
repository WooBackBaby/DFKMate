# DFKMate - DeFi Kingdoms Quest Helper 🎉
  >  The bot needs your private key to complete quests on your behalf.

  DFKMate starts and completes quests of all your heroes once their stamina is full.
  
  You need at least 2 ONE tokens in your wallet and at least 1 hero.
  
  > Stamina recharges at a rate of 1 unit every 20 minutes. A full recharge takes 500 minutes, or ~8 hours.
  
  Deploy bot to a remote server to have it running 24/7. I recommend using Heroku since it's free and easy to setup.
  
## Installation
#### Prerequisites: [Node.js](https://nodejs.org/en/download/), [Git](https://git-scm.com/downloads)
  - Clone repo
    ```
    git clone https://github.com/Fadiii/DFKMate.git
    ```
  - Install dependencies (after navigating into the new repo)
    ```
    npm install
    ```
  - Add your wallet private key to the *.env* file

    Check this link if you're not sure [how to get your private key in MetaMask](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).
  - Start the bot
    ```
    node index.js
    ```
## Risk
The main risk for users is that the bot has access to your wallet. You're highly encouraged to read the code yourself, even if you're not a programmer. There's comments to explain what it does step by step. 
