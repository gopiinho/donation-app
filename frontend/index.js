import { ethers } from "./ethers-5.6.esm.min.js"
import { abi } from "./constants.js"

let provider = new ethers.providers.Web3Provider(window.ethereum)
let signer

const connectButton = document.getElementById("connectButton")
const donateButton = document.getElementById("donateButton")

connectButton.onclick = connect
donateButton.onclick = donate

async function connect() {
    await provider.send("eth_requestAccounts", [])
    signer = provider.getSigner()
    connectButton.innerHTML = "Connected"
}

async function donate() {
    let ethAmount = document.getElementById("value").value

    const donationAppContract = "0xffaA373d3863165190Ae70C8aE495058F0c41b7B" // Input contract address here.

    const appContract = new ethers.Contract(donationAppContract, abi, provider)

    const txResponse = await appContract
        .connect(signer)
        .doDonation("Gurpreet", "Testing", parseInt(ethAmount))
    await txResponse.wait()
}
