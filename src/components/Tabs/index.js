import './index.css'

const Tabs = props => {
  const {eachMenu, isActive, updateTabId} = props
  console.log('is active from', isActive)

  const styleCsName = isActive ? 'activeClsName' : ''

  const onClickTabItem = () => {
    updateTabId(eachMenu.menuCategoryId)
  }

  const {menuCategory} = eachMenu

  return (
    <button
      className={`tabButton ${styleCsName}`}
      type="button"
      onClick={onClickTabItem}
    >
      {menuCategory}
    </button>
  )
}
export default Tabs
