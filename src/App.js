import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
import Loader from './Loader/Loader';
import Table from './Table/Table';
import DetailRowView from './DetailRowView/DetailRowView';
import TableSearch from './TableSearch/TableSearch';
import _ from 'lodash';

class App extends Component {
  state = { // значения по умолчанию
    isLoading: true,
    data: [],
    search: '',
    sort: 'asc', // направление сортировки ('▲')
    sortField: 'id',
    row: null,
    currentPage: 0
  }

  async componentDidMount() {
    const response = await fetch(`http://www.json-generator.com/api/json/get/bVdtQDVgya?indent=2`) // ссылка на json объект
    const data = await response.json() // объект data, в котором лежит результат работы response и его метода json

    // нужно изменить state, когда у нас загрузились данные
    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort)
    })
  }

  // реализуем метод onSort, который сортирует при клике столбцы. Чтобы контекст сохранился, создадим через стрелочную функцию
  onSort = sortField => {
    // создадим клонированный массив, чтобы не менялся наш state (будем работать только с копией массива)
    const clonedData = this.state.data.concat()

    // теперь нужно отсортировать массив по определенному полю и направлению
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc'

    // получаем отсортированный массив
    const data = _.orderBy(clonedData, sortField, sort)

    this.setState({ // указываем, какие поля мы хотим менять
      data,
      sort,
      sortField
    })
  }

  // при клике по какой-либо строчке, мы будем выкидывать эту строку отдельно
  onRowSelect = row => (
    this.setState({row})
  )

  pageChangeHandler = ({selected}) => (
    this.setState({currentPage: selected})
  )

  searchHandler = search => {
    this.setState({search, currentPage: 0}) // и сбрасываем текущую страницу (при изменении state)
  }

  getFilteredDate() {
    // забираем 2 поля из state
    const {data, search} = this.state

    // проверка
    if (!search) { // если у нас ничего нет в поле search
      return data // то просто возвращаем поле data
    }

    // фильтрация (если что-то есть, то отфильтровываем таблицу)
    return data.filter(item => {
      return item['executor'].toLowerCase().includes(search.toLowerCase())
        || item['song'].toLowerCase().includes(search.toLowerCase())
        || item['genre'].toLowerCase().includes(search.toLowerCase())
    })
  }

  render() {
    const pageSize = 4

    const filteredDate = this.getFilteredDate()

    // высчитываем пагинацию
    const pageCount = Math.ceil(filteredDate.length / pageSize)

    const displayData = _.chunk(filteredDate, pageSize)[this.state.currentPage]

    return (
      <div className="container">
        {
          this.state.isLoading
            ? <Loader/>
            : <React.Fragment>
                <TableSearch onSearch={this.searchHandler} />
                  <Table
                    data={displayData}
                    onSort={this.onSort}
                    sort={this.state.sort}
                    sortField={this.state.sortField}
                    onRowSelect={this.onRowSelect}
                  />
              </React.Fragment>
        }

        {
          this.state.data.length > pageSize
            ? <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.pageChangeHandler}
                containerClassName={'pagination'}
                activeClassName={'active'}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                nextClassName="page-item"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                forcePage={this.state.currentPage}
              />
            : null
        }

        {
          this.state.row
            ? <DetailRowView person={this.state.row} />
            : null
        }
      </div>
    )
  }
}

export default App;
