import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getDataDB, IData } from '../db/db'
import styled from 'styled-components'
import GroupComp from '../component/GroupComp'


const ContentSC = styled.div`
    width: calc(100% - 1rem);
    margin: 0 auto;
    margin-top: 1rem;
`

const Content = () => {
    const router = useRouter()
    const [data, setData] = useState<IData>()

    useEffect(() => {
        loadData()
        return () => {
            setData(undefined)
        }
    }, [])

    const loadData = async () => {
        const auth = localStorage.getItem("auth")
        if (auth === "false") {
            return router.push("/")
        }
        const result = await getDataDB()
        setData(result)
    }
    return (
        <ContentSC>
            <Link href="/">
                <div style={{display: "flex", justifyContent: "flex-end", marginRight: "2rem"}}>

                <a className="primary-button" onClick={() => localStorage.setItem("auth", "false")}
                >Wyloguj</a>
                </div>
            </Link>
            {data && data.data.groups.map(group => <GroupComp key={group.id} appName={data.data.appName} group={group} />)}
        </ContentSC>
    )
}

export default Content;