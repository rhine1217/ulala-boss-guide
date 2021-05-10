export const getFilterValues = (searchParams) => {
  return ({
    user: searchParams.get("user") ? searchParams.get("user").split(';') : [],
    status: searchParams.get("status") ? searchParams.get("status").split(';') : [],
    bossNames: searchParams.get("bossNames") ? searchParams.get("bossNames").split(';') : [],
    charClass: searchParams.get("charClass") ? searchParams.get("charClass").split(';') : [],
    teamClass: searchParams.get("teamClass") ? searchParams.get("teamClass").split(';') : [],
  })
}

export const filterMethods = {
  user: (results, filterValues, currentUser) => {
    if (filterValues.length !== 1) {
      return results
    } else {
      if (filterValues.includes('Me')) {
        return results.filter(result => result['created_by'] === currentUser.username)
      } else if (filterValues.includes('Others')) {
        return results.filter(result => result['created_by'] !== currentUser.username)
      }
    }
  },
  status: (results, filterValues) => results.filter(result => filterValues.includes(result.status)),
  bossNames: (results, filterValues) => results.filter(result => filterValues.includes(result.boss.name)),
  charClass: (results, filterValues) => results.filter(result => filterValues.every(value => result['player_classes'].includes(value))),
  teamClass: (results, filterValues) => results.filter(result => filterValues.includes(result['player_classes'].join(', '))).sort()
}

export const getFilterChoices = {
  bossNames: (results) => [...new Set(results.map(result => result['boss']['name']))].sort(),
  charClass: (results) => [...new Set(results.map(result => result['player_classes']).flat())],
  teamClass: (results) => [...new Set(results.map(result => result['player_classes'].join(', ')))].sort(),
}

export const filterNames = {
  user: 'Created by',
  status: 'Status',
  bossNames: 'Boss Name',
  charClass: 'Character Class',
  teamClass: 'Team Classes'
}