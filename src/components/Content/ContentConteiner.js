import React from 'react';
import {connect} from 'react-redux';
import Content from './Content.js';

let mapStateToProps = ()=>{
	return{};
}

let mapDispatchToProps = ()=>{
	return{};
}

const ContentConteiner = connect(mapStateToProps,mapDispatchToProps)(Content);

export default ContentConteiner;