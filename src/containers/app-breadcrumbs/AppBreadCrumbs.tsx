import { useTranslation } from 'react-i18next'
import { Link, useMatches } from 'react-router-dom'
import { Breadcrumbs, Typography, Container } from '@mui/material'

import { Matches } from '~/types'
import { styles } from '~/containers/app-breadcrumbs/AppBreadCrumbs.styles'

const AppBreadCrumbs = () => {
  const { t } = useTranslation()
  const matches = useMatches() as Matches[]
  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) =>
      typeof match.handle.crumb === 'function'
        ? match.handle.crumb(match.data)
        : match.handle.crumb
    )
    .flat()

  const breadCrumbs = crumbs.map((crumb, idx) => {
    const isLast = idx === crumbs.length - 1
    const component = isLast ? Typography : Link
    const paramName = crumb.path?.split(':')[1]
    const path = paramName
      ? crumb.path?.replace(`:${paramName}`, matches[0].params[paramName] || '')
      : crumb.path
    return (
      <Typography
          color={'textPrimary'}
        component={component}
        data-testid='breadCrumb'
        key={crumb.name}
        sx={isLast ? styles.link : styles.previous}
        to={path}
      >
        {t(crumb.name)}
      </Typography>
    )
  })

  const separator = <Typography sx={styles.separator} />

  return crumbs.length > 1 ? (
    <Container maxWidth='xl' sx={styles.root}>
      <Breadcrumbs separator={separator} sx={styles.breadCrumbs}>
        {breadCrumbs}
      </Breadcrumbs>
    </Container>
  ) : null
}

export default AppBreadCrumbs
