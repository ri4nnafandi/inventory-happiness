import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import moment from 'moment'

import { List, Map, OrderedMap } from 'immutable';


class TableTransaksi extends React.Component {

	constructor(props) {
		super(props)
	}

	render () {
		const formatTanggal = x => {
			return moment(x,moment.ISO_8601).format('DD MMM YYYY H:m:s')
		}

		const hapus = x => {

			console.log(x)
		}

		const urutkan = () => {

			var newOrderedMap = List(this.props.todos);
			var olderClients = newOrderedMap.sortBy(function(value, key) {  
			    return -moment(value.created_at,moment.ISO_8601).unix();
			});

			return olderClients
		}
		return (
			<div className="table-list">
		    	<Link to={`/transaksi/create`}>
		    		<button className="btn btn-primary no-border">Tambah Transaksi</button>
		    	</Link>

		    	<table className="list-products">
			    	<thead>
			          <tr>
			            <th>Kode Transaksi</th>
			            <th>Nama Product</th>
			            <th>Supplier</th>
			            <th>Tipe</th>
			            <th>Quantitty</th>
			          </tr>
			        </thead>
		    		<tbody>
		    			{urutkan().map( t => {
		    				return (
		    					<tr key={t._id}>
		    						<td>{t.code}</td>
		    						<td>{t.product.name}</td>
		    						<td>{t.supplier.name}</td>
		    						<td>{t.type === 1 ? "Barang Masuk" : "Barang Keluar"}</td>
		    						<td>{t.quantity}</td>
		    					</tr>
		    				)
		    			})}
		    		</tbody>
		    	</table>
		    </div>
		)
	}
}


export default connect(
  state => ({ todos: state.transaksi }),
  {  }
)(TableTransaksi)