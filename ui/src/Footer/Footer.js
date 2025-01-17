import React, { Component } from 'react';
import {getVersion} from '../Actions/Actions';
import { connect } from 'react-redux'

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      version: '',
    };
  }

  async componentDidMount() {
    try {
      this.props.getVersion();
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className="Footer">
        <p>Bootzooka - application scaffolding by <span><a href="http://softwaremill.com">SoftwareMill</a></span>,
          sources available on <span><a href="https://github.com/softwaremill/bootzooka/">GitHub</a></span>
        </p>
        <p>
          { this.props.buildDate} , {this.props.buildSha}
        </p>
      </div>
    );
  }
}


export const mapStateToProps = (state) => ({
    buildDate: state.buildDate,
    buildSha: state.buildSha
})

const mapDispatchToProps = {
  getVersion: getVersion
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
