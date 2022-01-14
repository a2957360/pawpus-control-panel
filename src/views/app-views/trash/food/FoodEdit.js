import React from 'react'
import ProductForm from './form';

export default function EditProduct(props) {
	return (
		<ProductForm mode="EDIT" param={props.match.params} />
	)
}
