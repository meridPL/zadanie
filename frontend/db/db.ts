type typeMethod = "POST" | "GET" | "PUT" | "DELETE"

export interface IData {
    data: {
        appName: string,
        groups: IGroup[]
    }
}

export interface IGroup {
    id: number,
    title: string,
    elements: IElement[]
}

export interface IElement {
    id: number,
    title: string,
    description: string,
    details: {
        openInNewTab: boolean,
        url: string
        images: {
            desktop: string,
            mobile: string
        },

    }
}

export const request = async (path: string, method: typeMethod, body?: {}) => {
    const SERVER_URL = "http://localhost:3030"
    const request = await fetch(`${SERVER_URL}${path}`, {
        headers: {
            'Content-type': 'application/json'
        },
        method: method,
        body: JSON.stringify(body)
    })
    return await request.json()
}

export const getDataDB = async (): Promise<IData> => {
    const result = await request("/data", "GET")

    return result
}

export const authDB = async (login: string, password: string): Promise<{ auth: boolean }> => {
    const result = await request("/auth", "POST", {
        login: login,
        password: password
    })

    return result
}