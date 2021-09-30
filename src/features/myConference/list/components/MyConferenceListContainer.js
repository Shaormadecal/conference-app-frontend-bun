import React, { useCallback, useEffect, useState } from 'react'
import MyConferenceFilters from './MyConferenceFilters'
import MyConferenceList from './MyConferenceList'
import { generateDefaultFilters } from 'utils/functions'
import { useFooter, useHeader } from 'providers/AreasProvider'
import MyConferenceHeader from './MyConferenceHeader'
import { useTranslation } from 'react-i18next'
import { AddButton, LoadingFakeText, Pagination } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useHistory } from 'react-router'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { CONFERENCE_LIST_QUERY } from 'features/conferences/gql/queries/ConferenceListQuery'
import { useEmail } from 'hooks/useEmail'

const defaultPager = {
  totalCount: 0,
  pageSize: 3,
  page: 0
}

const extractPager = ({ page, pageSize }) => ({ page, pageSize })

function MyConferenceListContainer() {
  const [filters, setFilters] = useState(generateDefaultFilters())
  const [, setHeader] = useHeader()
  const [pager, setPager] = useState(defaultPager)
  const { t } = useTranslation()
  const history = useHistory()
  const [email] = useEmail()
  const [, setFooter] = useFooter()

  const { data, loading, refetch } = useQueryWithErrorHandling(CONFERENCE_LIST_QUERY, {
    variables: { pager: extractPager(pager), filters: { ...filters, organizerEmail: email }, email },
    onCompleted: result => {
      const totalCount = result?.conferenceList?.pagination?.totalCount
      setPager(state => ({ ...state, totalCount }))
    }
  })

  const handleAddClick = useCallback(() => {
    history.push('myConferences/new')
  }, [history])

  useEffect(() => {
    // did mount
    return () => {
      // will unmount
      setHeader(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setHeader(
      <MyConferenceHeader
        title={t('NavBar.MyConferences')}
        actions={<AddButton title={t('General.Buttons.AddConference')} onClick={handleAddClick} />}
      />
    )
  }, [handleAddClick, setHeader, t])

  const handleChangePage = useCallback(page => setPager(currentPager => ({ ...currentPager, page })), [setPager])

  const handleChangeRowsPerPage = useCallback(pageSize => setPager({ ...defaultPager, pageSize: parseInt(pageSize, 10) }), [setPager])

  useEffect(() => {
    if (data && pager.totalCount !== data?.conferenceList?.pagination?.totalCount) {
      setPager(currentPager => ({ ...currentPager, totalCount: data?.conferenceList?.pagination?.totalCount }))
    }
  }, [data, pager.totalCount, setPager])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => setFooter(null), [])
  useEffect(() => {
    setFooter(
      <Pagination
        totalCount={pager.totalCount}
        pageSize={pager.pageSize}
        page={pager.page}
        rowsPerPageOptions={[3, 6, 9, 12, 21]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onPageChange={handleChangePage}
        onRefresh={refetch}
      />
    )
  }, [setFooter, refetch, handleChangeRowsPerPage, handleChangePage, pager.totalCount, pager.pageSize, pager.page])

  const handleApplyFilters = useCallback(value => {
    setFilters(value)
  }, [])

  if (loading) {
    return <LoadingFakeText lines={10} />
  }

  return (
    <>
      <MyConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
      <MyConferenceList conferences={data?.conferenceList?.values} />
    </>
  )
}

export default MyConferenceListContainer
