import imagePathJson from "src/data/ui/cimagepath.json";

export const getAssetImage = (id: number | undefined) => {
  if (!id) return null;

  const imagePath = imagePathJson.Data[id as unknown as keyof typeof imagePathJson.Data];
  if (!imagePath) return null;

  // const frame = characterFrames[id];
  // if (frame) return `/${frame}`;

  const { assetBundle, assetName } = imagePath;
  let modifiedAssetBundle = assetBundle;

  if (!assetBundle.toLowerCase().includes(assetName.toLowerCase())) {
    const assetBundleParts = assetBundle.split(".assetbundle");
    modifiedAssetBundle = `${assetBundleParts[0]}.${assetName}.assetbundle`;
  } else {
    const escapedAssetName = assetName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const assetBundleParts = assetBundle.split(new RegExp(escapedAssetName, "i"));
    modifiedAssetBundle = `${assetBundleParts[0]}.${assetName}.assetbundle`;
  }

  const formattedPath = modifiedAssetBundle.replace(/\./g, "/").replace(/\/assetbundle$/, ".png");

  return `/${formattedPath}`;
};

export const getL2DImage = (assetBundle: string | undefined) => {
  if (!assetBundle) return null;

  const formattedPath = assetBundle.replace(/\./g, "/").replace(/\/assetbundle$/, "");

  return `/${formattedPath}`;
};

export const getAssetName = (asset: string) => asset.split("/").pop()?.split(".")[0] ?? null;
