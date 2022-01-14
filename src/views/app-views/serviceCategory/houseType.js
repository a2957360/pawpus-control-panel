import React from 'react'
import Category from '../category/categoryList';

export default function EditProduct(props) {
	return (
		//0:服务分类;1:额外服务;2:商品分类 一级分类
		<Category categoryType="6" categoryLevel="0" />
	)
}
