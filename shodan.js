class ShodanClient {
    constructor(api_key) {
        this.api_key = api_key;

        this.endpoints = {
            exploitAPI: "https://exploits.shodan.io/api",
            streamingAPI: "https://stream.shodan.io",
            defaultAPI: "https://api.shodan.io"
        }
    }

    // REST API

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

    async scan(ips) {
        let url = new URL(this.endpoints.defaultAPI + "/shodan/scan")

        url.searchParams.append("ips", ips)

        url.searchParams.append("key", this.api_key)

        let response = await fetch(url, { method: "POST" })

        if (response.ok) return await response.json()

        throw new Error(response.status)
    }

    async scanInternet(params) {
        let url = new URL(this.endpoints.defaultAPI + "/shodan/scan/internet")

        if (params) { Object.keys(params).forEach(key => url.searchParams.append(key, params[key])) }

        url.searchParams.append("key", this.api_key)

        let response = await fetch(url, { method: "POST" })

        if (response.ok) return await response.json()

        throw new Error(response.status)
    }

    async scanStatus(id) {
        let url = new URL(this.endpoints.defaultAPI + "/shodan/scan/" + id)

        url.searchParams.append("id", id)

        url.searchParams.append("key", this.api_key)

        let response = await fetch(url)

        if (response.ok) return await response.json()

        throw new Error(response.status)
    }

    async alert(params) {
        let url = new URL(this.endpoints.defaultAPI + "/shodan/alert")

        if (params) { Object.keys(params).forEach(key => url.searchParams.append(key, params[key])) }

        url.searchParams.append("key", this.api_key)

        let response = await fetch(url, { method: "POST" })

        if (response.ok) return await response.json()

        throw new Error(response.status)
    }

    async alertInfo(id) {
        let url = new URL(this.endpoints.defaultAPI + "/shodan/alert/" + id + "/info")

        url.searchParams.append("key", this.api_key)

        let response = await fetch(url)

        if (response.ok) return await response.json()

        throw new Error(response.status)
    }

    async deleteAlert(id) {
        let url = new URL(this.endpoints.defaultAPI + "/shodan/alert/" + id + "/info")

        url.searchParams.append("key", this.api_key)

        let response = await fetch(url, { method: "DELETE" })

        if (response.ok) return await response.json()

        throw new Error(response.status)
    }

    async alerts() {
        let url = new URL(this.endpoints.defaultAPI + "/shodan/alert/info")

        url.searchParams.append("key", this.api_key)

        let response = await fetch(url)

        if (response.ok) return await response.json()

        throw new Error(response.status)
    }

    async communityQueryList(params) {
        let url = new URL(this.endpoints.defaultAPI + "/shodan/query")

        if (params) { Object.keys(params).forEach(key => url.searchParams.append(key, params[key])) }

        url.searchParams.append("key", this.api_key)

        let response = await fetch(url)

        if (response.ok) return await response.json()

        throw new Error(response.status)
    }

    async communityQuerySearch(query, page) {
        let url = new URL(this.endpoints.defaultAPI + "/shodan/query/search")

        if (page) {
            url.searchParams.append("page", page)
        }

        url.searchParams.append("key", this.api_key)

        let response = await fetch(url)

        if (response.ok) return await response.json()

        throw new Error(response.status)
    }

    async communityPopularQueryTags(size) {
        let url = new URL(this.endpoints.defaultAPI + "/shodan/query/tags")

        if (size) {
            url.searchParams.append("size", size)
        }

        url.searchParams.append("key", this.api_key)

        let response = await fetch(url)

        if (response.ok) return await response.json()

        throw new Error(response.status)
    }

    async accountInfo() {
        let url = new URL(this.endpoints.defaultAPI + "/account/profile")

        url.searchParams.append("key", this.api_key)

        let response = await fetch(url)

        if (response.ok) return await response.json()

        throw new Error(response.status)
    }

    async resolve(hosts) {
        let url = new URL(this.endpoints.defaultAPI + "/dns/resolve")

        url.searchParams.append("hostnames", hosts)

        url.searchParams.append("key", this.api_key)

        let response = await fetch(url)

        if (response.ok) return await response.json()

        throw new Error(response.status)
    }

    async reverseLookup(ips) {
        let url = new URL(this.endpoints.defaultAPI + "/dns/reverse")

        url.searchParams.append("ips", ips)

        url.searchParams.append("key", this.api_key)

        let response = await fetch(url)

        if (response.ok) return await response.json()

        throw new Error(response.status)
    }

    async httpHeaders() {
        let url = new URL(this.endpoints.defaultAPI + "/tools/httpheaders")

        url.searchParams.append("key", this.api_key)

        let response = await fetch(url)

        if (response.ok) return await response.json()

        throw new Error(response.status)
    }

    async myIP() {
        let url = new URL(this.endpoints.defaultAPI + "/tools/myip")

        url.searchParams.append("key", this.api_key)

        let response = await fetch(url)

        if (response.ok) return await response.json()

        throw new Error(response.status)
    }

    async honeyScore(ip) {
        let url = new URL(this.endpoints.defaultAPI + "/labs/honeyscore/" + ip)

        url.searchParams.append("key", this.api_key)

        let response = await fetch(url)

        if (response.ok) return await response.json()

        throw new Error(response.status)
    }

    async planInfo() {
        let url = new URL(this.endpoints.defaultAPI + "/api-info")

        url.searchParams.append("key", this.api_key)

        let response = await fetch(url)

        if (response.ok) return await response.json()

        throw new Error(response.status)
    }

    // Exploits API

    async searchExploits(query, facets) {
        let url = new URL(this.endpoints.exploitAPI + "/search")

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

    async countExploits(query, facets) {
        let url = new URL(this.endpoints.exploitAPI + "/count")

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

    // Streaming API

    _slurp_stream(url, callback, interval) {
        url.searchParams.append("t", "json");

        url.searchParams.append("key", this.api_key);

        if (!interval) {
            interval = 1000
        }

        var reader = null

        fetch(url).then(function (response) {
            reader = response.body.getReader();
        });

        let buffer = [];

        let readerInterval = setInterval(function () {
            if (reader) {
                reader.read().then(function (data) {
                    if (data.done) {
                        clearInterval(readerInterval);
                        return
                    }
                    data.value.forEach(function (e) {
                        buffer.push(e);
                        if (e == 10) {
                            var json = JSON.parse(new TextDecoder("utf-8").decode(Uint8Array.from(buffer)));
                            if (callback) {
                                callback(json)
                            }
                            buffer = [];
                        }
                    })
                })
            } else {
                clearInterval(readerInterval);
                return
            }
        }, interval)
    }

    bannerStream(callback, interval) {
        let url = new URL(this.endpoints.streamingAPI + "/shodan/banners")

        this._slurp_stream(url, callback, interval)
    }

    bannerStreamByASNs(asns, callback, interval) {
        let url = new URL(this.endpoints.streamingAPI + "/shodan/asn/" + asns)

        this._slurp_stream(url, callback, interval)
    }

    bannerStreamByCountries(countries, callback, interval) {
        let url = new URL(this.endpoints.streamingAPI + "/shodan/countries/" + countries)

        this._slurp_stream(url, callback, interval)
    }

    bannerStreamByPorts(ports, callback, interval) {
        let url = new URL(this.endpoints.streamingAPI + "/shodan/ports/" + ports)

        this._slurp_stream(url, callback, interval)
    }

    alertStream(callback, interval) {
        let url = new URL(this.endpoints.streamingAPI + "/shodan/alert")

        this._slurp_stream(url, callback, interval)
    }

    alertStreamByID(id, callback, interval) {
        let url = new URL(this.endpoints.streamingAPI + "/shodan/alert/" + id)

        this._slurp_stream(url, callback, interval)
    }
}