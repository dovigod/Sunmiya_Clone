# Finger Labs Frontend interview : cloning[Sunmiya Club Techa Miya Gallery](https://sunmiya.club/gallery/techa)

## Key Features

- Filtering
- Progressing Fetching
- Search By TokenId

---

## Get Started

### Initializing project

Basically used `yarn` as package manager. So recommend to use yarn.

```
yarn install
```

### Quick start

Run project on local server.

```shell
yarn dev
```

### Terminology

- NFT : Specifc NFT Component, mapped with data returned by `contract.tokenURI()`
- NFTChunk : a.k.a NFTPaginationChunk, it contains 33 units of NFT.
- chunkId : Unique identifier of each NFTChunk.(0 ~ 32?)
- tokenId : Unique identifier of each NFT. (0 ~ 999)
- threshold(point) : Threshold component, if this component gets on viewport, next fetch goes on.
- searchTarget : keyword which user enters

### Flow Details

1.  Filter

- FilterManagerContext + useFilterManger deals entire logic of filter flow.
- Since there r lots of filter option, I'd made object which contains "trait_type" as key, and collection of available values as value. so whenever wants to check whether specific NFT caught by filter, then just access filter object by NFT's trait_type and value. If result is true, Its caught.

2.  Progressive Fetching (fetch by bundle)

- SunmiyaContractContext + useContract deals entire logic of this flow.
- This flow was mainly to cope with performance issue, due to bunch of API calls.
- Since ```contract.tokenURI()` returns endpoint for actual data, I needed to fetch twice per each NFT, Which means I need maximum 2000 times of request to get whole data.
- Combined with intersectionObserver API, after initial fetch (33 NFT), whenever threshold point gets hit, fetch next NFTchunk.

3.  Search Fetching + filtering (search by tokenId)

- FilterManagerContext + SunmiyaContractContext + useSearch deals this logic
- honestly, this logic should be more optimized. (which could be done by migrating some features from progressive fetching, since I'm getting lack of time, I'll leave as text)
- since we all know NFT ranges only from 0 to 999, select number from 0 ~ 999 which matches searchTarget
- send request to contract and request to URI. (by this, you will get lots of lags if keyword has lots of common on NFT range.) (e.g 1 -> [1,10,11~19,21,31,....])

### Issues

[ ] - layout shift for Image
