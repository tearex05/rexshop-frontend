import { useSelector, useDispatch } from "react-redux";
import {
	removeItem,
	removeAll,
	increaseNumber,
	decreaseNumber,
} from "../redux/reducer";
import { ImCross } from "react-icons/im";
import { BiPlus, BiMinus } from "react-icons/bi";
import {useNavigate} from 'react-router-dom'

function Cart() {
	const navigate = useNavigate()
	let items = useSelector((state) => state.itemReducer);
	const dispatch = useDispatch();
	let totalPrice = 0;
	if (items.length) {
		items.map((i) => (totalPrice += i.number * i.price));
	}
	const purchaseHandler = () => {
		if(items.length > 0){
			console.log(items)
			dispatch(removeAll())
			navigate('/rexshop-frontend/success')
		}
	}
	return (
		<div className="cart-container">
			<h1 className="cart-title">Items in cart</h1>
			<table className="items">
				<thead>
					<tr className="table-row">
					<th scope="col" className="table-title">
						Id
					</th>
					<th scope="col" className="table-title">
						Name
					</th>
					<th scope="col" className="table-title">
						Quantity
					</th>
					<th scope="col" className="table-title">
						Price
					</th>
				</tr>
				</thead>
				<tbody>
					{items.map((item) => (
					<>
						<tr key={item.id} className="table-row item-table-row">
						<td className="table-data">
							{items.indexOf(item) + 1}
						</td>
						<td className="table-data">{item.name}</td>
						<td className="table-data">
							<div className="change-number">
								<button
									onClick={() =>
										dispatch(decreaseNumber({_id: item.id}))
									}
									className="decrease"
								>
									<BiMinus className="minus" size="0.8em" />
								</button>
								<p className="item-number">{item.number}</p>
								<button
									onClick={() =>
										dispatch(increaseNumber({_id: item.id}))
									}
									className="increase"
								>
									<BiPlus className="plus" size="0.8em" />
								</button>
							</div>
						</td>
						<td className="table-data">
							${(item.number * item.price).toFixed(2)}
						</td>
						<td className="table-data">
							<button onClick={() => dispatch(removeItem({_id: item.id}))} className="remove-from-cart-cart"><ImCross color='red' size='1.3em' /></button>
						</td>
					</tr>
					</>
				))}
				</tbody>
			</table>
			<p className="totalPrice">Total Price: ${totalPrice.toFixed(2)}</p>
			<button className='submit purchase' onClick={purchaseHandler}>Purchase Items</button>
			<button
				onClick={() => dispatch(removeAll())}
				className="remove-all submit"
			>
				Remove All Items
			</button>
		</div>
	);
}

export default Cart;
