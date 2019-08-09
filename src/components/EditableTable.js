import React from 'react';
import { connect } from 'react-redux';
// import { EditableTable } from 'antd';
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';
import { Select } from 'antd';
const { Option } = Select;


const EditableContext = React.createContext();

class EditableCell extends React.Component {

  handleChange(value) {

    console.log(`selected ${value}`);
  }

  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    } else if (this.props.inputType === 'label') {
      let label_list = this.props.label_list;
      return (<Select mode="tags" 
                      style={{ width: '100%' }} 
                      placeholder="Labels"
                      onChange={this.handleChange}>
                {(label_list &&
                  label_list.map(label => {
                    return <Option key={label}>{label}</Option>
                  })
                )}    
              </Select>)
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      label_list,
      ...restProps
    } = this.props;
    console.log(...restProps);
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }} label_list={label_list}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
              label_list: label_list
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editingKey: '',
      label_list: this.props.label_list
    };
    this.columns = [
      {
        title: 'Call ID',
        dataIndex: 'call_id',
        width: '25%',
        editable: false,
      },
      {
        title: 'Label ID',
        dataIndex: 'label_id',
        width: '50%',
        editable: true,
        label_list: this.state.label_list
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    href="javascript:;"
                    onClick={() => this.save(form, record.call_id)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.call_id)}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => this.edit(record.call_id)}>
              Edit
            </a>
          );
        },
      },
    ];
  }

  componentWillReceiveProps(someProp) {
    this.setState({label_list: someProp.label_list})
    this.columns[1].label_list = someProp.label_list;
  }

  isEditing = record => record.call_id === this.state.editingKey;
  labelList = [];

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, call_id) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => call_id === item.call_id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  edit(call_id) {
    this.setState({ editingKey: call_id });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'label_id' ? 'label' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
          label_list: col.label_list
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form} label_list={this.props.label_list}>
        <Table
          rowKey={record => record.call_id}
          components={components}
          bordered
          dataSource={this.props.call_list}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
        />
      </EditableContext.Provider>
    );
  }
}
// export default connect()(EditableTable);
export default Form.create()(EditableTable);

// const EditableFormTable = Form.create()(EditableTable);
// ReactDOM.render(<EditableFormTable />, mountNode);