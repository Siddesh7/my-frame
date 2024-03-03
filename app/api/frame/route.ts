import {NextResponse} from "next/server";
import {getAddressForFid} from "frames.js";
import axios from "axios";
export async function POST(req: any) {
  const {
    untrustedData: {fid, buttonIndex, inputText},
  } = await req.json();

  const address = await getAddressForFid({
    fid,
    options: {fallbackToCustodyAddress: true},
  });
  let polygon = 0;
  let ethereum = 0;
  let arbitrum = 0;
  let binance = 0;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization:
        "Basic emtfZGV2XzkwOGQ4NGEyOTcwZTRlODhhN2Y3MmNjMjk4OTJjODkzOg==",
    },
  };
  if (address) {
    if (buttonIndex === 2 || buttonIndex === 4) {
      const response = await axios.get(
        `https://api.zerion.io/v1/wallets/${
          buttonIndex === 4 ? inputText : address
        }/nft-collections/?currency=usd`,
        options
      );
      console.log(response.data.data);
      const url1 =
        response?.data?.data[0]?.attributes?.collection_info.content.icon.url;
      const url2 =
        response?.data?.data[1]?.attributes?.collection_info.content.icon.url;
      const url3 =
        response?.data?.data[2]?.attributes?.collection_info.content.icon.url;
      const nft1Name =
        response?.data?.data[0]?.attributes?.collection_info.name;
      const nft2Name =
        response?.data?.data[1]?.attributes?.collection_info.name;
      const nft3Name =
        response?.data?.data[2]?.attributes?.collection_info.name;
      const imageURL = `${process.env.NEXT_PUBLIC_HOST}/api/image?section=3&url1=${url1}&url2=${url2}&url3=${url3}&nft1Name=${nft1Name}&nft2Name=${nft2Name}&nft3Name=${nft3Name}`;

      const postUrl = `${process.env.NEXT_PUBLIC_HOST}/api/frame`;
      return new NextResponse(
        `<!DOCTYPE html>
            <html>
              <head>
                <title>frameSwap:</title>
                <meta property="og:title" content="frameSwap:" />
                <meta property="og:image" content="${imageURL}" />
                <meta name="fc:frame" content="vNext" />
                <meta name="fc:frame:post_url" content="${postUrl}" />
                <meta name="fc:frame:image" content="${imageURL}" />
              </head>
            </html>`,
        {
          status: 200,
          headers: {
            "Content-Type": "text/html",
          },
        }
      );
    }
    const response = await axios.get(
      `https://api.zerion.io/v1/wallets/${
        buttonIndex == 3 ? inputText : address
      }/portfolio`,
      options
    );

    polygon =
      response?.data?.data?.attributes?.positions_distribution_by_chain
        ?.polygon;
    ethereum =
      response?.data?.data?.attributes?.positions_distribution_by_chain
        ?.ethereum;
    arbitrum =
      response?.data?.data?.attributes?.positions_distribution_by_chain
        ?.arbitrum;
    binance =
      response?.data?.data?.attributes?.positions_distribution_by_chain[
        "binance-smart-chain"
      ];
  }
  const imageURL = `${process.env.NEXT_PUBLIC_HOST}/api/image?section=2&pol=${polygon}&arb=${arbitrum}&eth=${ethereum}&bsc=${binance}`;

  const postUrl = `${process.env.NEXT_PUBLIC_HOST}/api/frame`;
  return new NextResponse(
    `<!DOCTYPE html>
      <html>
        <head>
          <title>frameSwap:</title>
          <meta property="og:title" content="frameSwap:" />
          <meta property="og:image" content="${imageURL}" />
          <meta name="fc:frame" content="vNext" />
          <meta name="fc:frame:post_url" content="${postUrl}" />
          <meta name="fc:frame:image" content="${imageURL}" />
     
  
        
        </head>
  
      </html>`,
    {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
}

export async function GET(req: any) {
  const imageURL = `${process.env.NEXT_PUBLIC_HOST}/api/image?section=1`;
  const postUrl = `${process.env.NEXT_PUBLIC_HOST}/api/frame`;
  return new NextResponse(
    `<!DOCTYPE html>
      <html>
        <head>
          <title>frameSwap:</title>
          <meta property="og:title" content="frameSwap:" />
          <meta property="og:image" content="${imageURL}" />
          <meta name="fc:frame:post_url" content="${postUrl}" />
          <meta name="fc:frame" content="vNext" />
        
          <meta name="fc:frame:image" content="${imageURL}" />
          <meta name="fc:frame:button:1" content="Reveal my Portfolio" />
          <meta name="fc:frame:button:2" content="Reveal my NFTs" />
        <meta name="fc:frame:input:text" content="address (leave empty for self)" />
        
          <meta name="fc:frame:button:3" content="Fetch Portfolio" />
          <meta name="fc:frame:button:4" content="Fetch NFTs" />
        
        </head>
     
      </html>`,
    {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
}
