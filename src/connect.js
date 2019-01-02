import { connect } from 'react-redux';
import * as actionCreators from './actions/index';

export default mapStateToProps => Component => connect(mapStateToProps, actionCreators)(Component);
