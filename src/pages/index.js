import { signIn, signOut, useSession } from 'next-auth/client'
import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const [session, loading] = useSession()
  const router = useRouter()

  useEffect(() => {
    router.push("/top-tracks")
  }, [session])

  return (
    <Container maxWidth="sm">
      <h1>test</h1>
      {!session && <>
        Not signed in <br />
        <Button onClick={() => signIn()}>Sign in</Button>
      </>}
      {session && <>
        Signed in as {session.user.email} <br />
        <Button color="primary" variant="outlined" onClick={() => signOut()}>Sign out</Button>
      </>}
    </Container>
  )
}
