import { Container } from '@material-ui/core'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as React from 'react'

type Props = {
  title?: string
  fullWidth?: boolean
}

const Layout: React.FC<Props & { currentPath: string }> = ({
  children,
  title = 'app',
  fullWidth,
  currentPath,
}) => (
  <div className="root" data-test={`page-${currentPath.replace(/\//g, '')}`}>
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header></header>
      {fullWidth ? (
        children
      ) : (
        <Container>
          <div>{children}</div>
        </Container>
      )}
    </div>
    <footer>
      <Container>
        <hr />
        <nav></nav>
      </Container>
    </footer>
    <style jsx>{`
      .root {
        padding: 2rem 0;
        height: 100vh;
        margin: 0;
        display: grid;
        grid-template-rows: 1fr auto;

        .wrapper {
          min-height: 100%;
          margin-bottom: -50px;
        }
        footer {
          grid-row-start: 2;
          grid-row-end: 3;
        }
      }
    `}</style>
  </div>
)

function LayoutRouter(props: React.PropsWithChildren<Props>) {
  const { pathname } = useRouter()

  return <Layout {...props} currentPath={pathname} />
}

export default LayoutRouter
