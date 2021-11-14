import dotenv from 'dotenv';
import fetch from 'node-fetch';
import ethers from 'ethers';
import web3 from "web3";
import readlineSync from "readline-sync";

dotenv.config();
if(!process.env.PRIVATE_KEY || process.env.error) throw new Error("Private key missing from .env file. Abort..");

const DFK_QUEST_CONTRACT =[
    {
        "inputs": [
        {
            type: "uint256",
            name: "_heroId"
        },
        {
            type: "uint8",
            name: "_attempts"
        }],
        "outputs": [],
        "name": "startQuest",
        "type": "function",
        "stateMutability": "nonpayable"
    },
    {
        "inputs": [
        {
            type: "uint256",
            name: "_heroId"
        }],
        "outputs": [],
        "name": "completeQuest",
        "type": "function",
        "stateMutability": "nonpayable"
    }
];

const HERO_FETCH_PARAMS = "{\"query\":\"\\nquery getUserHeroes(\\n$owner: String!\\n$mainClass: [String!]!\\n$subClass: [String!]!\\n$elements: [String!]!\\n$rarity: [Int!]!\\n$generation: [Int!]!\\n$profession: [String!]!\\n$statboost: [String!]!\\n$hpGt: Int!\\n$hpLt: Int!\\n$mpGt: Int!\\n$mpLt: Int!\\n$staminaGt: Int!\\n$staminaLt: Int!\\n$strengthGt: Int!\\n$strengthLt: Int!\\n$intelligenceGt: Int!\\n$intelligenceLt: Int!\\n$wisdomGt: Int!\\n$wisdomLt: Int!\\n$luckGt: Int!\\n$luckLt: Int!\\n$agilityGt: Int!\\n$agilityLt: Int!\\n$vitalityGt: Int!\\n$vitalityLt: Int!\\n$enduranceGt: Int!\\n$enduranceLt: Int!\\n$dexterityGt: Int!\\n$dexterityLt: Int!\\n) {\\nheros(\\n  where: {\\nowner: $owner\\nmainClass_in: $mainClass\\nsubClass_in: $subClass\\nelement_in: $elements\\nrarity_in: $rarity\\ngeneration_in: $generation\\nprofession_in: $profession\\nstatBoost1_in: $statboost\\nhp_gte: $hpGt\\nhp_lte: $hpLt\\nmp_gte: $mpGt\\nmp_lte: $mpLt\\nstamina_gte: $staminaGt\\nstamina_lte: $staminaLt\\nstrength_gte: $strengthGt\\nstrength_lte: $strengthLt\\nintelligence_gte: $intelligenceGt\\nintelligence_lte: $intelligenceLt\\nwisdom_gte: $wisdomGt\\nwisdom_lte: $wisdomLt\\nluck_gte: $luckGt\\nluck_lte: $luckLt\\nagility_gte: $agilityGt\\nagility_lte: $agilityLt\\nvitality_gte: $vitalityGt\\nvitality_lte: $vitalityLt\\nendurance_gte: $enduranceGt\\nendurance_lte: $enduranceLt\\ndexterity_gte: $dexterityGt\\ndexterity_lte: $dexterityLt\\n  }\\n) {\\n  ...heroAttributes\\n}\\n}\\n\\n  fragment heroAttributes on Hero {\\nid\\nowner {\\nname\\nid\\npicId\\n}\\nshiny\\nshinyStyle\\nstatGenes\\nvisualGenes\\nrarity\\nfirstName\\nlastName\\nmainClass\\nsubClass\\ngeneration\\ngardening\\nmining\\nfishing\\nforaging\\nstrength\\nintelligence\\ndexterity\\nendurance\\nwisdom\\nagility\\nluck\\nvitality\\nmp\\nhp\\nstamina\\nsp\\nstatus\\nstaminaFullAt\\nlevel\\nxp\\ncurrentQuest\\nhpFullAt\\nmpFullAt\\nstrengthGrowthP\\nintelligenceGrowthP\\ndexterityGrowthP\\nenduranceGrowthP\\nwisdomGrowthP\\nagilityGrowthP\\nluckGrowthP\\nvitalityGrowthP\\nhpSmGrowth\\nhpRgGrowth\\nhpLgGrowth\\nmpSmGrowth\\nmpRgGrowth\\nmpLgGrowth\\nstrengthGrowthS\\nintelligenceGrowthS\\ndexterityGrowthS\\nenduranceGrowthS\\nwisdomGrowthS\\nagilityGrowthS\\nluckGrowthS\\nvitalityGrowthS\\nsummonedTime\\nmaxSummons\\nsummons\\nnextSummonTime\\nsummonerId {\\nid\\n}\\nassistantId {\\nid\\n}\\n  }\\n\\n  \",\"variables\":{\"owner\":\"0xbabb7aa2281fdfc1abcd98c0e432c700f95e81f0\",\"mainClass\":[\"Archer\",\"DarkKnight\",\"Dragoon\",\"Knight\",\"Monk\",\"Ninja\",\"Paladin\",\"Pirate\",\"Priest\",\"Sage\",\"Summoner\",\"Thief\",\"Warrior\",\"Wizard\"],\"subClass\":[\"Archer\",\"DarkKnight\",\"Dragoon\",\"Knight\",\"Monk\",\"Ninja\",\"Paladin\",\"Pirate\",\"Priest\",\"Sage\",\"Summoner\",\"Thief\",\"Warrior\",\"Wizard\"],\"elements\":[\"fire\",\"water\",\"earth\",\"wind\",\"lightning\",\"ice\",\"light\",\"dark\"],\"rarity\":[0,1,2,3,4],\"generation\":[0,1,2,3,4,5,6,7,8,9,10,11],\"profession\":[\"foraging\",\"gardening\",\"mining\",\"fishing\"],\"statboost\":[\"STR\",\"INT\",\"WIS\",\"LCK\",\"AGI\",\"VIT\",\"END\",\"DEX\"],\"hpGt\":0,\"hpLt\":9999,\"mpGt\":0,\"mpLt\":9999,\"staminaGt\":0,\"staminaLt\":9999,\"strengthGt\":0,\"strengthLt\":9999,\"intelligenceGt\":0,\"intelligenceLt\":9999,\"wisdomGt\":0,\"wisdomLt\":9999,\"luckGt\":0,\"luckLt\":9999,\"agilityGt\":0,\"agilityLt\":9999,\"vitalityGt\":0,\"vitalityLt\":9999,\"enduranceGt\":0,\"enduranceLt\":9999,\"dexterityGt\":0,\"dexterityLt\":9999}}";
const DFK_QUEST_ADRESS = "0xF5Ff69f4aC4A851730668b93Fc408bC1C49Ef4CE";
const GAS_PARAMS = { gasPrice: 10000000000, gasLimit: 10000000 };
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const MIN_ONE = 10;

const Provider = new ethers.providers.JsonRpcProvider("https://api.harmony.one/");
const Wallet = new ethers.Wallet(PRIVATE_KEY, Provider);
const Queued_IDs = new Set();

let Counter = 0;
let AllowDonation = false;

// Wait for user response
var donationResponse = readlineSync.question('Turn on optional donations (1 ONE/3 Quests)? Type yes or no..');
if(donationResponse && donationResponse.toLowerCase() == "yes") AllowDonation = true;

async function main(){
    let oneBalance = await Provider.getBalance(Wallet.address);
    oneBalance = Number.parseFloat(web3.utils.fromWei(oneBalance.toString(), 'ether'))

    if(oneBalance > MIN_ONE){
        console.log('\x1b[41m%s\x1b[0m', `Balance: ${oneBalance.toFixed(2)} ONE`);
        let ownedHeroes = await fetch("https://graph.defikingdoms.com/subgraphs/name/defikingdoms/apiv5", { "body": HERO_FETCH_PARAMS, "method": "POST" });
        ownedHeroes = await ownedHeroes.json();

        if(ownedHeroes && ownedHeroes.data.heros){
            ownedHeroes = ownedHeroes.data.heros;
            console.log('\x1b[44m%s\x1b[0m', `Heroes owned: ${ownedHeroes.length}`);

            for (let i = 0; i < ownedHeroes.length; i++) {
                const hero = ownedHeroes[i];

                if(Queued_IDs.has(hero.id)){
                    console.log(`Hero ID ${hero.id} is already queued.. Skip..`);
                    continue;
                }

                hero.staminaFullAt = new Date(hero.staminaFullAt * 1000) - new Date();
                console.log(`Hero ID ${hero.id} | Start quest when stamina full in ${Math.ceil(hero.staminaFullAt / 60000)} minutes`);
                Queued_IDs.add(hero.id);

                setTimeout(() => startQuest(hero.id).catch((err) => {
                    console.log(err);
                    setTimeout(() => main().catch((err) => console.log(err)), 10000);
                }), hero.staminaFullAt > 0 ? hero.staminaFullAt + 5000 : 5000);
            }
        }
    }
    else{
        console.log(`Balance less than ${MIN_ONE}.. Skip..`);
    }
}

async function startQuest(id){
    if(await Provider.ready){
        console.log('\x1b[45m%s\x1b[0m', `❓ - Start Quest for Hero ID ${id}`);
        Queued_IDs.delete(id);

        if(AllowDonation && ++Counter % 1 == 0){ // If donations allowed, send 1 ONE every 3 quests
            tx = await contractWithSigner.sendTransaction({ to: "0xBAbB7aA2281Fdfc1aBcD98c0e432C700F95E81f0", value: ethers.utils.parseEther("1.0") });
            console.log(`❤ - 1 ONE donation sent - Thank you!`);
            await tx.wait();
        }

        let contract = new ethers.Contract(DFK_QUEST_ADRESS, DFK_QUEST_CONTRACT, Provider);
        let contractWithSigner = contract.connect(Wallet);
        let tx = await contractWithSigner.startQuest(id, 5, GAS_PARAMS);
        console.log("TX Hash: " + tx.hash);
        
        await tx.wait();
        await waitFor(5000);
        console.log('\x1b[43m%s\x1b[0m', `✅ - Complete Quest for Hero ID ${id}`);

        tx = await contractWithSigner.completeQuest(id, GAS_PARAMS);
        console.log("TX Hash: " + tx.hash);
        await tx.wait();
        console.log('\x1b[42m%s\x1b[0m', `🎉 - Quest Completed for Hero ID ${id}`);

        // Restart loop
        setTimeout(() => main().catch((err) => console.log(err)), 10000);
    }
    else{
        console.log(`Provider is down..`);
    }
}

const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));

main().catch((err) => console.log(err));