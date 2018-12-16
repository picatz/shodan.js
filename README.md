# shodan.js

This is a asyncronous, vanillaJS library for [Shodan](https://www.shodan.io/) meant to be used in the browser.

```javascript
let client = new ShodanClient("YOUR_API_KEY")
```

## Host Information

Returns all services that have been found on the given host IP.

```javascript
client.hostInfo("8.8.8.8").then(json => console.log(json))

// include historical banners
client.hostInfo("8.8.8.8", { history: true }).then(json => console.log(json))

// only return the list of ports and the general host information, no banners
client.hostInfo("8.8.8.8", { minify: true }).then(json => console.log(json))
```

## Host Search

Search Shodan using the same query syntax as the website and use facets to get summary information for different properties.

```javascript
client.hostSearch("mongodb").then(json => console.log(json))
client.hostSearch("nginx").then(json => console.log(json))
client.hostSearch("apache", { after: "1/12/16" }).then(json => console.log(json))
client.hostSearch("ssh", { port: 22, page: 1 }).then(json => console.log(json))
client.hostSearch("ssh", { port: 22, page: 2 }).then(json => console.log(json))
client.hostSearch("ftp", { port: 21, facets: { link: "Ethernet or modem" } }).then(json => console.log(json))
```

## Search Shodan without Results

This method behaves identical to `hostSearch` with the only difference that this method does not return any host results, it only returns the total number of results that matched the query and any facet information that was requested. As a result this method does not consume query credits.

```javascript
client.hostCount("apache").then(json => console.log(json))
client.hostCount("apache", { country: "US" }).then(json => console.log(json))
client.hostCount("apache", { country: "US", state: "MI" }).then(json => console.log(json))
client.hostCount("apache", { country: "US", state: "MI", city: "Detroit" }).then(json => console.log(json))
client.hostCount("apache", { country: 5 }).then(json => console.log(json))
```

## Scan Targets

Use this method to request Shodan to crawl an IP or netblock.

```javascript
client.scan("8.8.8.8").then(json => console.log(json))
```

## Scan Internet for Port

Use this method to request Shodan to crawl the Internet for a specific port.

This method is restricted to security researchers and companies with a Shodan Data license. To apply for access to this method as a researcher, please email `jmath@shodan.io` with information about your project.

> ⚠️ Access is restricted to prevent abuse.

```javascript
client.scanInternet({ port: 80, protocol: "http" })
```

## List Community Queries

Use this method to obtain a list of search queries that users have saved in Shodan.

```javascript
client.communityQueryList().then(json => console.log(json))
client.communityQueryList({ page: 2 }).then(json => console.log(json))
client.communityQueryList({ sort: "votes" }).then(json => console.log(json))
client.communityQueryList({ sort: "votes", page: 2 }).then(json => console.log(json))
client.communityQueryList({ order: "asc" }).then(json => console.log(json))
client.communityQueryList({ order: "desc" }).then(json => console.log(json))
```

## Search Community Queries

Use this method to search the directory of search queries that users have saved in Shodan.

```javascript
client.communityQuerySearch("the best").then(json => console.log(json))
client.communityQuerySearch("the best", 2).then(json => console.log(json)) // second page
```

## Popular Community Query Tags

Use this method to obtain a list of popular tags for the saved search queries in Shodan.

```javascript
client.communityPopularQueryTags().then(json => console.log(json))   // get 10 of them, the default
client.communityPopularQueryTags(20).then(json => console.log(json)) // get 20 of them
```

## Protocols

This method returns an object containing all the protocols that can be used when launching an Internet scan.

```javascript
client.protocols().then(json => console.log(json))
```

## Ports

This method returns a list of port numbers that the Shodan crawlers are looking for.

```javascript
client.ports().then(json => console.log(json))
```

## Account Info

Returns information about the Shodan account linked to the client's API key.

```javascript
client.accountInfo().then(json => console.log(json))
```

## DNS Lookup

Look up the IP address for the provided list of hostnames.

```javascript
client.resolve("google.com").then(json => console.log(json))
```

## Reverse DNS Lookup

Look up the hostnames that have been defined for the given list (comma separated) of IP addresses.

```javascript
client.reverseLookup("74.125.227.230").then(json => console.log(json))
```

## HTTP Headers

Shows the HTTP headers that your client sends when connecting to a webserver.

```javascript
client.httpHeaders().then(json => console.log(json))
```

## My IP Address

Get your current IP address as seen from the Internet.

```javascript
client.myIP().then(json => console.log(json))
```

## Honeypot Score

Calculates a honeypot probability score ranging from 0 (not a honeypot) to 1.0 (is a honeypot).

```javascript
client.honeyScore("8.8.8.8").then(json => console.log(json))
```

## API Plan Information

Returns information about the API plan belonging to the given API key.

```javascript
client.planInfo().then(json => console.log(json))
```

## Streaming Banners

This stream provides 1-5% of the data that Shodan collects. Use this stream if you need access to everything and/ or want to store your own Shodan database locally. If you only care about specific ports, please use the Ports stream.

```javascript
client.bannerStream(json => console.log(json))
```

## Banners Filtered by Ports

Only returns banner data for the list of specified ports. This stream provides a filtered, bandwidth-saving view of the Banners stream in case you are only interested in a specific list of ports.

```javascript
client.bannerStreamByPorts("22,80", json => console.log(json))
```

## Streaming Banners, filtered by ASN(s)

This stream provides a filtered, bandwidth-saving view of the Banners stream in case you are only interested in devices located in certain ASNs.

```javascript
client.bannerStreamByASNs("3303,32475", json => console.log(json))
```

## Streaming Banners, filtered by one or more countires

This stream provides a filtered, bandwidth-saving view of the Banners stream in case you are only interested in devices located in certain countries.

```javascript
client.bannerStreamByCountries("DE,US,JP", json => console.log(json))
```

## Streaming Banners, filtered by network alerts

Subscribe to banners discovered on all IP ranges described in the network alerts.

```javascript
client.alertStream(json => console.log(json))
```

## Streaming Banners, filtered by alert ID

Subscribe to banners discovered on all IP ranges described in the network alerts.

```javascript
client.alertStreamByID("HKVGAIRWD79Z7W2T", json => console.log(json))
```

## Search Exploits

Search across a variety of data sources for exploits and use facets to get summary information.

```javascript
client.searchExploits("python").then(json => console.log(json))
client.searchExploits({ port: 22 }).then(json => console.log(json))
client.searchExploits("ssh", { port: 22 }).then(json => console.log(json))
client.searchExploits("windows", { type: "shellcode" }).then(json => console.log(json))
client.searchExploits({ osvdb: "100007" }).then(json => console.log(json))
```

## Count Exploits

This method behaves identical to the `searchExploits` method with the difference that it doesn't return any results, just the total.

```javascript
client.countExploits("python").then(json => console.log(json))
client.countExploits({ port: 22 }).then(json => console.log(json))
client.countExploits("ssh", { port: 22 }).then(json => console.log(json))
client.countExploits("windows", { type: "shellcode" }).then(json => console.log(json))
client.countExploits({ osvdb: "100007" }).then(json => console.log(json))
```