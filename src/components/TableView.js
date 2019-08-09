import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

class TableView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false
    }
  }
  /*
  data = [
          {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
          },
          {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
          },
          {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
          },
          {
            key: '4',
            name: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park',
          },
        ]
  */

  /*
  columns = [
          {
            title: 'Name',
            dataIndex: 'name',
            filters: [
              {
                text: 'Joe',
                value: 'Joe',
              },
              {
                text: 'Jim',
                value: 'Jim',
              },
              {
                text: 'Submenu',
                value: 'Submenu',
                children: [
                  {
                    text: 'Green',
                    value: 'Green',
                  },
                  {
                    text: 'Black',
                    value: 'Black',
                  },
                ],
              },
            ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => b.name.length - a.name.length,
            sortDirections: ['descend'],
          },
          {
            title: 'Age',
            dataIndex: 'age',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
          },
          {
            title: 'Address',
            dataIndex: 'address',
            filters: [
              {
                text: 'London',
                value: 'London',
              },
              {
                text: 'New York',
                value: 'New York',
              },
            ],
            filterMultiple: false,
            onFilter: (value, record) => record.address.indexOf(value) === 0,
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
          },
        ]
  */
  
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  onChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
  };
// <Table rowKey={record => record.call_id} rowSelection={this.rowSelection} columns={this.props.columns} dataSource={this.props.data} onChange={this.onChange} />
  render() {
    return(
      <Table rowKey={record => record.call_id} columns={this.props.columns} dataSource={this.props.data} onChange={this.onChange} />
    )
  }
}
export default connect()(TableView);