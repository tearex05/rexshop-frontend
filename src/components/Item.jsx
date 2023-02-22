import {useState} from 'react'
import { BiPencil, BiPlus, BiMinus } from "react-icons/bi";
import { MdShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	addItem,
	removeItem,
	decreaseNumber,
	increaseNumber,
} from "../redux/reducer";

function Item({ item }) {
	const items = useSelector((state) => state.itemReducer);
	const itemInCart = items.filter((i) => i.id === item._id);
	const [test, setTest] = useState(true)
	const dispatch = useDispatch();
	const addToCart = () => {
		dispatch(addItem(item));
	};
	const removeFromCart = () => {
		dispatch(removeItem(item));
	};
	let user = JSON.parse(localStorage.getItem("user"));
	return (
		<div key={item._id} className="item-card">
				<img className="item-img-card" src={item.picture} alt="" />
			<div className="item-things">
				<div className="item-info">
					<h3 className="item-title">{item.name}</h3>
					<p className="item-price">Price: ${item.price}</p>
				</div>
				{user ? (
					<div className="item-btns">
						{itemInCart[0] ? (
							<>
								<button
									onClick={removeFromCart}
									className="remove-from-cart"
								>
									<MdRemoveShoppingCart size="1.5em" />
								</button>
								<div className="change-number">
									<button
										onClick={() =>
											dispatch(decreaseNumber(item))
										}
										className="decrease"
									>
										<BiMinus
											className="minus"
											size="0.8em"
										/>
									</button>
									<p className="item-number">
										{itemInCart[0]?.number}
									</p>
									<button
										onClick={() =>
											dispatch(increaseNumber(item))
										}
										className="increase"
									>
										<BiPlus className="plus" size="0.8em" />
									</button>
								</div>
								{item.creator === user.id && <Link to={`/rexshop-frontend/updateitem/${item._id}`} className="to-update-item">
									<BiPencil color='black' size='1.5em' />
								</Link>}
							</>
						) : (
							<>
								<button
									onClick={addToCart}
									className="add-to-cart"
								>
									<MdShoppingCart size="1.5em" />
								</button>
								{item.creator === user.id && <Link to={`/rexshop-frontend/updateitem/${item._id}`} className="to-update-item">
									<BiPencil color='black' size='1.5em' />
								</Link>}
							</>
						)}
					</div>
				) : (
					<p className="not-user2">
						Plz{" "}
						<Link className="link2 signup-link" to="/rexshop-frontend/signup">
							Signup
						</Link>{" "}
						or{" "}
						<Link className="link2 signin-link" to="/rexshop-frontend/signin">
							Signin
						</Link>{" "}
						to create an item
					</p>
				)}
			</div>
		</div>
	);
}

export default Item;
