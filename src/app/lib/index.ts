import { ethers, BrowserProvider, JsonRpcSigner } from "ethers";

export const getProvider: () => Promise<{
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
}> = async () => {
  let signer = null;
  let provider = null;

  if (window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
  }

  return { signer, provider };
};
