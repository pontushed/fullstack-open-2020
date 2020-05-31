const initialState = ''
const filterReducer = (state = initialState, action) => {
  if (action.type === 'FILTER_SET') return action.filterString
  return ''
}

export const setFilter = (filterString) => {
  return {
    type: 'FILTER_SET',
    filterString: filterString,
  }
}

export const clearFilter = () => {
  return {
    type: 'FILTER_CLEAR',
    filterString: '',
  }
}

export default filterReducer
