import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchorList } from "plasmo"
import { useEffect, useState } from "react"

export const config: PlasmoCSConfig = {
  matches: ["https://opensea.io/collection/0n1-force"]
}

export const getInlineAnchorList: PlasmoGetInlineAnchorList = async () =>
  document.querySelectorAll("div.AssetMedia--img")

export const getShadowHostId = () => "0n1wiki-ext"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const FramesInfo = () => {
  const [imgUrl, setImgUrl] = useState("")
  useEffect(() => {
    const imgParent = document.querySelector("div.AssetMedia--img")
    imgParent.setAttribute("class", "relative")
    console.log("imgParent: ", imgParent)

    if (imgParent) {
      const imgTag = imgParent.querySelector("img")
      if (imgTag) {
        const altText = imgTag.getAttribute("alt")
        console.log("Alt attribute of the image:", altText)
        const id = altText?.split("#")[1]
        if (id) {
          fetch(
            `https://ipfs.io/ipfs/QmTEho9mMSVkAiENhroPZW8MASja2JpgFbmpaupcJrLywq/${id}`
          )
            .then((response) => response.json())
            .then((data) => {
              const imgUrl = data.image.split("ipfs://")[1]
              setImgUrl("https://ipfs.io/ipfs/" + imgUrl)
            })
            .catch((error) => {
              console.error("Error fetching metadata:", error)
            })
        }
      }
    }
  }, [])
  return (
    <div className="w-full h-full">
      {imgUrl && <img src={imgUrl} alt="Metadata" width="25%" height="25%" />}
    </div>
  )
}

export default FramesInfo
