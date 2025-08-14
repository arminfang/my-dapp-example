import { AbstractProvider, BrowserProvider, JsonRpcSigner } from "ethers";
import { useEffect, useState } from "react";
import { getProvider } from "@app/lib";

const useProvider = () => {
  const [provider, setProvider] = useState<
    BrowserProvider | AbstractProvider | null
  >(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

  useEffect(() => {
    getProvider().then((res) => {
      const { provider, signer } = res;
      setProvider(provider);
      setSigner(signer);
    });
  }, []);

  return { provider, signer };
};

export default useProvider;
