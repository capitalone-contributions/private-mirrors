'use client'

import { Box } from '@primer/react'
import { OrgHeader } from 'app/components/header/OrgHeader'
import { signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useOrgData } from 'utils/organization'

const DashLayout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession()
  const orgData = useOrgData()

  // sign user out if session is expired
  useEffect(() => {
    if (!session) {
      signOut()
    }

    if (session.data) {
      if (new Date(session.data.expires) < new Date()) {
        signOut()
      }
    }
  }, [session])

  return (
    <Box sx={{ margin: '10px 90px' }}>
      <Box>
        <OrgHeader orgData={orgData} />
      </Box>
      <Box>{children}</Box>
    </Box>
  )
}

export default DashLayout
