import { mainShadow } from '~/styles/app-theme/custom-shadows'
const hideOnMobile = {
  display: { xs: 'none', md: 'inherit' },
  color: 'primary.900'
}
export const styles = {
  appBar: { boxShadow: mainShadow, backgroundColor: 'basic.white' },
  toolBar: { height: { xs: '56px', sm: '72px', md: '80px' } },

  loginButton: {
    ...hideOnMobile,
    ml: '12px'
  },
}
