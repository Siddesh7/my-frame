import {NextRequest} from "next/server";
import {ImageResponse} from "next/og";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const section = searchParams.get("section") ?? "1";
  const portfolio = {
    polygon: Number(searchParams.get("pol")).toFixed(2),
    ethereum: Number(searchParams.get("eth")).toFixed(2),
    arbitrum: Number(searchParams.get("arb")).toFixed(2),
    binance: Number(searchParams.get("bsc")).toFixed(2),
  };
  const nfts = {
    url1: searchParams.get("url1"),
    url2: searchParams.get("url2"),
    url3: searchParams.get("url3"),
    name1: searchParams.get("nft1Name"),
    name2: searchParams.get("nft2Name"),
    name3: searchParams.get("nft3Name"),
  };

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "1528px", // Set width to 1528px
          height: "800px", // Set height to 800px
          background: "linear-gradient(to right, #432889, #17101F)", // Add background gradient
          position: "relative",
        }}
      >
        {getSection(section, portfolio, nfts)}
      </div>
    ),
    {
      width: 1528, // Match these dimensions to your image's dimensions
      height: 800,
    }
  );
}

const getSection = (section: string, portfolio?: any, nfts?: any) => {
  switch (section) {
    case "1":
      return (
        <div
          style={{
            color: "white",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
          }}
        >
          Fetch your Portfolio and NFTs using Zerion API. You can also fetch any
          user&apos;s Portfolio and NFTs using Zerion API.
        </div>
      );

    case "2":
      return (
        <div
          style={{
            color: "white",
            fontSize: 60,
            fontStyle: "normal",

            display: "flex",

            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p style={{textAlign: "center"}}>My Portfolio (by chain)</p>
          <div style={{display: "flex", flexDirection: "column"}}>
            <div style={{display: "flex", flexDirection: "row", gap: "44px"}}>
              <p>Polygon: ${portfolio.polygon}</p>
              <p>Ethereum: ${portfolio.ethereum}</p>
            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "44px"}}>
              <p>Arbitrum: ${portfolio.arbitrum}</p>
              <p>Binance: ${portfolio.binance}</p>
            </div>
          </div>
        </div>
      );
    case "3":
      return (
        <div
          style={{
            fontSize: "60px",
            padding: "0 200px",
            textAlign: "center",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p> My NFTs</p>
          <div style={{display: "flex", flexDirection: "row", gap: "40px"}}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textWrap: "wrap",
                maxWidth: "300px",
              }}
            >
              <img src={nfts.url1} alt="" width="300px" height="300px" />
              <p style={{fontSize: "40px"}}>{nfts.name1}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textWrap: "wrap",
                maxWidth: "300px",
              }}
            >
              <img src={nfts.url2} alt="" width="300px" height="300px" />
              <p style={{fontSize: "40px"}}>{nfts.name2}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textWrap: "wrap",
                maxWidth: "300px",
              }}
            >
              <img src={nfts.url3} alt="" width="300px" height="300px" />
              <p style={{fontSize: "40px"}}>{nfts.name3}</p>
            </div>
          </div>
        </div>
      );
    case "error":
      return (
        <div
          style={{
            fontSize: "80px",
            padding: "0 200px",
            textAlign: "center",
            color: "red",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>Something went wrong! Try again</span>
        </div>
      );

    default:
      <div
        style={{
          fontSize: "60px",
          padding: "0 200px",
          textAlign: "center",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span>
          {" "}
          Now Swap directly from Warpcast with few clicks! Powered by 0x Swap
          API.
        </span>
      </div>;
      break;
  }
};
