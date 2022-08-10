import { ethers } from "./ethers-5.6.esm.min.js"
import { abi } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const donateButton = document.getElementById("donateButton")

connectButton.onclick = connect
donateButton.onclick = donate

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        connectButton.innerHTML = "Connected"
    } else {
        connectButton.innerHTML = "Install Metamask"
    }
}
async function donate(ethAmount) {
    console.log(`Funding with amount ${ethAmount}`)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        console.log(signer)
    }
}
