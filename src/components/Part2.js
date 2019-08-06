import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import LabelList from './LabelList';
import CallList from './CallList';
import {
  UPDATE_FIELD_AUTH,
  PART2,
  PART2_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onUnload: () =>
    dispatch({ type: PART2_PAGE_UNLOADED })
});

class Part2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      label_list: [],
      call_list: []
    };
  }

  componentWillMount() {
    this.getCallList();
    this.getListOfLabels();
    // this.applyLabels();
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  getCallList() {
    var headers = {
      'user_id': '24b456'
    }
    fetch("https://damp-garden-93707.herokuapp.com/getcalllist", {
        'method': 'GET',
        'Content-Type': 'application/json',
        'headers': headers

      })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            call_list: result.data.call_data
          });
          console.log(result);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  getListOfLabels() {
    var headers = {
      'user_id': '24b456'
    }
    fetch("https://damp-garden-93707.herokuapp.com/getlistoflabels", {
        'method': 'GET',
        'Content-Type': 'application/json',
        'headers': headers
      })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            label_list: result.data.unique_label_list
          });
          console.log(result);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  applyLabels() {
    const data = {
      "operation": {
        "callList": [0,1,2],
        "label_ops": [
          {
            "name": "random",
            "op": "add"
          }, {
            "name": "unread",
            "op": "add"
          }
        ]
      }
    };
    

    // data.append("myjsonkey", JSON.stringify(payload));
    fetch("https://damp-garden-93707.herokuapp.com/applyLabels", {
        'Content-Type': 'application/json',
        'user_id': '24b456',
        method: 'POST',
        data: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            filtered_list: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    // const email = this.props.email;
    // const password = this.props.password;
    // <PageBodyList page_name="part2" items={this.state.items}/>
    return (
      <div className="container page" style={{ marginTop: "5rem"}}>
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Part2</h1>
              <p className="text-xs-center">
                  Part2
              </p>
          </div>
        </div>
        <LabelList items={this.state.label_list} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Part2);
