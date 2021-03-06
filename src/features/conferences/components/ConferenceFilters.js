import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import IconCard from '@bit/totalsoft_oss.react-mui.icon-card'
import DateTime from '@bit/totalsoft_oss.react-mui.date-time'
import SearchIcon from '@material-ui/icons/Search'
import { useTranslation } from 'react-i18next'
import Button from '@bit/totalsoft_oss.react-mui.button'
import { generateDefaultFilters } from 'utils/functions'

function ConferenceFilters(props) {
  const { filters, onApplyFilters } = props

  const [startDate, setStartDate] = useState(filters?.startDate)
  const [endDate, setEndDate] = useState(filters?.endDate)

  useEffect(() => {
    setStartDate(filters.startDate)
    setEndDate(filters.endDate)
  }, [filters])

  const handleApplyButton = useCallback(() => onApplyFilters({ startDate, endDate }), [endDate, onApplyFilters, startDate])
  const handleResetButton = useCallback(() => onApplyFilters(generateDefaultFilters()), [onApplyFilters])
  const handleEnterPress = useCallback(event => event.keyCode === 13 && handleApplyButton(), [handleApplyButton])

  const { t } = useTranslation()

  return (
    <>
      <IconCard
        icon={SearchIcon}
        iconColor='theme'
        content={
          <Grid container spacing={2} onKeyDown={handleEnterPress}>
            <Grid item>
              <DateTime label={t('Conferences.Filters.StartDate')} clearable value={startDate} onChange={setStartDate} />
            </Grid>
            <Grid item>
              <DateTime label={t('Conferences.Filters.EndDate')} clearable value={endDate} onChange={setEndDate} />
            </Grid>
          </Grid>
        }
      />
      <Button size={'sm'} color={'primary'} right={true} onClick={handleResetButton}>
        {t('General.Buttons.ResetFilters')}
      </Button>
      <Button size={'sm'} color={'primary'} right={true} onClick={handleApplyButton}>
        {t('General.Buttons.ApplyFilters')}
      </Button>
    </>
  )
}

ConferenceFilters.propTypes = {
  filters: PropTypes.object,
  onApplyFilters: PropTypes.func
}

export default ConferenceFilters
