import { FC, ReactElement } from 'react'
import { type IconButtonProps } from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Badge from '@mui/material/Badge'

import { IconButton } from '~/design-system/components/icon-button/IconButton'

interface NavigationIconProps {
  tooltip: string
  icon: ReactElement
  buttonProps: Omit<IconButtonProps, 'size'>
  badgeContent?: number
}

const NavigationIcon: FC<NavigationIconProps> = ({
  tooltip,
  icon,
  buttonProps,
  badgeContent = 0
}) => {
  const { loading, ...restButtonProps } = buttonProps
  const safeLoading = loading === null ? undefined : loading

  return (
    <Tooltip arrow title={tooltip}>
      <IconButton
        color={'default'}
        {...restButtonProps}
        loading={safeLoading}
      >
        <Badge badgeContent={badgeContent} color={'error'}>
          {icon}
        </Badge>
      </IconButton>
    </Tooltip>
  )
}

export default NavigationIcon
