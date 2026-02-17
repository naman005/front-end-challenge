"use client"

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client"
import { ApolloProvider } from "@apollo/client/react"
import { SetContextLink } from "@apollo/client/link/context"
import { ReactNode, useMemo } from "react"

export function ApolloWrapper({
  children,
}: {
  children: ReactNode
}) {
  const client = useMemo(() => {
    const httpLink = new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    })

    const authLink = new SetContextLink(
      (prevContext) => {
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("token")
            : null

        return {
          headers: {
            ...prevContext.headers,
            Authorization: token
              ? `Bearer ${token}`
              : "",
          },
        }
      }
    )

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    })
  }, [])

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}
