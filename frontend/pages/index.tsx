import { useEffect, useRef, useState } from 'react'
import { useRouter } from "next/router"
import { FormEvent } from "react"
import { authDB } from "../db/db"
import styled from 'styled-components'

const FormSC = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  > *{
    margin-bottom: 1rem;
  }
`

const Home = () => {
  const router = useRouter()
  const [auth, setAuth] = useState(true)
  const login = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const auth = window.localStorage.getItem("auth")
    if (auth === "true") {
      router.push("/content")
    } else {
      setAuth(false)
    }
  })


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await authDB(login.current.value, password.current.value)

    if (result.auth) {
      router.push("/content")
      localStorage.setItem("auth", "true")
    } else {
      alert("Zły email lub hasło")
      localStorage.setItem("auth", "false")
    }
  }

  return (
    <>
      {!auth &&
        <FormSC onSubmit={handleSubmit}>
          <div>
            <label >Email</label>
            <input ref={login} type="email" required/>
          </div>
          <div>
            <label >Hasło</label>
            <input ref={password} pattern="(?=.*[A-Z])(?=.*[@$!%*#?^()&])[A-Za-z\d@$!%*#?^()&]{8,}" type="password" required/>
          </div>
          <button className="primary-button" type="submit">Zaloguj</button>
        </FormSC>
      }
    </>
  )
}

export default Home
