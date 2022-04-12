require("../schemas/coinPredictModel");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const CryptoDict = {
  "Bitcoin":"BTC",
  "Ethereum":"ETH",
  "Binance Coin":"BNB",
  "Tether":"USDT",
  "Solana":"SOL",
  "Cardano":"ADA",
  "XRP":"XRP",
  "Polkadot":"DOT",
  "SHIBA INU":"SHIB",
  "Dogecoin":"DOGE",
  "USD Coin":"USDC",
  "Terra":"LUNA",
  "Uniswap":"UNI",
  "Avalanche":"AVAX",
  "Chainlink":"LINK",
  "Wrapped Bitcoin":"WBTC",
  "Polygon":"MATIC",
  "Litecoin":"LTC",
  "Binance USD":"BUSD",
  "ALgorand":"ALGO",
  "Bitcoin Cash":"BCH",
  "Stellar":"XLM",
  "VeChain":"VET",
  "Axie Infinity":"AXS",
  "Internet Computer":"ICP",
  "Cosmos":"ATOM",
  "Filecoin":"FIL",
  "TRON":"TRX",
  "THETA":"THETA",
  "FTX Token":"FTT",
  "Ethereum Classic":"ETC",
  "Fantom":"FTM",
  "Bitcoin BEP2":"BTCB",
  "Dai":"DAI",
  "Crypto.com Coin":"CRO",
  "Hedera":"HBAR",
  "NEAR Protocol":"NEAR",
  "Decentraland":"MANA",
  "Tezos":"XTZ",
  "Elrond":"EGLD",
  "Monero":"XMR",
  "The Graph":"GRT",
  "Klaytn":"KLAY",
  "EOS":"EOS",
  "PancakeSwap":"CAKE",
  "Flow":"FLOW",
  "THORChain":"RUNE",
  "Aave":"AAVE",
  "IOTA":"MIOTA",
  "Kusama":"KSM",
  "eCash":"XEC",
  "Quant":"QNT",
  "Neo":"NEO",
  "Bitcoin SV":"BSV",
  "UNUS SED LEO":"LEO",
  "Harmony":"ONE",
  "Chiliz":"CHZ",
  "Helium":"HNT",
  "Maker":"MKR",
  "TerraUSD":"UST",
  "Waves":"WAVES",
  "BitTorrent":"BTT",
  "The Sandbox":"SAND",
  "Stacks":"STX",
  "Enjin Coin":"ENJ",
  "Holo":"HOT",
  "Arweave":"AR",
  "Amp":"AMP",
  "Zcash":"ZEC",
  "Celo":"CELO",
  "Compound":"COMP",
  "Dash":"DASH",
  "OMG Network":"OMG",
  "NEM":"XEM",
  "Theta Fuel":"TFUEL",
  "Nexo":"NEXO",
  "Loopring":"LRC",
  "Huobi Token":"HT",
  "Curve DAO Token":"CRV",
  "Qtum":"QTUM",
  "ICON":"ICX",
  "SushiSwap":"SUSHI",
  "KuCoin Token":"KCS",
  "Decred":"DCR",
  "Basic Attention Token":"BAT",
  "Secret":"SCRT",
  "Revain":"REV",
  "Zilliqa":"ZIL",
  "OKB":"OKB",
  "yearn.finance":"YFI",
  "Mina":"MINA",
  "Ravencoin":"RVN",
  "Audius":"AUDIO",
  "XDC Network":"XDC",
  "Synthetix":"SNX",
  "TrueUSD":"TUSD",
  "Perpetual Protocol":"PERP",
  "Bitcoin Gold":"BTG",
  "Kadena":"KDA",
  "Ankr":"ANKR",
  "0x":"ZRX",
  "renBTC":"RENBTC",
  "Bancor":"BNT",
  "Serum":"SRM",
  "Celsius":"CEL",
  "Siacoin":"SC",
  "Telcoin":"TEL",
  "Horizen":"ZEN",
  "Ren":"REN",
  "Pax Dollar":"USDP",
  "IOST":"IOST",
  "dYdX":"DYDX",
  "Dogelon Mars":"ELON",
  "Ontology":"ONT",
  "OriginTrail":"TRAC",
  "Raydium":"RAY",
  "SKALE Network":"SKL",
  "DigiByte":"DGB",
  "1inch Network":"1INCH",
  "WAX":"WAXP",
  "Moonriver":"MOVR",
  "Nano":"NANO",
  "Mdex":"MDX",
  "UMA":"UMA",
  "IoTeX":"IOTX",
  "Dent":"DENT",
  "Celer Network":"CELR",
  "Gnosis":"GNO",
  "Voyager Token":"VGX",
  "WOO Network":"WOO",
  "Livepeer":"LPT",
  "Fetch.ai":"FET",
  "Ocean Protocol":"OCEAN",
  "NuCypher":"NU",
  "SwissBorg":"CHSB",
  "Storj":"STORJ",
  "WINkLink":"WIN",
  "Neutrino USD":"USDN",
  "WazirX":"WRX",
  "Golem":"GLM",
  "Nervos Network":"CKB",
  "Kava":"KAVA",
  "XYO":"XYO",
  "Reserve Rights":"RSR",
  "Reef":"REEF",
  "Alpha Finance Lab":"ALPHA",
  "Velas":"VLX",
  "DigitalBits":"XDB",
  "Polymath":"POLY",
  "COTI":"COTI",
  "Function X":"FX",
  "GateToken":"GT",
  "Injective Protocol":"INJ",
  "Swipe":"SXP",
  "Numeraire":"NMR",
  "Lisk":"LSK",
  "VeThor Token":"VTHO",
  "Orchid":"OXT",
  "Bitcoin Standard Hashrate Token":"BTCST",
  "Fei USD":"FEI",
  "MediBloc":"MED",
  "Bitcoin Diamond":"BCD",
  "BakeryToken":"BAKE",
  "iExec RLC":"RLC",
  "Verge":"XVG",
  "BORA":"BORA",
  "Origin Protocol":"OGN",
  "Cartesi":"CTSI",
  "NKN":"NKN",
  "Verasity":"VRA",
  "Ardor":"ARDR",
  "Unibright":"UBT",
  "Conflux":"CFX",
  "StormX":"STMX",
  "ASD":"ASD",
  "Constellation":"DAG",
  "MyNeighborAlice":"ALICE",
  "Band Protocol":"BAND",
  "Status":"SNT",
  "Ontology Gas":"ONG",
  "aelf":"ELF",
  "Casper":"CSPR",
  "Civic":"CVC",
  "PAX Gold":"PAXG",
  "Hive":"HIVE",
  "SingularityNET":"AGIX",
  "Prometeus":"PROM",
  "Energy Web Token":"EWT",
  "Venus":"XVS",
  "Chromia":"CHR",
  "Badger DAO":"BADGER",
  "Ampleforth":"AMPL",
  "Ergo":"ERG",
  "Oasis Network":"ROSE",
  "Stratis":"STRAX",
  "Orbs":"ORBS",
  "Augur":"REP",
  "Ark":"ARK",
  "Proton":"XPR",
  "MaidSafeCoin":"MAID"
}

const coinPredictMod = mongoose.model("coin_predict");

var weekdayset = new Date(),
    weekday = (weekdayset.getDate()+7);

if (weekday==32){
    weekday = 1;
}

var week = new Date(),
  dateweekly =
  week.getFullYear() + "-" + (week.getMonth() + 1) + "-" + (weekday);

router.get("/", (req, res) => {
  console.log(dateweekly)
  coinPredictMod.find({ currentdate: dateweekly}, (err, docs) => {
    if (docs.length == 0) {
      console.log("Weekly Prediction 0 doc length");
      axios
      .get(
        "https://my.api.mockaroo.com/coins_mockeroo.json?key=0cc02cb0&__method=GET",
      )
      .then((response) => {
        res.status(200).json(response.data);

        for (let i = 0; i < response.data.length; i++) {
          if (docs.name != response.data[i].id) {
            new coinPredictMod({
              name: response.data[i].id,
              prediction: response.data[i].prediction,
              currentdate: dateweekly,
            }).save(function (err, doc) {
              if (err) return console.error(err);
            });
          }
        }
      })
      .catch((err) => {
        // if (err.response){
        console.log("Error Response from API", err.response.status);
        // }
      });

    } 
    else if (err) 
    {
      console.log(err);
      console.log("Error - Backend");
      res.status(404);
    }
     else
    {
      res.status(200).json(docs);
      console.log("Else statement for weekly prediction: ", docs.length);

    }
  });

});
module.exports = router;