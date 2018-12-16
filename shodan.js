
class ShodanClient {
    constructor(api_key) {
        this.api_key = api_key;

        this.endpoints = {
            exploitAPI: "https://exploits.shodan.io/api",
            streamingAPI: "https://stream.shodan.io",
            defaultAPI: "https://api.shodan.io"
        }
    }

    _turn_into_facets(params) {
        if (params) {
            return Object.keys(params).map(key => key + ":" + params[key]).join(",")
        }
    }

    async hostInfo(ip, params) {
        let url = new URL(this.endpoints.defaultAPI + "/shodan/host/" + ip)

        if (params) {
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        }

        url.searchParams.append("key", this.api_key)

        let response = await fetch(url)

        let json = await response.json()

        if (response.ok) return json

        throw new Error(json.error)
    }

    async hostCount(query, facets) {
        let url = new URL(this.endpoints.defaultAPI + "/shodan/host/count")

        url.searchParams.append("query", query)

        facets = this._turn_into_facets(facets)

        if (facets) {
            url.searchParams.append("facets", facets)
        }

        url.searchParams.append("key", this.api_key)

        let response = await fetch(url)

        let json = await response.json()

        if (response.ok) return json

        throw new Error(json.error)
    }

    async hostSearch(query, facets) {
        let url = new URL(this.endpoints.defaultAPI + "/shodan/host/search")

        url.searchParams.append("query", query)

        facets = this._turn_into_facets(facets)

        if (facets) {
            url.searchParams.append("facets", facets)
        }

        url.searchParams.append("key", this.api_key)

        let response = await fetch(url)

        let json = await response.json()

        if (response.ok) return json

        throw new Error(json.error)
    }

    async hostSearchTokens(params) {
        let url = new URL(this.endpoints.defaultAPI + "/shodan/host/search/tokens")

        if (params) {
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        }

        url.searchParams.append("key", this.api_key)

        let response = await fetch(url)

        if (response.ok) return await response.json()

        throw new Error(json.error)
    }

    async ports() {
        let url = new URL(this.endpoints.defaultAPI + "/shodan/ports")

        url.searchParams.append("key", this.api_key)

        let response = await fetch(url)

        if (response.ok) return await response.json()

        throw new Error(json.error)
    }

    async protocols() {
        let url = new URL(this.endpoints.defaultAPI + "/shodan/protocols")

        url.searchParams.append("key", this.api_key)

        let response = await fetch(url)

        if (response.ok) return await response.json()
        
        throw new Error(response.status)
    }
}

var client = new ShodanClient("YOUR_API_KEY")

var resp = await client.hostCount("apache")